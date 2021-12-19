import router from "next/router";
import React from "react";
import Moment from "react-moment";

const JobCard = (props) => {
  console.log(props);
  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="flex justify-between">
        <p
          className="cursor-pointer max-w-xl text-blue-600 text-lg hover:underline"
          onClick={() => router.push("/job/" + props.id)}
        >
          {props.title} Sales Executive (Up To $5000)
        </p>
        <p className="text-gray-400">
          Expire in <Moment format="DD/MM/YYYY" date={props.expiredDate} />
        </p>
      </div>
      {/* content */}

      <div
        className="line-clamp-5 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
      <div className="flex justify-between">
        <div>
          <p>
            {props.city}HCM • {props.jobForm}Fulltime
          </p>
          <p>
            ${props.minSalary} 1.500 – ${props.maxSalary}2.500
          </p>
        </div>

        <button
          className={`${
            props.isJobApplied
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-blue-500 hover:bg-blue-600"
          } h-10 px-10 text-white transition-colors duration-150 
          rounded-lg focus:shadow-outline`}
        >
          {props.isJobApplied ? "Applied" : "Apply now"}
        </button>
      </div>
    </div>
  );
};

export default function ListJobOrg({ jobs, styles }) {
  return (
    <div className={`${styles} flex flex-col`}>
      <p className="text-2xl font-semibold">
        We have {jobs.length} jobs for you
      </p>
      {jobs.map((item, index) => (
        <div key={index}>
          <JobCard {...item} />
          <hr className="my-4" />
        </div>
      ))}
    </div>
  );
}