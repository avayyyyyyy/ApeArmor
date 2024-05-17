"use client";
import React, { useContext } from "react";
import { Progress } from "./ui/progress";
import { ProgressContext } from "@/ContextAPI/ProgressBarContext";
import { usePathname } from "next/navigation";

const ProgressBar = () => {
  const [progress, setProgress] = useContext(ProgressContext);

  const path = usePathname();

  console.log(path);

  if (path === "/create") {
    setProgress(3);
  } else if (path === "/create/design") {
    setProgress(33.66);
  } else if (path === "/create/design/preview") {
    setProgress(72.66);
  }

  return (
    <div>
      <Progress
        className="w-full h-2  text-primary rounded-t-lg"
        value={progress}
      />
    </div>
  );
};

export default ProgressBar;
