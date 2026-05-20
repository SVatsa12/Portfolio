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
            I&apos;m Shubham Vatsa, an Information Science undergraduate and
            third-year student in the Class of 2027. I build things that scale:
            real-time systems, AI-powered pipelines, and full-stack products
            that go beyond the tutorial.
          </p>

          <p className="text-base leading-8 text-white-200 sm:text-lg sm:leading-9">
            I&apos;ve shipped a meeting intelligence platform with live
            transcription, a URL shortener with analytics, and a multi-user task
            manager, each built with production practices like JWT auth, Docker,
            WebSockets, and clean REST APIs. My stack spans FastAPI, Node.js,
            React, PostgreSQL, and MongoDB, and I&apos;m comfortable threading
            LLMs into workflows using Whisper, Ollama, and prompt engineering.
          </p>

          <p className="text-base leading-8 text-white-200 sm:text-lg sm:leading-9">
            Outside of code, I&apos;m grinding DSA on LeetCode and thinking
            about system design. I build for clarity, performance, and the kind
            of architecture that doesn&apos;t collapse under load.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
