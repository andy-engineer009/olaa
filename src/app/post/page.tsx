"use client";
import InfluencerForm from "@/components/InfulancerForm";
import { useState } from "react";

export default function PostPage() {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div>
      <InfluencerForm  onSubmit={() => {}} />
    </div>
  );
}
