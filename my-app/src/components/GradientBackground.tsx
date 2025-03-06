"use client";

import { useTheme } from "next-themes";

export default function GradientBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div 
      className="fixed inset-0 -z-10"
      style={{
        background: isDark 
          ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" 
          : "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 50%, #ede9fe 100%)",
        opacity: 0.8,
      }}
    >
      {/* Animated gradient circles */}
      <div 
        className="absolute w-[40%] h-[40%] rounded-full blur-3xl opacity-30 animate-blob"
        style={{
          top: '20%',
          left: '15%',
          backgroundColor: isDark ? '#3b82f6' : '#818cf8',
          animation: 'blob 25s infinite alternate',
        }}
      />
      
      <div 
        className="absolute w-[30%] h-[30%] rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000"
        style={{
          top: '40%',
          right: '15%',
          backgroundColor: isDark ? '#8b5cf6' : '#93c5fd',
          animation: 'blob 30s infinite alternate',
          animationDelay: '4s',
        }}
      />
      
      <div 
        className="absolute w-[35%] h-[35%] rounded-full blur-3xl opacity-30 animate-blob animation-delay-4000"
        style={{
          bottom: '15%',
          left: '30%',
          backgroundColor: isDark ? '#4f46e5' : '#c7d2fe',
          animation: 'blob 20s infinite alternate',
          animationDelay: '8s',
        }}
      />
    </div>
  );
} 