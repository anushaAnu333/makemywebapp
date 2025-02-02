"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import AnimatedBackground from "@/app/components/Animation";
import { z } from "zod";

interface ProjectFormData {
  projectType: string;
  managingTimePeriod: string;
  flow: string[];
  frontend: string;
  backend: string;
  database: string;
}

const projectTypes = [
  { label: "Web", value: "web" },
  { label: "App", value: "app" },
];

const flowOptions = [
  { label: "Admin Flow", value: "admin" },
  { label: "User Flow", value: "user" },
  { label: "Superadmin Flow", value: "superadmin" },
];

const frontendTech = [
  { label: "React.js", value: "react" },
  { label: "Next.js", value: "next" },
  { label: "Vue.js", value: "vue" },
  { label: "Nuxt.js", value: "nuxt" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid.js", value: "solid" },
  { label: "Qwik", value: "qwik" },
  { label: "Astro", value: "astro" },
  { label: "Preact", value: "preact" },
  { label: "Ember.js", value: "ember" },
  { label: "Other", value: "other" },
];

const backendTech = [
  { label: "Node.js", value: "node" },
  { label: "Express.js", value: "express" },
  { label: "Fastify", value: "fastify" },
  { label: "NestJS", value: "nestjs" },
  { label: "Other", value: "other" },
];

const managingTimePeriodOptions = [
  { label: "3 Months", value: "3 Months" },
  { label: "6 Months", value: "6 Months" },
  { label: "1 Year", value: "1 Year" },
  { label: "2 Years", value: "2 Years" },
];

const defaultDB = "MongoDB";

export default function ProjectForm() {
  const router = useRouter();
  const { register, handleSubmit,  formState: {  } } = useForm<ProjectFormData>({
    defaultValues: {
      projectType: "web",
      managingTimePeriod: "3 Months",
      flow: [],
      frontend: "react",
      backend: "node",
      database: defaultDB,
    },
  });

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
        toast.success("Form submitted successfully!", {
          duration: 3000,
          style: { background: "#2c2c2c", color: "#fff", fontWeight: "bold" },
        });
        router.push("/");
      } else {
        toast.error(result.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error(
        error instanceof z.ZodError
          ? error.errors.map((err) => err.message).join(", ")
          : "Server error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <AnimatedBackground />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 rounded-lg w-full max-w-lg text-white space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Manage My Project</h2>

        {/* Project Type */}
        <div>
          <label className="block font-medium mb-2">Project Type</label>
          <select {...register("projectType", { required: true })} className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md">
            {projectTypes.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Managing Time Period (Dropdown) */}
        <div>
          <label className="block font-medium mb-2">Managing Time Period</label>
          <select {...register("managingTimePeriod", { required: true })} className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md">
            {managingTimePeriodOptions.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Flow Selection */}
        <div>
          <label className="block font-medium mb-2">Choose Flow</label>
          <div className="flex flex-col space-y-2">
            {flowOptions.map(({ label, value }) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register("flow")}
                  value={value}
                  className="hidden peer"
                />
                <div className="w-4 h-4 border border-white rounded-md flex items-center justify-center peer-checked:bg-white">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Frontend Technology */}
        <div>
          <label className="block font-medium mb-2">Frontend Technology</label>
          <select {...register("frontend", { required: true })} className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md">
            {frontendTech.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Backend Technology */}
        <div>
          <label className="block font-medium mb-2">Backend Technology</label>
          <select {...register("backend", { required: true })} className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md">
            {backendTech.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Database */}
        <div>
          <label className="block font-medium mb-2">Database</label>
          <input
            {...register("database")}
            readOnly
            value={defaultDB}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-2 rounded-md transition hover:bg-gray-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
