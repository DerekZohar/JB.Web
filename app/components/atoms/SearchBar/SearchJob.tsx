import { XIcon } from "@heroicons/react/solid";
import Router from "next/router";
import React, { useState } from "react";

export default function SearchJob({ styles, handleSearch }) {
  //get keyword and call handleSearch function
  const [keyword, setKeyword] = useState("");
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = (e) => {
    // e.preventDefault();
    // handleSearch(keyword);
    Router.push(`/job?keyword=${keyword}`);
  };

  const handleClearInput = () => {
    setKeyword("");
  };
  return (
    <div
      className={`${styles} h-16 flex gap-2 items-center rounded-full border-2 border-gray-100`}
    >
      <div className="lg:w-5/6 w-full flex">
        <div className="w-full flex gap-2 dark:text-white dark:bg-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="focus:outline-none w-full dark:text-white dark:bg-gray-900"
            type="text"
            placeholder="Job Type or Keyword"
            value={keyword}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
          />
          {keyword.length > 0 && (
            <XIcon
              className="h-6 w-6 text-gray-400"
              onClick={handleClearInput}
            />
          )}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        type="button"
        className=" py-3 px-6 w-32 hidden lg:block bg-blue-600 hover:bg-blue-700 
        focus:ring-blue-500 focus:ring-offset-blue-200 text-white  ease-in-transition
        text-center text-base font-semibold shadow-md focus:outline-none rounded-full"
      >
        Search
      </button>
    </div>
  );
}
