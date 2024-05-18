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

export const ModalContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

export default function ProgressBarContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <ProgressContext.Provider value={[progress, setProgress]}>
      <ModalContext.Provider value={[isModalOpen, setIsModalOpen]}>
        {children}
      </ModalContext.Provider>
    </ProgressContext.Provider>
  );
}
