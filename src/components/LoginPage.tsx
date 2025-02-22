"use client";

import { Button } from "@/components/ui/button";
import { FaMicrosoft } from "react-icons/fa6";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface LoginPageProps {
  roles: string[];
}

export default function LoginPage({ roles }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState(roles[0] || "accounts");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    console.log("Form Data:", formValues);

    const res = await signIn("admin", {
      email: formValues.userId,
      password: formValues.password,
      // redirect: false,
      redirectTo: "/admin",
    });
    console.log(res, "res from credentials");
  };

  const handleMicrosoftLogin = async () => {
    try {
      const res = await signIn('microsoft-entra-id');
      console.log(res)
    } catch (error) {
      toast.error(`An error occurred: ${error}`);
    }
  };

  return (
    <div
      className="w-screen min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #ffffff, #f0f0f0)" }}
    >
      <div className="flex flex-col md:flex-row w-full min-h-[700px] p-6">
        {/* Faculty/Student Section */}
        <div className="flex-1 flex p-6 md:p-8 flex-col items-center justify-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-10">
            For Faculty/Student
          </h2>
          <Button
            onClick={handleMicrosoftLogin}
            className="w-full max-w-xs text-lg"
            size="lg"
          >
            <FaMicrosoft className="mr-2 h-5 w-5" />
            Login with Microsoft
          </Button>
        </div>

        {/* Divider */}
        <div className="inset-0  flex items-center justify-center">
          <div className="relative flex flex-col items-center h-full">
            <div className="flex-1 w-[2px] border border-gray-400" />
            <div className="p-4 text-gray-500">OR</div>
            <div className="flex-1 w-[2px] border border-gray-400" />
          </div>
        </div>

        {/* Other Staff Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-6">
            For Other Staff
          </h2>
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="w-full max-w-md p-4">
              <div className="relative bg-gray-100 h-14 rounded-full p-2">
                <div
                  className="absolute transition-all duration-300 h-10 bg-white rounded-full shadow-lg"
                  style={{
                    width: `${100 / roles.length}%`,
                    left: `${(roles.indexOf(selectedRole) * 100) / roles.length
                      }%`,
                  }}
                />
                <div className="relative h-full flex">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`flex-1 flex items-center justify-center capitalize font-medium transition-colors duration-300 z-10
                        ${selectedRole === role
                          ? "text-gray-800"
                          : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              <input type="hidden" name="role" value={selectedRole} />
            </div>

            <input
              className="h-9 w-full rounded-md border-gray-300 border-input outline-none bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground border-2 focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
              placeholder="User Id"
              name="userId"
              type="text"
            />
            <input
              className="h-9 w-full rounded-md border-gray-300 border-input outline-none bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground border-2 focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
              placeholder="Password"
              name="password"
              type="password"
            />
            <div className="flex justify-center">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
