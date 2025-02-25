"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import StudentPage from "./StudentPage";
import { useEffect } from "react";
import axios from "axios";
import { setUser } from "@/store/slices/userSlice";

export default function Student() {

  const dispatch = useAppDispatch();
  const reduxUser = useAppSelector((state) => state.user);

  useEffect(() => {
    if (reduxUser.id) return;
    const getUserAfterLogin = async (): Promise<null> => {
      const user = await axios.get("/api/public/me");
      if (!user) return null;
      dispatch(setUser(user.data.data));
      return null;
    };
    getUserAfterLogin();
  }, [dispatch, reduxUser.id]);

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4" >
        <h1 className="text-6xl text-center text-primary pb-20" >
          Student Dashboard
        </h1>
        <StudentPage />
      </main>
    </>
  );
}