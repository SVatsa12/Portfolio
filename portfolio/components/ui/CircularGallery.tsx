"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform, OGLRenderingContext, Raycast, Vec2 } from 'ogl';
import { useEffect, useRef } from 'react';

import './CircularGallery.css';

interface Item {
  visibleTrait: string;
  realityText: string;
}

interface CircularGalleryProps {
  items: Item[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
}

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function createCardTexture(gl: OGLRenderingContext, trait: string, reality: string, isReality: boolean) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return { texture: new Texture(gl), width: 0, height: 0 };

  canvas.width = 400;
  canvas.height = 200;

  // Background
  context.fillStyle = isReality ? '#010413' : '#020617';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Styling
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  if (!isReality) {
    // Visible Trait
    context.font = 'bold 24px Arial';
    context.fillStyle = '#ffffff';
    context.fillText(trait, canvas.width / 2, canvas.height / 2);
    
    // Bottom border/accent
    context.fillStyle = 'rgba(34, 211, 238, 0.3)';
    context.fillRect(40, canvas.height - 5, canvas.width - 80, 2);
  } else {
    // Reality Text
    context.font = 'italic 16px Arial';
    context.fillStyle = '#94a3b8'; // slate-400
    
    // Word wrap
    const words = reality.split(' ');
    let line = '';
    let y = canvas.height / 2 - 20;
    const maxWidth = 320;
    const lineHeight = 24;

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = context.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        context.fillText(line, canvas.width / 2, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, canvas.width / 2, y);
  }

  const texture = new Texture(gl, { generateMipmaps: true });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Media {
  extra: number;
  geometry: Plane;
  gl: OGLRenderingContext;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: any;
  viewport: any;
  bend: number;
  borderRadius: number;
  program!: Program;
  plane!: Mesh;
  speed: number = 0;
  width: number = 0;
  widthTotal: number = 0;
  x: number = 0;
  scale: number = 0;
  padding: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;
  uHover: { value: number } = { value: 0 };

  constructor({
    geometry,
    gl,
    index,
    length,
    renderer,
    scene,
    screen,
    viewport,
    bend,
    borderRadius = 0.05,
    trait,
    reality
  }: any) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.borderRadius = borderRadius;
    this.createShader(trait, reality);
    this.createMesh();
    this.onResize();
  }

  createShader(trait: string, reality: string) {
    const { texture: tVisible } = createCardTexture(this.gl, trait, reality, false);
    const { texture: tReality } = createCardTexture(this.gl, trait, reality, true);

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tVisible;
        uniform sampler2D tReality;
        uniform float uHover;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          // Slide effect: uHover 0 = fully visible, 1 = fully reality
          vec2 offsetUv = vUv;
          
          // Revealed layer follows the slide
          vec4 colorVisible = texture2D(tVisible, vec2(vUv.x, vUv.y + uHover));
          vec4 colorReality = texture2D(tReality, vec2(vUv.x, vUv.y - (1.0 - uHover)));
          
          vec4 color = mix(colorVisible, colorReality, step(1.0 - uHover, vUv.y));
          
          // Border Radius
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          
          // Edge glow
          float edge = smoothstep(0.48, 0.5, length(vUv - 0.5));
          vec3 glow = vec3(0.13, 0.83, 0.93) * uHover * edge; // Cyan glow
          
          gl_FragColor = vec4(color.rgb + glow, alpha);
        }
      `,
      uniforms: {
        tVisible: { value: tVisible },
        tReality: { value: tReality },
        uHover: this.uHover,
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  update(scroll: any, direction: string, isHovered: boolean) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    // Animation for hover reveal
    const targetHover = isHovered ? 1.0 : 0.0;
    this.uHover.value = lerp(this.uHover.value, targetHover, 0.1);

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: any = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (700 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (1000 * this.scale)) / this.screen.width;
    this.padding = 1.5;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: any;
  onCheckDebounce: any;
  renderer!: Renderer;
  gl!: OGLRenderingContext;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  screen: any;
  viewport: any;
  isDown: boolean = false;
  start: number = 0;
  raf: number = 0;
  mouse: Vec2 = new Vec2(-1, -1);
  raycast!: Raycast;

  constructor(
    container: HTMLElement,
    { items, bend, borderRadius, scrollSpeed, scrollEase }: any
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, borderRadius);
    this.raycast = new Raycast();
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
  }

  createMedias(items: Item[], bend: number, borderRadius: number) {
    // We need enough items to fill the carousel, so we clone if necessary
    const galleryItems = items.length < 6 ? [...items, ...items, ...items] : [...items, ...items];
    this.medias = galleryItems.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        index,
        length: galleryItems.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        bend,
        borderRadius,
        trait: data.visibleTrait,
        reality: data.realityText
      });
    });
  }

  onTouchDown(e: any) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e: any) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    // Local mouse coordinates for raycasting (-1 to 1)
    const rect = this.container.getBoundingClientRect();
    this.mouse.set(
      ((x - rect.left) / rect.width) * 2 - 1,
      -((y - rect.top) / rect.height) * 2 + 1
    );

    if (!this.isDown) return;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e: any) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    if (!this.container) return;
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: height * this.camera.aspect, height };
    this.medias.forEach(m => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';

    // Raycast for hover
    this.raycast.castMouse(this.camera, this.mouse);
    const intersects = this.raycast.intersectBounds(this.medias.map(m => m.plane));

    this.medias.forEach(media => {
      const isHovered = intersects.includes(media.plane);
      media.update(this.scroll, direction, isHovered);
    });

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('wheel', this.onWheel.bind(this));
    window.addEventListener('mousedown', this.onTouchDown.bind(this));
    window.addEventListener('mousemove', this.onTouchMove.bind(this));
    window.addEventListener('mouseup', this.onTouchUp.bind(this));
    window.addEventListener('touchstart', this.onTouchDown.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this));
    window.addEventListener('touchend', this.onTouchUp.bind(this));
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize.bind(this));
    // ... remove other listeners ...
    if (this.renderer.gl.canvas.parentNode) this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, { items, bend, borderRadius, scrollSpeed, scrollEase });
    return () => app.destroy();
  }, [items, bend, borderRadius, scrollSpeed, scrollEase]);
  return <div className="circular-gallery" ref={containerRef} />;
}

