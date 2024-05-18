import Image from "next/image";
import Link from "next/link";
import React from "react";
import Picture from "/src/public/assets/testimonials/2.jpg";
import Phone from "./Phone";
import Arrow from "/src/public/assets/arrow.png";
import { ArrowRight, Check, Github } from "lucide-react";

const LastSection = () => {
  return (
    <div>
      <div className="text-center max-w-[80vw] mx-auto">
        <h2 className="text-3xl max-w-2xl pb-2 mx-auto font-extrabold text-foreground sm:text-5xl">
          Upload your photo and get{" "}
          <span className=" px-1 mt-2 ">
            your own case
          </span>{" "}
          now!
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Preserve your cherished moments with a bespoke phone case that&apos;s
          as unique as your memories. ApeArmor safeguards not only your device
          but the precious snapshots of your life.
        </p>
      </div>

      <div className="flex lg:mt-11 mt-7 lg:flex-row flex-col gap-5 items-center  w-fit mx-auto ">
        <div className="h-full">
          <Image
            className="lg:w-[300px]  w-[200px] m-auto h-full shadow-lg "
            src={Picture}
            alt="Your Image"
          />
        </div>
        <div className="h-full">
          <Image
            className="w-[100px] rotate-90 lg:rotate-0 m-8  h-fit"
            src={Arrow}
            alt="YourImageIcon"
          />
        </div>
        <div className="h-full">
          <Phone
            className="lg:w-[300px] w-[200px] h-full lg:mt-0 lg:rounded-[45px] rounded-[35px] shadow-2xl"
            imgSrc={Picture}
          />
        </div>
      </div>

      <div className="max-w-[80vw] mx-auto">
        <ul className="w-fit lg:text-start lg:mx-auto font-medium text-secondary-foreground  mx-auto mt-14">
          <li className="flex items-center gap-2 ">
            <span>
              <Check size={18} className="text-primary" />
            </span>
            High Quality, Silicon Material.
          </li>
          <li className="flex items-center gap-2 ">
            {" "}
            <span>
              <Check size={18} className="text-primary" />
            </span>
            Scratch and fingerprint resistance.
          </li>
          <li className="flex items-center gap-2 ">
            {" "}
            <span>
              <Check size={18} className="text-primary" />
            </span>
            Wireless charging compatible.
          </li>
          <li className="flex items-center gap-2 ">
            {" "}
            <span>
              <Check size={18} className="text-primary" />
            </span>
            5 year print warranty.
          </li>
          <Link
            href="/create"
            className="mt-8 mx-auto transition-all flex items-center gap-2  rounded-full border border-primary px-12 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring active:bg-primary outline-none ring-0"
          >
            Create Your Case Now <ArrowRight size={18} />
          </Link>
        </ul>
      </div>

      <div className="flex mt-10 mx-6 lg:mx-0 flex-col items-center gap-4 rounded-lg bg-primary p-6 shadow-lg sm:flex-row sm:justify-between">
        <strong className="text-xl text-primary-foreground sm:text-xl">
          {" "}
          Meet the developer here!{" "}
        </strong>
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-prim bg-prim px-8 py-3 text-primbg-primary hover:bg-transparent hover:text-prim focus:outline-none focus:ring active:bg-prim/90"
          href="https://github.com/avayyyyyyy"
          target="_blank"
        >
          <span className="text-sm text-primary-foreground  font-medium">
            {" "}
            Let&apos;s Get GitHub{" "}
          </span>

          <Github className="text-primary-foreground" size={18} />
        </Link>
      </div>
    </div>
  );
};

export default LastSection;
