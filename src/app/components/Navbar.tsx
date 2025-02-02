"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const route = useRouter();

  const handleNavigate = () => {
    route.push("/");
  };

  console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);

  return (
    <nav
      className="fixed top-0 left-0 w-full flex items-center justify-end px-8 py-4 
  bg-transparent backdrop-blur-md  md:backdrop-blur-none  z-50"
    >
      <div
        onClick={handleNavigate}
        className="flex cursor-pointer items-center z-5 space-x-3"
      >
        <Image
          src="/mmLogo.png"
          alt="Make My Web App Logo"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
    </nav>
  );
}
