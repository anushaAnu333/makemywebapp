"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
    const routes = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // const onSubmit = (data: FormData) => {
  //   console.log("Form Data:", data);
  //   toast.success("Success", {
  //       duration: 3000,
  //       style: {
  //         background: "#2c2c2c",
  //         color: "#fff",
  //         fontWeight: "bold",
  //       },
  //     });
  //   routes.push('/')
  // };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/contact", { 
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
      toast.error( { error: error instanceof z.ZodError ? error.errors : "Server error" });
    }
  };
  

  return (
    <div className="flex items-center justify-center h-[80vh]  bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-white text-xl font-bold mb-4">Contact Form</h2>

        <div className="mb-4">
          <label className="text-white block mb-1">Phone Number</label>
          <input
            type="tel"
            {...register("phone")}
            placeholder="Enter phone number"
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-white block mb-1">Email Address</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter email"
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
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
