import { ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import user1 from "@/public/Users/User1.jpg";
import user2 from "@/public/Users/User2.jpg";
import user3 from "@/public/Users/User3.jpg";
import user4 from "@/public/Users/User4.jpg";
import user5 from "@/public/Users/User5.jpg";
import Phone from "./Phone";
import MainMonkey from "@/public/MainMonkey.jpg";
import monkey from "@/public/Monkey5.png";
import UserCount from "./UserCount";
import YourImageIcon from "@/public/assets/your-image.png";
import { Button } from "./ui/button";
import Link from "next/link";

function Hero() {
  return (
    <div className="lg:bg-foreground/5 lg:rounded-lg lg:shadow-2xl lg:mt-14 mt-10  lg:border border-primary">
      <div className="max-w-[80vw] h-[80vh] items-center mx-auto lg:flex">
        <div className="w-full mx-auto">
          <div className="mx-auto flex flex-col">
            <h1 className="lg:text-7xl text-4xl text-center font-extrabold">
              Your Image on a
            </h1>
            <h1 className="lg:text-6xl lg:ml-7 items-center justify-center  flex text-3xl my-3 text-center font-extrabold">
              <span className="bg-primary p-1 mr-1 rotate-[-3deg]  text-primary-foreground">
                Custom
              </span>
              {""}
              Phone Case
              <span className="hidden lg:block">
                <Image
                  className="w-12 shrink-0 lg:w-20"
                  src={monkey}
                  alt="ape"
                />
              </span>
            </h1>
          </div>
          <p className="w-[80%] lg:w-[80%] lg:text-start  lg:mx-24 m-auto mt-8 text-foreground font-medium  text-center">
            Capture your favorite memories with your own,{" "}
            <span className="font-extrabold text-secondary-foreground">
              one-of-one
            </span>{" "}
            phone case.{" "}
            <span className="text-primary font-bold underline decoration-wavy">
              {" "}
              ApeArmor
            </span>{" "}
            allows you to protect your memories, not just your phone case.
          </p>
          <ul className="w-fit lg:text-start  lg:mx-24 font-bold text-muted-foreground  mx-auto">
            <li className="flex items-center gap-2 ">
              <span>
                <Check size={18} className="text-primary" />
              </span>
              High Quality, Durable Material.
            </li>
            <li className="flex items-center gap-2 ">
              {" "}
              <span>
                <Check size={18} className="text-primary" />
              </span>
              5 Year print garauntee.
            </li>
            <li className="flex items-center gap-2 ">
              {" "}
              <span>
                <Check size={18} className="text-primary" />
              </span>
              Modern iPhone models supported.
            </li>
          </ul>
          <div className="mt-10 w-fit mx-auto lg:text-start  lg:mx-24  flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="flex">
              <Image
                className="inline-block object-cover h-12 w-12 rounded-full ring-2 ring-primary "
                src={user1}
                alt=""
              />
              <Image
                className="inline-block object-cover h-12 w-12 rounded-full ring-2 ring-primary "
                src={user2}
                alt=""
              />
              <Image
                className="inline-block object-cover h-12 w-12 rounded-full ring-2 ring-primary "
                src={user3}
                alt=""
              />
              <Image
                className="inline-block object-cover h-12 w-12 rounded-full ring-2 ring-primary "
                src={user4}
                alt=""
              />
              <Image
                className="inline-block object-cover  h-12 w-12 rounded-full ring-2 ring-primary "
                src={user5}
                alt=""
              />
            </div>
          </div>
          <div className="flex mt-6 text-primary lg:text-start  lg:mx-24  w-fit mx-auto">
            <Star fill="#EA580B" />
            <Star fill="#EA580B" />
            <Star fill="#EA580B" />
            <Star fill="#EA580B" />
            <Star fill="#EA580B" />
          </div>
          <p className="w-fit mx-auto mt-2 font-medium lg:text-start  lg:mx-24  text-muted-foreground ">
            <span className="font-bold text-foreground">
              <UserCount />
            </span>{" "}
            Happy customers.
          </p>
          <div className="w-full flex justify-center">
            <Button asChild className="lg:hidden my-4">
              <Link href={"/create"}>
                Create your case now
                <span>
                  <ArrowRight className="ml-1" size={18} />
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="w-fit h-fit lg:flex mt-[-30px] lg:mt-0 lg:pr-20  mx-auto">
          <Phone
            className="lg:w-[380px] w-[300px]  mt-20 lg:mt-0  rounded-[45px] shadow-2xl"
            imgSrc={MainMonkey}
          />
          <div className="hidden lg:block">
            <Image
              className="w-44 mt-[-50px] ml-[-20px] "
              src={YourImageIcon}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
