"use client";
import React from "react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"
import AnimatedBackground from "@/app/components/Animation";
import { z } from "zod";


interface ProjectFormData {
  projectType: string;
  timeSpan: string;
  flow: string[];
  frontend: string;
  backend: string;
  database: string;
};

const projectTypes = [
  { label: "Web", value: "web", timeSpan: 30 },
  { label: "Portfolio", value: "portfolio", timeSpan: 14 },
  { label: "App", value: "app", timeSpan: 45 },
];

const flowOptions = [
  { label: "Admin Flow", value: "admin" },
  { label: "User Flow", value: "user" },
  { label: "Superadmin Flow", value: "superadmin" },
];

const frontendTech = [
  { label: "React.js", value: "react" },
  { label: "Next.js", value: "next" },
];

const backendTech = [
  { label: "Node.js", value: "node" },
  { label: "Express", value: "express" },
  { label: "Fastify", value: "fastify" },
];

const defaultDB = "MongoDB";
export default function ProjectForm() {

const routes = useRouter()
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProjectFormData>({
    defaultValues: {
      projectType: "web",
      timeSpan: "30 Days",
      flow: [],
      frontend: "react",
      backend: "node",
      database: defaultDB,
    },
  });

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
    console.log("data", data);
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
        toast.success("Form submitted successfully!", {
          duration: 3000,
          style: {
            background: "#2c2c2c",
            color: "#fff",
            fontWeight: "bold",
          },
        });
  
        routes.push("/");
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
        className=" p-8 rounded-lg  w-full max-w-lg text-white space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Make Your Project</h2>

        <div>
          <label className="block font-medium mb-2">Project Type</label>
          <div className="flex flex-col space-y-2">
            {projectTypes.map(({ label, value }) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register("projectType", { required: true })}
                  value={value}
                  className="hidden peer"
                />
                <div className="w-4 h-4 border border-white rounded-full flex items-center justify-center peer-checked:bg-white">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {(projectType === "web" || projectType === "app") && (
          <div>
            <label className="block font-medium mb-2">Choose Flow <span className="text-red-400">*</span></label>
            <div className="flex flex-col space-y-2">
              {flowOptions.map(({ label, value }) => (
                <label key={value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("flow", { required: projectType as string !== "portfolio" })}
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
            {errors.flow && (
              <p className="text-red-400 text-sm mt-1">At least one flow is required.</p>
            )}
          </div>
        )}

        <div>
          <label className="block font-medium mb-2">Frontend Technology</label>
          <div className="flex flex-col space-y-2">
            {frontendTech.map(({ label, value }) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register("frontend", { required: true })}
                  value={value}
                  className="hidden peer"
                />
                <div className="w-4 h-4 border border-white rounded-full flex items-center justify-center peer-checked:bg-white">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {projectType !== "portfolio" && (
          <div>
            <label className="block font-medium mb-2">Backend Technology</label>
            <div className="flex flex-col space-y-2">
              {backendTech.map(({ label, value }) => (
                <label key={value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    {...register("backend", { required: true })}
                    value={value}
                    className="hidden peer"
                  />
                  <div className="w-4 h-4 border border-white rounded-full flex items-center justify-center peer-checked:bg-white">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {projectType !== "portfolio" && (
          <div>
            <label className="block font-medium">Database</label>
            <input
              {...register("database")}
              readOnly
              value={defaultDB}
              className="mt-1 block w-full p-2 bg-gray-800 border border-gray-600 text-white rounded-md"
            />
          </div>
        )}

        <div>
          <label className="block font-medium">Time Span</label>
          <input
            {...register("timeSpan")}
            readOnly
            className="mt-1 block w-full p-2 bg-gray-800 border border-gray-600 text-white rounded-md"
          />
        </div>

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
