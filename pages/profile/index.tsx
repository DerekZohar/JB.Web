import { XIcon } from "@heroicons/react/solid";
import UserAPI from "app/api/modules/userAPI";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import ProfileLayout from "app/components/layouts/ProfileLayout";
import LoadingFullPage from "app/components/molecules/LoadingFullPage";

export default function Profile() {
  const [profile, setProfile] = useState<any>({
    awards: [],
    certifications: [],
    skills: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await UserAPI.getProfile();
      if (res.status === 200) {
        setProfile(res.data.data.profiles[0]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading ? <LoadingFullPage /> : <ProfileLayout profile={profile} />}
    </div>
  );
}
