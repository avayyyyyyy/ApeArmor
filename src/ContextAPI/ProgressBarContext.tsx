"use client";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export const ProgressContext = createContext<
  [number, Dispatch<SetStateAction<number>>]
>([0, () => {}]);

export default function ProgressBarContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState<number>(0);

  return (
    <ProgressContext.Provider value={[progress, setProgress]}>
      {children}
    </ProgressContext.Provider>
  );
}
