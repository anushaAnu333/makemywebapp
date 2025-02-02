"use client";

import React from "react";
import { 
  Circle, Layers, Code2, Grid, 
  PlusCircle, Wrench, ClipboardList, HelpCircle, 
  ShieldCheck, RefreshCw 
} from "lucide-react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative text-white flex flex-col items-center min-h-screen">
      {/* Background Icons */}
      <div className="fixed top-10 left-10 opacity-20 z-[-1]">
        <Circle size={80} strokeWidth={0.6} />
      </div>

      <div className="fixed top-10 right-40 opacity-15 z-[-1]">
        <Code2 size={100} strokeWidth={0.4} />
      </div>

      <div className="fixed bottom-10 left-20 opacity-20 z-[-1]">
        <Grid size={90} strokeWidth={0.5} />
      </div>

      <div className="fixed bottom-10 right-20 opacity-25 z-[-1]">
        <Layers size={80} strokeWidth={0.6} />
      </div>

      {/* Additional Icons */}
      <div className="fixed top-20 left-40 opacity-20 z-[-1]">
        <PlusCircle size={75} strokeWidth={0.6} /> {/* Add */}
      </div>

      <div className="fixed top-24 right-28 opacity-20 z-[-1]">
        <Wrench size={85} strokeWidth={0.5} /> {/* Maintain */}
      </div>

      <div className="fixed bottom-32 left-32 opacity-25 z-[-1]">
        <ClipboardList size={80} strokeWidth={0.6} /> {/* Manage */}
      </div>

      <div className="fixed bottom-40 right-36 opacity-20 z-[-1]">
        <HelpCircle size={90} strokeWidth={0.5} /> {/* Help */}
      </div>

      <div className="fixed top-32 right-20 opacity-15 z-[-1]">
        <ShieldCheck size={95} strokeWidth={0.5} /> {/* Safe */}
      </div>

      <div className="fixed bottom-24 left-14 opacity-20 z-[-1]">
        <RefreshCw size={85} strokeWidth={0.6} /> {/* Rebuild */}
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-5xl px-6 md:px-12 py-12 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;
