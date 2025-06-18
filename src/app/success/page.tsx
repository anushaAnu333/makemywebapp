// export default function Page() {
//   return (
//     <div className="flex items-center justify-center h-[80vh]  text-white">
//       <h1 className="text-2xl font-semibold text-center px-4">
//         Thank you for reaching out! <br /> Our team will get back to you within <strong>24 hours</strong>.
//       </h1>
//     </div>
//   );
// }


export default function Page() {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-indigo-600/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="bg-gradient-to-br from-slate-800/40 to-blue-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 max-w-2xl">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent">
            Thank you for reaching out!
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Our team will get back to you within <span className="text-cyan-400 font-bold">24 hours</span>.
          </p>
        </div>
      </div>
    </div>
  );
}