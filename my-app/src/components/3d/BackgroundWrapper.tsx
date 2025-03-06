'use client';

import dynamic from 'next/dynamic';

// Dynamically import the 3D background to avoid SSR issues
const Background3D = dynamic(() => import("./Background3D"), {
  ssr: false,
});

export default function BackgroundWrapper() {
  return <Background3D />;
} 