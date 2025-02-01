"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AnimatedBackground from "../components/Animation";
import { toast } from "react-hot-toast";

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
  const { register, handleSubmit, watch, setValue } = useForm({
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
  const selectedFlows = watch("flow") || [];

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log("Project Data:", data);
    toast.success("Project submitted successfully!", {
      duration: 3000,
      style: {
        background: "#2c2c2c",
        color: "#fff",
        fontWeight: "bold",
      },
    });
  };

  return (
    <div>
      <AnimatedBackground />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 gap-4 rounded-md max-w-md mx-auto  text-white"
      >
        <h2 className="text-xl font-semibold">Select Your Project</h2>

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
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block font-medium">Database</label>
            <input
              {...register("database")}
              readOnly
              value={defaultDB}
              className="mt-1 block w-full p-2 bg-gray-800 border border-gray-600 text-white rounded-md"
            />
          </div>
        )}

        <div className="mb-4">
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
