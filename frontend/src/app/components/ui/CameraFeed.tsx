'use client';

import { API_ENDPOINTS } from "@/app/utils/constants";


interface CameraFeedProps {
  className?: string;
}

export default function CameraFeed({ className = '' }: CameraFeedProps) {
  return (
    <img
      src={API_ENDPOINTS.VIDEO_FEED}
      alt="Camera Feed"
      className={`w-full rounded-xl border-2 border-orange-500 ${className}`}
    />
  );
}