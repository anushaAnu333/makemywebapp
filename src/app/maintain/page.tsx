"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useState, useEffect } from "react";

interface ProjectFormData {
  projectType: string;
  managingTimePeriod: string;
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
    icon: "🌐",
    description: "Maintain web applications",
  },
  {
    label: "Mobile App",
    value: "app",
    icon: "📱",
    description: "Maintain mobile applications",
  },
];

const flowOptions = [
  {
    label: "Admin Flow",
    value: "admin",
    icon: "👨‍💼",
    description: "Administrative interface maintenance",
  },
  {
    label: "User Flow",
    value: "user",
    icon: "👤",
    description: "End-user experience maintenance",
  },
  {
    label: "Superadmin Flow",
    value: "superadmin",
    icon: "🔐",
    description: "System administration maintenance",
  },
];

const frontendTech = [
  { label: "React.js", value: "react", icon: "⚛️" },
  { label: "Next.js", value: "next", icon: "🚀" },
  { label: "Vue.js", value: "vue", icon: "💚" },
  { label: "Nuxt.js", value: "nuxt", icon: "🔷" },
  { label: "Angular", value: "angular", icon: "🅰️" },
  { label: "Svelte", value: "svelte", icon: "🧡" },
  { label: "Solid.js", value: "solid", icon: "🔵" },
  { label: "Qwik", value: "qwik", icon: "⚡" },
  { label: "Astro", value: "astro", icon: "🚀" },
  { label: "Preact", value: "preact", icon: "💜" },
  { label: "Ember.js", value: "ember", icon: "🔥" },
  { label: "Other", value: "other", icon: "🔧" },
];

const backendTech = [
  { label: "Node.js", value: "node", icon: "🟢" },
  { label: "Express.js", value: "express", icon: "🚄" },
  { label: "Fastify", value: "fastify", icon: "⚡" },
  { label: "NestJS", value: "nestjs", icon: "🦅" },
  { label: "Other", value: "other", icon: "🔧" },
];

const managingTimePeriodOptions = [
  {
    label: "3 Months",
    value: "3 Months",
    icon: "📅",
    price: "₹2,500",
    description: "Short-term maintenance",
  },
  {
    label: "6 Months",
    value: "6 Months",
    icon: "📆",
    price: "₹4,500",
    description: "Medium-term support",
  },
  {
    label: "1 Year",
    value: "1 Year",
    icon: "🗓️",
    price: "₹8,000",
    description: "Annual maintenance plan",
  },
  {
    label: "2 Years",
    value: "2 Years",
    icon: "📊",
    price: "₹14,000",
    description: "Long-term partnership",
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

interface CustomSelectProps {
  name: keyof ProjectFormData;
  options: Array<{ label: string; value: string }>;
  label: string;
  icon: string;
  required?: boolean;
}

interface TimePeriodOption {
  label: string;
  value: string;
  icon: string;
  price: string;
  description: string;
}

interface TimePeriodCardProps {
  option: TimePeriodOption;
  checked: boolean;
}

export default function ProjectForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  // const [currentStep, setCurrentStep] = useState(1);
  // const totalSteps = 6;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      projectType: "web",
      managingTimePeriod: "3 Months",
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

  const selectedFlows = watch("flow") || [];

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const response = await fetch("/api/maintain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Maintenance request submitted successfully!", {
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #1e40af, #3730a3)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "12px",
            border: "1px solid #3b82f6",
          },
        });
        router.push("/success");
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
        {...register(name)}
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

  const CustomSelect = ({
    name,
    options,
    label,
    icon,
    required = true,
  }: CustomSelectProps) => (
    <div className="space-y-3">
      <label className="text-lg font-semibold text-blue-200 flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        {label}
      </label>
      <div className="relative">
        <select
          {...register(name, { required })}
          className="w-full p-4 bg-slate-800/50 border border-slate-600/50 text-white rounded-xl backdrop-blur-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 appearance-none">
          {options.map(({ label, value }) => (
            <option key={value} value={value} className="bg-slate-800">
              {label}
            </option>
          ))}
        </select>
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  const TimePeriodCard = ({ option, checked }: TimePeriodCardProps) => (
    <label className="group relative cursor-pointer">
      <input
        type="radio"
        {...register("managingTimePeriod", { required: true })}
        value={option.value}
        className="sr-only peer"
      />
      <div
        className={`p-6 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm ${
          checked
            ? "border-blue-500 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 shadow-lg shadow-blue-500/20"
            : "border-slate-600/50 bg-slate-800/30 hover:border-blue-400/50 hover:bg-blue-500/5"
        }`}>
        <div className="text-center">
          <div className="text-3xl mb-2">{option.icon}</div>
          <h3 className="font-bold text-xl text-blue-100 mb-1">
            {option.label}
          </h3>
          <p className="text-2xl font-bold text-cyan-400 mb-2">
            {option.price}
          </p>
          <p className="text-sm text-gray-400">{option.description}</p>
        </div>
        <div
          className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all duration-300 ${
            checked ? "border-blue-500 bg-blue-500" : "border-gray-400"
          }`}>
          {checked && (
            <div className="w-full h-full rounded-full bg-white scale-50"></div>
          )}
        </div>
      </div>
    </label>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <AnimatedBackground />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div
          className={`w-full max-w-4xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-sm font-medium backdrop-blur-sm mb-4">
              🔧 Project Maintenance
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent">
              Manage Your Project
            </h1>
            <p className="text-gray-300">
              Keep your project running smoothly with our maintenance services
            </p>
          </div>

          {/* Progress Bar */}
          {/* <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm text-blue-400">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
            </div>
          </div> */}

          {/* Form Container */}
          <div className="bg-gradient-to-br from-slate-800/40 to-blue-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 space-y-8">
            {/* Project Type */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-blue-200 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Project Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <CustomRadio
                    key={type.value}
                    name="projectType"
                    value={type.value}
                    label={type.label}
                    icon={type.icon}
                    description={type.description}
                    checked={watch("projectType") === type.value}
                  />
                ))}
              </div>
            </div>

            {/* Managing Time Period */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-blue-200 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Maintenance Duration & Pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {managingTimePeriodOptions.map((option) => (
                  <TimePeriodCard
                    key={option.value}
                    option={option}
                    checked={watch("managingTimePeriod") === option.value}
                  />
                ))}
              </div>
            </div>

            {/* Flow Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-blue-200 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Flow Components to Maintain
              </h2>
              <div className="space-y-3">
                {flowOptions.map((flow) => (
                  <CustomCheckbox
                    key={flow.value}
                    name="flow"
                    value={flow.value}
                    label={flow.label}
                    icon={flow.icon}
                    description={flow.description}
                    checked={selectedFlows.includes(flow.value)}
                  />
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-blue-200 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                Current Technology Stack
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomSelect
                  name="frontend"
                  options={frontendTech}
                  label="Frontend Technology"
                  icon="🎨"
                />

                <CustomSelect
                  name="backend"
                  options={backendTech}
                  label="Backend Technology"
                  icon="⚙️"
                />
              </div>

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
                  <span className="text-xl">🔧</span>
                  Submit Maintenance Request
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
