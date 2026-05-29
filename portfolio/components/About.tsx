import DecryptedText from "./ui/DecryptedText";

const About = () => {
  return (
    <section
      id="about"
      className="relative z-10 min-h-screen w-full px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple">
            <DecryptedText
              text="About"
              animateOn="view"
              revealDirection="center"
              sequential
              speed={45}
              viewThreshold={0.01}
              viewRootMargin="0px 0px -10% 0px"
              repeatOnView
              parentClassName="block"
              className="text-purple"
              encryptedClassName="text-purple/35"
            />
          </p>
          <h2 className="mt-5 max-w-xl text-4xl font-bold uppercase tracking-[0.08em] text-white sm:text-5xl">
            <DecryptedText
              text="I build systems that stay clear under pressure."
              animateOn="view"
              revealDirection="center"
              sequential
              speed={35}
              viewThreshold={0.01}
              viewRootMargin="0px 0px -10% 0px"
              repeatOnView
              parentClassName="block"
              className="text-white"
              encryptedClassName="text-white-100/35"
            />
          </h2>
        </div>

        <div className="space-y-10">
          <p className="text-lg leading-9 text-white-100 sm:text-xl sm:leading-10">
            I&apos;m Shubham Vatsa, an Information Science and Engineering undergrad, Class of 2027.
I approach every problem with a systems-first mindset. I care about architecture, clean APIs, and code that stays reliable as complexity grows. For me, software isn't just about making things work it&apos;s about designing solutions that are clear, efficient, and built for the real world
          </p>

          <p className="text-base leading-8 text-white-200 sm:text-lg sm:leading-9">
            I &apos;ve enjoyed working across the full stack, integrating intelligent systems into practical workflows, and picking up whatever a problem demands. Beyond writing code, I invest time in DSA and system design because understanding how software behaves under load is what separates good engineers from great ones.
          </p>

          <p className="text-base leading-8 text-white-200 sm:text-lg sm:leading-9">
            I believe great engineers look beyond the surface  where bottlenecks hide, how components interact, and why certain architectures endure.I build for clarity, engineer for performance, and think for the long term.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
