"use client";
import { useContext } from "react";
import { ModalContext } from "@/ContextAPI/ProgressBarContext";
import { Button } from "@/components/ui/button";
import {
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import Image from "next/image";
import monkeyImage from "/src/public/Monkey4.png";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => setIsModalOpen(!isModalOpen)}
    >
      <DialogContent className="sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-4xl font-bold ">
            Login
          </DialogTitle>
          <DialogDescription className="text-center">
            Your <span className="font-bold text-primary ">configuration</span>{" "}
            was saved, please login or create an account to complete your
            purchase.
          </DialogDescription>
          <Image
            src={monkeyImage}
            className="mx-auto"
            width={100}
            height={100}
            alt="Logo"
          />
        </DialogHeader>
        <Separator />
        <div className="gap-4 flex py-4 w-full ">
          <LoginLink className="w-[50%]">
            <Button className="w-full" variant={"secondary"}>
              Login
            </Button>
          </LoginLink>
          <RegisterLink className="w-[50%]">
            <Button className="w-full">Sign up</Button>
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ChromeIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
