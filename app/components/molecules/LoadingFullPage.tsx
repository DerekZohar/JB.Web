import React from "react";
import Loading from "../atoms/Loading";

export default function LoadingFullPage() {
  return (
    <div>
      <div className="fixed w-screen h-screen inset-0 z-40 filter bg-white"></div>
      <div className="fixed top-1/3 left-1/2 z-50">
        <Loading />
      </div>
    </div>
  );
}
