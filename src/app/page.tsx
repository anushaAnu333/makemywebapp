"use client";
import { useRouter } from "next/navigation";

export default function Home() {
const routes = useRouter()

const handleNavigate = ()=>{
  routes.push('/home')
}

const handleNavigateContactUs = ()=>{
  routes.push('/contact')
}


  return (
    <div className="min-h-screen  text-white flex flex-col items-center p-6">
      <section className="text-center max-w-3xl mt-16">
        <h1 className="text-4xl font-bold">Outsource Today, Scale In-House Tomorrow</h1>
        <p className="text-lg mt-4 text-gray-300">
          We transform your ideas into high-performance software today while preparing you for future growth.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-4 w-full justify-center items-center">
        <button className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition">
        Need Project Maintenance     
          </button>

        <button onClick={handleNavigate} className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-700 hover:text-white transition">
            Need New Project   
     </button>
      </div>
      </section>




      <section id="consultation" className="mt-16 flex-col flex gap-4 text-center">
        <h2 className="text-3xl font-semibold">Let&apos;s Build Together!</h2>
        <p className="text-gray-400 mt-4">Book a free consultation and let&apos;s discuss your project.</p>


        <button
  onClick={handleNavigateContactUs}
  className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition"
>
Connect

</button>


        
      </section>


      <section className="mt-16 max-w-4xl">
        <h2 className="text-3xl font-semibold text-center">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {services.map(({ title, description }, index) => (
            <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-gray-400 mt-2">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-4xl">
        <h2 className="text-3xl font-semibold text-center">Our Development Process</h2>
        <div className="mt-6 space-y-6">
          {processSteps.map(({ step, title, description }, index) => (
            <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{step}: {title}</h3>
              <p className="text-gray-400 mt-2">{description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

const services = [
  { title: "Full-Stack Development", description: "End-to-end software solutions tailored to your business needs." },
  { title: "Generative AI Solutions", description: "Harness the power of AI with cutting-edge automation and intelligence." },
  { title: "Observability & Monitoring", description: "Ensure seamless performance with built-in monitoring and alerts." },
  { title: "Enterprise Data Solutions", description: "Reliable and scalable data solutions to drive your business forward." },
];

const processSteps = [
  { step: "1", title: "Free Consultation & Estimate", description: "Discuss your ideas, get expert advice, and receive an estimated timeline and cost." },
  { step: "2", title: "Design & Approval", description: "We create user-friendly designs and detailed plans before development begins." },
  { step: "3", title: "Development & Testing", description: "We build and rigorously test your solution for a seamless experience." },
  { step: "4", title: "Observability & Handoff", description: "We provide full monitoring, documentation, and support for a smooth transition." },
];