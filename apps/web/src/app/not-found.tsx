import React from "react";
import Link from "next/link";
import { IconAlertTriangle, IconHome } from "@tabler/icons-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-5">
      <div className="relative max-w-2xl w-full">
        {/* Animated background elements */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl "></div>
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 bg-gray-900/80 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-gray-800">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-8 text-red-500 ">
              <IconAlertTriangle size={80} strokeWidth={1.5} />
            </div>

            {/* 404 Text */}
            <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
              404
            </h1>

            {/* Message */}
            <h2 className="text-3xl font-semibold text-gray-100 mb-4">
              No worries bro 😎
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Currently route-less... like a GPS with commitment issues 🧭🤡
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <IconHome size={20} />
                Back to Home
              </Link>
            </div>

            {/* Floating Elements */}
            <div className="mt-12 flex space-x-8 opacity-50">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-purple-500 rounded-full animate-float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 rounded-2xl bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
