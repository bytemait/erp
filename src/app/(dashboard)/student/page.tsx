"use client";

import StudentPage from "./StudentPage";

export default function Student() {
  return (
    <>
      <main className="flex-1 overflow-y-auto p-4" >
        <h1 className="text-6xl text-center text-primary pb-20" >
          Welcome to student
        </h1>
        <StudentPage />
      </main>
    </>
  );
}