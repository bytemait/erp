"use client";

import FacultyPage from "./FacultyPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { setUser } from "@/store/slices/userSlice";
import axios from "axios";

export default function Faculty() {

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
    <main className="flex-1 overflow-y-auto p-4">
      <h1 className="text-4xl font-bold text-center text-primary pb-10">
        Faculty Dashboard
      </h1>
      <FacultyPage />
    </main>
  );
}