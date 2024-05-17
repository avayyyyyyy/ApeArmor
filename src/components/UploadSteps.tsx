"use client";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import React from "react";
import monkey1 from "@/public/Monkey1.png";
import monkey2 from "@/public/Monkey4.png";
import monkey3 from "@/public/Monkey3.png";
import { usePathname } from "next/navigation";

function UploadSteps() {
  const path = usePathname();
  console.log(path);

  let step1 = false;
  let step2 = false;
  let step3 = false;

  if (path === "/create") {
    step1 = true;
  } else if (path === "/create/design") {
    step1 = true;
    step2 = true;
  }
  if (path === "/create/design/preview") {
    step1 = true;
    step2 = true;
    step3 = true;
  }
  return (
    <div>
      <div>
        <div className="my-8 lg:max-w-[80vw] mx-10 lg:mx-auto">
          <h2 className="sr-only">Steps</h2>
          <div>
            <ol className="grid grid-cols-3 divide-x divide-primary overflow-hidden rounded-t-lg border border-primary text-sm text-foreground sm:grid-cols-3">
              <li
                className={`flex items-center ${
                  step1 ? "text-primary" : null
                }  justify-center gap-2 p-2`}
              >
                <span>
                  <Image
                    src={monkey1}
                    className="hidden lg:block"
                    width={40}
                    alt=""
                  />
                </span>{" "}
                <p className="leading-none">
                  <strong className="block font-medium">Step 1.</strong>
                  <small className="mt-1"> Add Images </small>
                </p>
              </li>

              <li className="relative flex items-center justify-center gap-2 bg-primary-foreground p-4">
                <span className="absolute -left-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45  rounded-full bg-primary-foreground   border border-primary sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-primary rtl:border-e-0 rtl:border-t-0 rtl:bg-primary"></span>
                <span className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 rounded-full  bg-primary-foreground   border border-primary sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-primary rtl:border-e-0 rtl:border-t-0 rtl:bg-primary"></span>
                <span>
                  <Image
                    src={monkey2}
                    className="hidden lg:block"
                    width={40}
                    alt=""
                  />
                </span>{" "}
                <p className={`leading-none ${step2 ? "text-primary" : null} `}>
                  <strong className="block font-medium"> Step 2. </strong>
                  <small className="mt-1 hidden lg:block ">
                    {" "}
                    Select iPhone Model{" "}
                  </small>
                  <small className="mt-1 lg:hidden block  ">
                    {" "}
                    Select Model{" "}
                  </small>
                </p>
              </li>

              <li className="flex items-center justify-center gap-2 p-4">
                <span>
                  <Image
                    src={monkey3}
                    className="hidden lg:block"
                    width={40}
                    alt=""
                  />
                </span>{" "}
                <p className={`leading-none ${step2 ? "text-primary" : null} `}>
                  <strong className="block font-medium"> Step 3. </strong>
                  <small className="mt-1"> Checkout </small>
                </p>
              </li>
            </ol>
          </div>
          <ProgressBar />
        </div>
      </div>
    </div>
  );
}

export default UploadSteps;
