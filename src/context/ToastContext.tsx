"use client";

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <Toaster
      containerStyle={{
        zIndex: 100000,
      }}
    />
  );
};

export default ToasterContext;
