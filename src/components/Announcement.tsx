import React from "react";

function Announcement() {
  return (
    <div className="bg-primary px-4 py-3 text-primary-foreground">
      <p className="text-center text-sm font-medium">
        Love <span className="font-bold">ApeArmors</span>?{" "}
        <a
          href="github.com/avayyyyyyy/apearmor"
          className="inline-block underline"
        >
          Give it a star on GitHub!
        </a>
      </p>
    </div>
  );
}

export default Announcement;
