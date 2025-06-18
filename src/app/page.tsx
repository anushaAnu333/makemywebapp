// "use client";
// import { useRouter } from "next/navigation";

// export default function Home() {
// const routes = useRouter()

// const handleNavigate = ()=>{
//   routes.push('/home')
// }

// const handleNavigateContactUs = ()=>{
//   routes.push('/contact')
// }

// const handleNavigateMaintain = ()=>{
//   routes.push('/maintain')
// }

//   return (
//     <div className="min-h-screen  text-white flex flex-col items-center p-6">
//       <section className="text-center max-w-3xl mt-16">
//         <h1 className="text-4xl font-bold">Outsource Today, Scale In-House Tomorrow</h1>
//         <p className="text-lg mt-4 text-gray-300">
//           We transform your ideas into high-performance software today while preparing you for future growth.
//         </p>
// <div className="flex flex-col md:flex-row gap-4 mt-4 w-full justify-center items-center">
//         <button onClick={handleNavigateMaintain} className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition">
//         Need Project Maintenance
//           </button>

//         <button onClick={handleNavigate} className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-700 hover:text-white transition">
//             Need New Project
//      </button>
//       </div>
//       </section>

//       <section id="consultation" className="mt-16 flex-col flex gap-4 text-center">
//         <h2 className="text-3xl font-semibold">Let&apos;s Build Together!</h2>
//         <p className="text-gray-400 mt-4">Book a free consultation and let&apos;s discuss your project.</p>

//         <button
//   onClick={handleNavigateContactUs}
//   className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition"
// >
// Connect

// </button>

//       </section>

//       <section className="mt-16 max-w-4xl">
//         <h2 className="text-3xl font-semibold text-center">Our Expertise</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//           {services.map(({ title, description }, index) => (
//             <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold">{title}</h3>
//               <p className="text-gray-400 mt-2">{description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="mt-16 max-w-4xl">
//         <h2 className="text-3xl font-semibold text-center">Our Development Process</h2>
//         <div className="mt-6 space-y-6">
//           {processSteps.map(({ step, title, description }, index) => (
//             <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold">{step}: {title}</h3>
//               <p className="text-gray-400 mt-2">{description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//     </div>
//   );
// }

// const services = [
//   { title: "Full-Stack Development", description: "End-to-end software solutions tailored to your business needs." },
//   { title: "Generative AI Solutions", description: "Harness the power of AI with cutting-edge automation and intelligence." },
//   { title: "Observability & Monitoring", description: "Ensure seamless performance with built-in monitoring and alerts." },
//   { title: "Enterprise Data Solutions", description: "Reliable and scalable data solutions to drive your business forward." },
// ];

// const processSteps = [
//   { step: "1", title: "Free Consultation & Estimate", description: "Discuss your ideas, get expert advice, and receive an estimated timeline and cost." },
//   { step: "2", title: "Design & Approval", description: "We create user-friendly designs and detailed plans before development begins." },
//   { step: "3", title: "Development & Testing", description: "We build and rigorously test your solution for a seamless experience." },
//   { step: "4", title: "Observability & Handoff", description: "We provide full monitoring, documentation, and support for a smooth transition." },
// ];

"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const routes = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNavigate = () => {
    routes.push("/home");
  };

  const handleNavigateContactUs = () => {
    routes.push("/contact");
  };

  const handleNavigateMaintain = () => {
    routes.push("/maintain");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-900/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-indigo-600/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center p-6">
        {/* Hero Section */}
        <section
          className={`text-center max-w-4xl mt-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
              🚀 Transform Your Ideas Into Reality
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Outsource Today,
            <br />
            Scale In-House Tomorrow
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            We transform your ideas into high-performance software today while
            preparing you for future growth with cutting-edge technology and
            expert guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={handleNavigate}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform">
              <span className="relative z-10">Start New Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={handleNavigateMaintain}
              className="group px-8 py-4 border-2 border-blue-400/50 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm">
              Project Maintenance
            </button>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={`mt-20 text-center transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Let&apos;s Build Together!
            </h2>
            <p className="text-gray-300 mb-6">
              Book a free consultation and let&apos;s discuss your project vision.
            </p>
            <button
              onClick={handleNavigateContactUs}
              className="group w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transform">
              <span className="flex items-center justify-center gap-2">
                Connect With Us
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>
          </div>
        </section>

        {/* Services Section */}
        <section
          className={`mt-24 max-w-6xl transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Our Expertise
            </h2>
            <p className="text-gray-300 text-lg">
              Comprehensive solutions for modern businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ title, description, icon }, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:transform hover:scale-105">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold mb-3 text-blue-200">
                  {title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section
          className={`mt-24 max-w-6xl mb-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Our Development Process
            </h2>
            <p className="text-gray-300 text-lg">
              A proven methodology for delivering excellence
            </p>
          </div>

          <div className="space-y-6">
            {processSteps.map(({ step, title, description }, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-r from-slate-800/30 to-blue-900/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {step}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-3 text-blue-200">
                      {title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const services = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end software solutions tailored to your business needs with modern frameworks and scalable architecture.",
    icon: "💻",
  },
  {
    title: "Generative AI Solutions",
    description:
      "Harness the power of AI with cutting-edge automation, intelligent workflows, and custom AI integrations.",
    icon: "🤖",
  },
  {
    title: "Observability & Monitoring",
    description:
      "Ensure seamless performance with comprehensive monitoring, real-time alerts, and actionable insights.",
    icon: "📊",
  },
  {
    title: "Enterprise Data Solutions",
    description:
      "Reliable and scalable data solutions to drive your business forward with analytics and intelligence.",
    icon: "🏢",
  },
];

const processSteps = [
  {
    step: "1",
    title: "Free Consultation & Estimate",
    description:
      "Discuss your ideas, get expert advice, and receive a detailed timeline and cost breakdown tailored to your project scope.",
  },
  {
    step: "2",
    title: "Design & Approval",
    description:
      "We create intuitive user experiences and detailed technical specifications, ensuring alignment before development begins.",
  },
  {
    step: "3",
    title: "Development & Testing",
    description:
      "We build your solution using industry best practices and conduct rigorous testing to ensure a flawless user experience.",
  },
  {
    step: "4",
    title: "Observability & Handoff",
    description:
      "We provide comprehensive monitoring, detailed documentation, and ongoing support for a seamless transition to your team.",
  },
];
