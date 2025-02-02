"use client";

import React from "react";
import { CheckCircle, MessageCircle, Clock, ThumbsUp } from "lucide-react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-white flex flex-col items-center">
      <div className="fixed top-10 left-10 opacity-30">
        <CheckCircle size={80} strokeWidth={0.6} />
      </div>

      <div className="fixed top-10 right-40 opacity-20">
        <MessageCircle size={100} strokeWidth={0.4} />
      </div>

      <div className="fixed bottom-10 left-20 opacity-25">
        <Clock size={90} strokeWidth={0.5} />
      </div>

      <div className="fixed bottom-10 right-20 opacity-30">
        <ThumbsUp size={80} strokeWidth={0.6} />
      </div>

      <div className="w-full max-w-5xl px-6 md:px-12 py-12 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;
