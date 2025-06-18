"use client";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";

interface ProjectFormData {
  projectType: string;
  timeSpan: string;
  flow: string[];
  frontend: string;
  backend: string;
  database: string;
  email: string;
  mobile: string;
}

const projectTypes = [
  {
    label: "Web Application",
    value: "web",
    timeSpan: 30,
    icon: "🌐",
    description: "Full-featured web applications",
  },
  {
    label: "Portfolio Website",
    value: "portfolio",
    timeSpan: 14,
    icon: "📁",
    description: "Professional portfolio sites",
  },
  {
    label: "Mobile App",
    value: "app",
    timeSpan: 45,
    icon: "📱",
    description: "Cross-platform mobile apps",
  },
];

const flowOptions = [
  {
    label: "Admin Flow",
    value: "admin",
    icon: "👨‍💼",
    description: "Administrative interface",
  },
  {
    label: "User Flow",
    value: "user",
    icon: "👤",
    description: "End-user experience",
  },
  {
    label: "Superadmin Flow",
    value: "superadmin",
    icon: "🔐",
    description: "System administration",
  },
];

const frontendTech = [
  {
    label: "React.js",
    value: "react",
    icon: "⚛️",
    description: "Component-based library",
  },
  {
    label: "Next.js",
    value: "next",
    icon: "🚀",
    description: "Full-stack React framework",
  },
];

const backendTech = [
  {
    label: "Node.js",
    value: "node",
    icon: "🟢",
    description: "JavaScript runtime",
  },
  {
    label: "Express",
    value: "express",
    icon: "🚄",
    description: "Minimal web framework",
  },
  {
    label: "Fastify",
    value: "fastify",
    icon: "⚡",
    description: "High-performance framework",
  },
];

const defaultDB = "MongoDB";

// Animated Background Component
const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-600/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-indigo-600/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
  </div>
);

// Type interfaces for components
interface CustomRadioProps {
  name: keyof ProjectFormData;
  value: string;
  label: string;
  icon: string;
  description: string;
  checked: boolean;
}

interface CustomCheckboxProps {
  name: keyof ProjectFormData;
  value: string;
  label: string;
  icon: string;
  description: string;
  checked: boolean;
}

export default function ProjectForm() {
  const routes = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      projectType: "web",
      timeSpan: "30 Days",
      flow: [],
      frontend: "react",
      backend: "node",
      database: defaultDB,
      email: "",
      mobile: "",
    },
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projectType = watch("projectType");
  const flowValue = watch("flow");
  const selectedFlows = useMemo(() => flowValue || [], [flowValue]);

  useEffect(() => {
    const selectedType = projectTypes.find((t) => t.value === projectType);
    if (selectedType) {
      let calculatedTimeSpan = selectedType.timeSpan;

      if (
        (projectType === "web" || projectType === "app") &&
        selectedFlows.length === 3
      ) {
        calculatedTimeSpan += 15;
      }

      setValue("timeSpan", `${calculatedTimeSpan} Days`);
    }
  }, [projectType, selectedFlows, setValue]);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const response = await fetch("api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Project submitted successfully!", {
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
    } catch (error) {
      toast.error(
        error instanceof z.ZodError
          ? error.errors.map((err) => err.message).join(", ")
          : "Server error",
        {
          style: {
            background: "#dc2626",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "12px",
          },
        }
      );
    }
  };

  const CustomRadio = ({
    name,
    value,
    label,
    icon,
    description,
    checked,
  }: CustomRadioProps) => (
    <label className="group relative cursor-pointer">
      <input
        type="radio"
        {...register(name, { required: true })}
        value={value}
        className="sr-only peer"
      />
      <div
        className={`p-4 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm ${
          checked
            ? "border-blue-500 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 shadow-lg shadow-blue-500/20"
            : "border-slate-600/50 bg-slate-800/30 hover:border-blue-400/50 hover:bg-blue-500/5"
        }`}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon}</div>
          <div className="flex-grow">
            <h3 className="font-semibold text-blue-100">{label}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
              checked ? "border-blue-500 bg-blue-500" : "border-gray-400"
            }`}>
            {checked && (
              <div className="w-full h-full rounded-full bg-white scale-50"></div>
            )}
          </div>
        </div>
      </div>
    </label>
  );

  const CustomCheckbox = ({
    name,
    value,
    label,
    icon,
    description,
    checked,
  }: CustomCheckboxProps) => (
    <label className="group relative cursor-pointer">
      <input
        type="checkbox"
        {...register(name, {
          required: (projectType as string) !== "portfolio",
        })}
        value={value}
        className="sr-only peer"
      />
      <div
        className={`p-4 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm ${
          checked
            ? "border-blue-500 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 shadow-lg shadow-blue-500/20"
            : "border-slate-600/50 bg-slate-800/30 hover:border-blue-400/50 hover:bg-blue-500/5"
        }`}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon}</div>
          <div className="flex-grow">
            <h3 className="font-semibold text-blue-100">{label}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <div
            className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
              checked ? "border-blue-500 bg-blue-500" : "border-gray-400"
            }`}>
            {checked && (
              <svg
                className="w-3 h-3 text-white mx-auto mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </label>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <AnimatedBackground />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div
          className={`w-full max-w-2xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-sm font-medium backdrop-blur-sm mb-4">
              💡 Project Configuration
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent">
              Create Your Project
            </h1>
            <p className="text-gray-300">
              Let&apos;s build something amazing together
            </p>
          </div>

          {/* Form */}
          <div className="bg-gradient-to-br from-slate-800/40 to-blue-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 space-y-8">
            {/* Project Type */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-blue-200 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Project Type
              </h2>
              <div className="space-y-3">
                {projectTypes.map(({ label, value, icon, description }) => (
                  <CustomRadio
                    key={value}
                    name="projectType"
                    value={value}
                    label={label}
                    icon={icon}
                    description={description}
                    checked={watch("projectType") === value}
                  />
                ))}
              </div>
            </div>

            {/* Flow Selection */}
            {(projectType === "web" || projectType === "app") && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-blue-200 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Choose Flow
                  <span className="text-red-400 text-sm">*</span>
                </h2>
                <div className="space-y-3">
                  {flowOptions.map(({ label, value, icon, description }) => (
                    <CustomCheckbox
                      key={value}
                      name="flow"
                      value={value}
                      label={label}
                      icon={icon}
                      description={description}
                      checked={selectedFlows.includes(value)}
                    />
                  ))}
                </div>
                {errors.flow && (
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
                    At least one flow is required.
                  </p>
                )}
              </div>
            )}

            {/* Frontend Technology */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-blue-200 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Frontend Technology
              </h2>
              <div className="space-y-3">
                {frontendTech.map(({ label, value, icon, description }) => (
                  <CustomRadio
                    key={value}
                    name="frontend"
                    value={value}
                    label={label}
                    icon={icon}
                    description={description}
                    checked={watch("frontend") === value}
                  />
                ))}
              </div>
            </div>

            {/* Backend Technology */}
            {projectType !== "portfolio" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-blue-200 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  Backend Technology
                </h2>
                <div className="space-y-3">
                  {backendTech.map(({ label, value, icon, description }) => (
                    <CustomRadio
                      key={value}
                      name="backend"
                      value={value}
                      label={label}
                      icon={icon}
                      description={description}
                      checked={watch("backend") === value}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Database & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectType !== "portfolio" && (
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-blue-200 flex items-center gap-2">
                    <span className="text-2xl">🗄️</span>
                    Database
                  </label>
                  <input
                    {...register("database")}
                    readOnly
                    value={defaultDB}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 text-white rounded-xl backdrop-blur-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div className="space-y-3">
                <label className="text-lg font-semibold text-blue-200 flex items-center gap-2">
                  <span className="text-2xl">⏱️</span>
                  Estimated Timeline
                </label>
                <input
                  {...register("timeSpan")}
                  readOnly
                  className="w-full p-4 bg-slate-800/50 border border-slate-600/50 text-white rounded-xl backdrop-blur-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-blue-200 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                  5
                </span>
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-blue-200 flex items-center gap-2">
                    <span className="text-xl">📧</span>
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 text-white rounded-xl backdrop-blur-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
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

                <div className="space-y-3">
                  <label className="text-lg font-semibold text-blue-200 flex items-center gap-2">
                    <span className="text-xl">📱</span>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^\d{10,15}$/,
                        message: "Enter a valid mobile number (10-15 digits)",
                      },
                    })}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 text-white rounded-xl backdrop-blur-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.mobile && (
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
                      {errors.mobile.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="group w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transform">
                <span className="flex items-center justify-center gap-2">
                  Submit Project Request
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
          </div>
        </div>
      </div>
    </div>
  );
}
