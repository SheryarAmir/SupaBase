"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/services/auth.services";

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const profile = await getUserProfile();
        if (profile.role !== "Super-Admin") {
          router.push("/");
        }
        setLoading(false);
      } catch (error) {
        router.push("/signin");
      }
    };

    checkAccess();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Super Admin Dashboard
            </h1>
            <button
              onClick={() => router.push("/signout")}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Add your super admin specific content here */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Super Admin Controls</h2>
          {/* Add your admin controls here */}
        </div>
      </main>
    </div>
  );
}
