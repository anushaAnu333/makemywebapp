"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

const formSchema = z.object({
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

// Animated Background Component
const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-950/15 to-slate-800/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-950/15 to-gray-900/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
  </div>
);

export default function ContactForm() {
  const routes = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!", {
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #1e40af, #3730a3)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "12px",
            border: "1px solid #3b82f6",
          },
        });

        routes.push("/success");
      } else {
        toast.error(result.error || "Something went wrong!", {
          style: {
            background: "#dc2626",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "12px",
          },
        });
      }
    } catch {
      toast.error("Server error occurred", {
        style: {
          background: "#dc2626",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "12px",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-slate-950 text-white flex items-center justify-center p-6">
      <AnimatedBackground />

      <div
        className={`relative z-10 w-full max-w-md transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-slate-800/40 to-gray-900/40 border border-slate-700/50 rounded-full text-sm font-medium backdrop-blur-md mb-4">
            📞 Get In Touch
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-300">
            Let&apos;s discuss your project requirements
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-gradient-to-br from-slate-950/80 to-gray-900/80 backdrop-blur-md border border-slate-800/60 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Phone Number Field */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-blue-200 flex items-center gap-2">
                <span className="text-xl">📱</span>
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="Enter your phone number"
                  className="w-full p-4 bg-slate-900/50 border border-slate-700/50 text-white rounded-xl backdrop-blur-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>
              {errors.phone && (
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-blue-200 flex items-center gap-2">
                <span className="text-xl">📧</span>
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email address"
                  className="w-full p-4 bg-slate-900/50 border border-slate-700/50 text-white rounded-xl backdrop-blur-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="group w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <span className="text-xl">📨</span>
                      Send Message
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
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="pt-6 border-t border-slate-700/50">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">
                  Or reach us directly:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                  <div className="flex items-center gap-2 text-blue-300">
                    <span className="text-lg">⚡</span>
                    <span>24-hour response</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-300">
                    <span className="text-lg">🎯</span>
                    <span>Free consultation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Space - Placeholder */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-slate-900/40 to-gray-900/40 backdrop-blur-sm border border-slate-800/40 rounded-xl p-6 max-w-[300px] mx-auto">
            <div className="text-slate-400 text-sm">
              <div className="w-full h-32 bg-slate-800/30 rounded-lg flex items-center justify-center mb-2">
                <span className="text-xs">Advertisement Space</span>
              </div>
              <p className="text-xs">Your ad content will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
