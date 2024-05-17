import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";
import DarkBorder from "@/public/assets/phone-template-dark-edges.png";
import LightBorder from "@/public/assets/phone-template-white-edges.png";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string | any;
  dark?: boolean;
}

const Phone = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-10  overflow-hidden",
        className
      )}
      {...props}
    >
      <Image
        src={dark ? DarkBorder : LightBorder}
        className="pointer-events-none  select-none"
        alt="phone image"
      />

      <div className="absolute -z-10 inset-0">
        <Image
          width={200}
          height={200}
          className="object-cover min-w-full min-h-full"
          src={imgSrc}
          alt="overlaying phone image"
        />
      </div>
    </div>
  );
};

export default Phone;
