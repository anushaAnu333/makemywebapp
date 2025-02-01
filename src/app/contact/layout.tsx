"use client";

import React from "react";
import { Mail, Headphones, Phone, MessageCircle } from "lucide-react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-white flex  flex-col items-center relative">

      <div className="fixed top-10 left-10 opacity-30">
        <Mail size={80} strokeWidth={0.6} />
      </div>

      <div className="fixed top-10 right-20 opacity-20">
        <Headphones size={100} strokeWidth={0.4} />
      </div>

      <div className="fixed bottom-10 left-20 opacity-25">
        <Phone size={90} strokeWidth={0.5} />
      </div>

      <div className="fixed bottom-10 right-20 opacity-30">
        <MessageCircle size={80} strokeWidth={0.6} />
      </div>




  


      <div className="relative    w-full max-w-5xl px-6 md:px-12 py-12 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;
