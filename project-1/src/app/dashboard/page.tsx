"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  const roles = [
    {
      title: "Super Admin",
      description: "Full system access with highest privileges",
      color: "bg-purple-600 hover:bg-purple-700",
      icon: "/globe.svg",
    },
    {
      title: "Admin",
      description: "Manage users and content",
      color: "bg-blue-600 hover:bg-blue-700",
      icon: "/window.svg",
    },
    {
      title: "User",
      description: "Access your personal dashboard",
      color: "bg-green-600 hover:bg-green-700",
      icon: "/user.svg",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="text-center pt-20 pb-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select your role to continue
        </p>
      </div>

      {/* Role Selection Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {roles.map((role) => (
            <div
              key={role.title}
              className="relative group bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="w-12 h-12 mb-4 relative">
                  <Image
                    src={role.icon}
                    alt={`${role.title} icon`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {role.title}
                </h3>
                <p className="text-gray-600 mb-6">{role.description}</p>
                <button
                  onClick={() =>
                    router.push(
                      `/signin?role=${role.title
                        .toLowerCase()
                        .replace(" ", "-")}`
                    )
                  }
                  className={`w-full ${role.color} text-white rounded-md px-4 py-2 font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${role.color}`}
                >
                  Login as {role.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pb-8 text-center text-gray-600">
        <p>© 2025 Your Company. All rights reserved.</p>
      </footer>
    </main>
  );
}
