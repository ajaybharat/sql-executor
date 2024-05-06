import React, { memo } from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      ariaLabel="loading-indicator"
      height={50}
      width={50}
      strokeWidth={5}
      color="#0ea5e9"
      secondaryColor="#d1d5db"
    />
  );
};

export default memo(Loader);
