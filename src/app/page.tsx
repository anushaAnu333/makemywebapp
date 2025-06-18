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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-slate-950 text-white overflow-hidden relative">
      {/* Interactive cursor effect */}
      <div 
        className="fixed w-96 h-96 bg-blue-950/8 rounded-full blur-3xl pointer-events-none transition-all duration-300 z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-950/15 to-slate-800/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-950/15 to-gray-900/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-900/8 to-slate-800/5 rounded-full blur-2xl animate-bounce delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-l from-blue-950/8 to-gray-900/5 rounded-full blur-2xl animate-bounce delay-3000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-slate-500/30 rounded-full animate-ping`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center p-6">
        {/* Hero Section */}
        <section
          className={`text-center max-w-5xl mt-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          
          {/* Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800/40 to-gray-900/40 border border-slate-700/50 rounded-full text-sm font-medium backdrop-blur-md shadow-lg hover:scale-105 transition-transform duration-300">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              🚀 Transform Your Ideas Into Reality
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
            Outsource Today,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
              Scale In-House Tomorrow
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            We transform your ideas into <span className="text-cyan-400 font-semibold">high-performance software</span> today while
            preparing you for future growth with cutting-edge technology and expert guidance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={handleNavigate}
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-110 transform overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <span>Start New Project</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            </button>

            <button
              onClick={handleNavigateMaintain}
              className="group px-10 py-5 border-2 border-blue-400/50 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-md hover:scale-105">
              <span className="flex items-center gap-2">
                <span>Project Maintenance</span>
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { number: "50+", label: "Projects Delivered", icon: "🚀" },
              { number: "24h", label: "Response Time", icon: "⚡" },
              { number: "100%", label: "Client Satisfaction", icon: "⭐" },
            ].map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-cyan-400 mb-1">{stat.number}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={`mt-20 text-center transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="bg-gradient-to-r from-slate-900/60 to-gray-950/60 backdrop-blur-md border border-slate-700/40 rounded-3xl p-10 max-w-lg mx-auto shadow-2xl hover:shadow-slate-500/10 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-6">💡</div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Let&apos;s Build Together!
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Book a free consultation and let&apos;s discuss your project vision.
            </p>
            <button
              onClick={handleNavigateContactUs}
              className="group w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transform relative overflow-hidden">
              <span className="flex items-center justify-center gap-2 relative z-10">
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
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            </button>
          </div>
        </section>

        {/* Services Section */}
        <section
          className={`mt-32 max-w-7xl transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Our Expertise
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Comprehensive solutions for modern businesses with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(({ title, description, icon }, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-slate-950/80 to-gray-900/80 backdrop-blur-md border border-slate-800/60 rounded-3xl hover:border-slate-600/80 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-500/10 hover:transform hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800/10 to-gray-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-200 group-hover:text-cyan-300 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section
          className={`mt-32 max-w-7xl mb-20 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Our Development Process
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              A proven methodology for delivering excellence with transparency
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map(({ step, title, description }, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-r from-slate-950/60 to-gray-900/60 backdrop-blur-md border border-slate-800/60 rounded-3xl hover:border-slate-600/80 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-500/10 hover:scale-[1.02] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800/8 to-gray-900/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-start gap-8 relative z-10">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-4 text-blue-200 group-hover:text-cyan-300 transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
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