import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "@/public/monkey2.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Announcement from "./Announcement";
import { ModeToggle } from "./ToggleTheme";

async function Header() {
  let isAdmin = false;
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  if (user?.email === process.env.ADMIN_EMAIL) {
    isAdmin = true;
  }

  return (
    <>
      <Announcement />

      <div className="flex sticky top-0 bg-primary-foreground dark:bg-black lg:z-20 z-[100]   w-screen items-center justify-between px-7 mb-5  py-4 border-b border-primary shadow-md ">
        <div>
          <Link className="font-bold flex items-center  text-xl" href={"/"}>
            <span>
              <Image
                className="hidden lg:block"
                width={40}
                height={40}
                src={logo}
                alt="CaseMonkey"
              />
            </span>
            <p className="underline decoration-wavy decoration-primary">
              Ape<span className="text-primary">Armor</span>
            </p>
          </Link>
        </div>
        <div className="gap-4 flex items-center">
          {/* <ModeToggle /> */}
          {isAdmin ? (
            <Button asChild variant={"secondary"}>
              <Link href={"/"}>Dashboard ✨</Link>
            </Button>
          ) : null}
          {user ? (
            <Button asChild variant={"secondary"}>
              <Link href={"/api/auth/logout"}>SignOut</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant={"secondary"}>
                <LoginLink>LogIn</LoginLink>
              </Button>
              <Button asChild variant={"secondary"}>
                <RegisterLink>SignUp</RegisterLink>
              </Button>
            </>
          )}
          <Button className="hidden lg:flex">
            <Link href={"/create"}>Create Case</Link>
            <span>
              <ArrowRight className="ml-1" size={18} />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Header;
