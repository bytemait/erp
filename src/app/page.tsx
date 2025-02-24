import LoginPage from "@/components/LoginPage";

export default function Home() {
  const userRoles = ["Staff", "Admin"];

  return (
    <>
      <LoginPage roles={userRoles} />
    </>
  );
}