"use client";
import React, { useContext, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { checkAuth } from "@/app/create/design/preview/actions";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ModalContext } from "@/ContextAPI/ProgressBarContext";
import { LoginModal } from "./login-modal"; // Import the LoginModal component

function CheckoutLoading({ text, id }: { text: string; id: string }) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext);
  const router = useRouter();

  const { mutate: createStripeSession } = useMutation({
    mutationKey: ["checkout-session"],
    mutationFn: checkAuth,
    onSuccess: ({ url }) => {
      setLoading(false);
      if (url) {
        router.push(url);
      } else {
        throw new Error("Unable to generate a new URL");
      }
    },
    onError: () => {
      setLoading(false);
    },
  });

  const { user } = useKindeBrowserClient();

  async function handleCheckOut() {
    if (user) {
      createStripeSession(id);
    } else {
      localStorage.setItem("configurationId", id);
      setIsModalOpen(true);
      setLoading(false);
    }
  }

  return (
    <div className="w-full mt-6 flex justify-end">
      <Button
        onClick={() => {
          setLoading(true);
          handleCheckOut();
        }}
        disabled={loading}
      >
        {loading && (
          <span>
            <Loader2 className="mr-2 animate-spin" size={16} />
          </span>
        )}
        {text}
        <span>
          <ArrowRight className="ml-2" size={16} />
        </span>
      </Button>
      <LoginModal /> {/* Add the LoginModal component here */}
    </div>
  );
}

export default CheckoutLoading;
