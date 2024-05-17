import React from "react";

const Stats = () => {
  return (
    <div className="lg:bg-foreground/5 h-fit lg:py-20 lg:my-20 mx-auto  lg:rounded-lg lg:shadow-2xl lg:mt-14 max-w-[80vw] lg:border border-primary">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Trusted by eCommerce Businesses
          </h2>

          <p className="mt-4 text-muted-foreground sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            dolores laborum labore provident impedit esse recusandae facere
            libero harum sequi.
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x">
            <div className="flex flex-col border-2 rounded-md bg-muted-foreground/5 py-8 text-center">
              <div className="order-last text-lg font-medium text-muted-foreground">
                Total Sales
              </div>

              <div className="text-4xl font-extrabold  text-primary md:text-5xl">
                $4.8m
              </div>
            </div>

            <div className="flex flex-col border-2 rounded-md bg-muted-foreground/5 py-8 text-center">
              <div className="order-last text-lg font-medium text-muted-foreground">
                Official Addons
              </div>

              <div className="text-4xl font-extrabold  text-primary md:text-5xl">
                24
              </div>
            </div>

            <div className="flex flex-col  border-2 rounded-md bg-muted-foreground/5    px-4 py-8 text-center">
              <div className="order-last text-lg font-medium text-muted-foreground">
                Total Addons
              </div>

              <div className="text-4xl font-extrabold  text-primary md:text-5xl">
                86
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
