"use client";
import React from "react";
import CountUp from "react-countup";

const UserCount = () => {
  return (
    <>
      <CountUp end={1100} duration={3} start={0} />+
    </>
  );
};

export default UserCount;
