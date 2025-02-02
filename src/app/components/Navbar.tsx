"use client";

import Image from "next/image";

export default function Navbar() {
  return (
<nav className="fixed top-0 left-0 w-full flex items-center justify-end px-8 py-4 
  bg-transparent backdrop-blur-md  md:backdrop-blur-none  z-50">

  <div className="flex items-center z-5 space-x-3">
  <Image 
          src="/mmLogo.png" 
          alt="Make My Web App Logo" 
          width={160} 
          height={72} 
          className="object-contain" 
        />
  </div>
</nav>
  
  );
}
