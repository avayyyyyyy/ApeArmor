import Image from "next/image";
import React from "react";
import monkey from "@/public/Monkey3.png";
import { Star } from "lucide-react";

function Testimonial() {
  return (
    <div className="lg:bg-foreground/5 h-fit lg:py-20 lg:my-20 mt-[600px] mx-auto  lg:rounded-lg lg:shadow-2xl lg:mt-14 max-w-[80vw] lg:border border-primary">
      <div className="mx-auto w-full flex items-center justify-center">
        <h1 className="lg:text-5xl lg:flex block  items-center text-3xl text-center font-extrabold">
          <p className=" shrink-0 lg:text-5xl text-4xl ">What our</p>
          <p className="lg:text-5xl text-4xl shrink-0">
            <span className="text-primary  ml-1  underline decoration-wavy">
              Customers
            </span>{" "}
            says...
          </p>
          <span className="hidden lg:block">
            <Image className="w-12 shrink-0 lg:w-20" src={monkey} alt="ape" />
          </span>
        </h1>
      </div>
      <div className="flex flex-wrap gap-10 mt-10  justify-center w-full">
        <div className="max-w-64 bg-secondary-foreground/5 p-4 rounded-md border border-primary shadow-lg">
          <div className="flex text-primary gap-0.5">
            <Star className="text-primary" fill="#EA580B" />
            <Star className="text-primary" fill="#EA580B" />
            <Star className="text-primary" fill="#EA580B" />
            <Star className="text-primary" fill="#EA580B" />
            <Star className="text-primary" fill="#EA580B" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-primary sm:text-3xl">
              Funk&apos; Fever
            </p>

            <p className="mt-4 leading-relaxed text-foreground">
              This product changed my life! I used to struggle with
              teleportation, but after just one use of this teleportation
              device, I can now zip around the universe with ease.{" "}
              <span className="bg-primary text-primary-foreground px-1">
                10/10
              </span>{" "}
              would teleport again!
            </p>
          </div>
          <footer className="mt-4 text-sm font-medium text-foreground sm:mt-6">
            &mdash; Blaze Thunderbolt
          </footer>
        </div>
        <div className="max-w-64 bg-secondary-foreground/5 p-4 rounded-md border border-primary shadow-lg">
          <div className="flex text-primary gap-0.5">
            <Star className="text-primary" fill="#EA580B" />
            <Star className="text-primary" fill="#EA580B" />
            <Star className="text-primary" fill="#EA580B" />
            <Star className="text-primary" fill="#EA580B" />
            <Star className="text-primary" fill="#EA580B" />
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold text-primary sm:text-3xl">
              Boogie&apos; Bliss
            </p>

            <p className="mt-4 leading-relaxed text-foreground">
              I never believed in magic until I tried this potion. Not only did
              it make me invisible, but it also gave me the ability to talk to
              unicorns! My life has become a fairytale{" "}
              <span className="bg-primary text-primary-foreground px-1">
                {" "}
                thanks to this
              </span>{" "}
              miraculous elixir.
            </p>
          </div>
          <footer className="mt-4 text-sm font-medium text-foreground sm:mt-6">
            &mdash; Aurora Moonshadow
          </footer>
        </div>
        <div className="max-w-64 bg-secondary-foreground/5 p-4 rounded-md border border-primary shadow-lg">
          <div className="flex text-primary gap-0.5">
            <Star className="text-primary" fill="#EA580B" />
            <Star className="text-primary" fill="#EA580B" />
            <Star className="text-primary" fill="#EA580B" />
            <Star className="text-primary" fill="#EA580B" />
            <Star className="text-primary" fill="#EA580B" />
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold text-primary sm:text-3xl">
              Rhythm&apos; Revival
            </p>

            <p className="mt-4 leading-relaxed text-foreground">
              I bought this time machine on a whim and boy, was it worth it! Now
              I can visit any era I want, from ancient Egypt to the distant
              future.{" "}
              <span className="bg-primary text-primary-foreground px-1">
                Highly recommend!
              </span>
            </p>
          </div>
          <footer className="mt-4 text-sm font-medium text-foreground sm:mt-6">
            &mdash; Zephyr Starlight
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
