import { blogAPI } from "app/api/modules/blogAPI";
import router from "next/router";
import React, { Fragment, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteBlogButton from "./Button/DeleteBlogButton";
import LikeBlogButton from "./Button/LikeButton";

export default function Blog(props) {
  const handleRedirect = async () => router.push("blog/" + props.id);
  const user = useSelector((state: any) => state.user);

  const onShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(
        window.location.origin + "/blog/" + props.id
      );

      toast("Link copied to clipboard");
    }
  };
  console.log(props.imageUrl);
  return (
    <div className="flex justify-between flex-col max-w-lg p-6 space-y-4 overflow-hidden bg-gray-50 rounded-lg shadow-md text-gray-800">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex space-x-4">
            <img
              alt=""
              src={props.author.avatarUrl || "/avatar/avatar.png"}
              className="object-cover w-12 h-12 rounded-full shadow"
            />
            <div className="flex flex-col space-y-1">
              <a href="#" className="text-sm font-semibold">
                {props.author.name}
              </a>
              <span className="text-xs text-gray-600">
                <Moment fromNow date={props.createdDate} />
              </span>
            </div>
          </div>
        </div>
        {props.author.id === user.user.id && (
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 cursor-pointer text-gray-400 hover:text-black"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => router.push("/blog/" + props.id + "/edit")}
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <DeleteBlogButton
              blogId={props.id}
              refreshData={props.refreshData}
            />
          </div>
        )}
      </div>
      <p
      // target="_blank"
      // rel="noreferrer"
      // href={"http://localhost:3000/blog/" + props.id}
      >
        <img
          onClick={handleRedirect}
          src={props.imageUrl || "https://via.placeholder.com/"}
          alt=""
          className="object-cover w-full mt-4 h-60 sm:h-80 bg-gray-500 rounded-md cursor-pointer"
        />
      </p>
      <a
        target="_blank"
        rel="noreferrer"
        className="mb-1 text-xl font-semibold cursor-pointer hover:text-blue-600 ease-in-transition"
        href={"http://" + window.location.host + "/blog/" + props.id}
      >
        {props.title}
      </a>
      {/* <h2
          className="mb-1 text-xl font-semibold cursor-pointer hover:text-blue-600 ease-in-transition"
          onClick={handleRedirect}
        >
          {props.title}
        </h2> */}
      <p className="text-sm text-gray-600 line-clamp-3">{props.description}</p>
      <div className="flex flex-wrap justify-between">
        <div className="space-x-2">
          <button
            aria-label="Share this post"
            type="button"
            className="p-2 text-center"
            onClick={onShare}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4 h-4 fillCurrent text-indigo-600"
            >
              <path d="M404,344a75.9,75.9,0,0,0-60.208,29.7L179.869,280.664a75.693,75.693,0,0,0,0-49.328L343.792,138.3a75.937,75.937,0,1,0-13.776-28.976L163.3,203.946a76,76,0,1,0,0,104.108l166.717,94.623A75.991,75.991,0,1,0,404,344Zm0-296a44,44,0,1,1-44,44A44.049,44.049,0,0,1,404,48ZM108,300a44,44,0,1,1,44-44A44.049,44.049,0,0,1,108,300ZM404,464a44,44,0,1,1,44-44A44.049,44.049,0,0,1,404,464Z"></path>
            </svg>
          </button>
        </div>
        <div className="flex space-x-2 text-sm ">
          <button type="button" className="flex items-center p-1 space-x-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              aria-label="Number of comments"
              className="w-4 h-4 fillCurrent text-indigo-600"
            >
              <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
              <path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"></path>
            </svg>
            <span>{props.commentCount}</span>
          </button>
          <LikeBlogButton
            id={props.id}
            type="blog"
            isInterested={props.isInterested}
            interestCount={props.interestCount}
          />
        </div>
      </div>
    </div>
  );
}
