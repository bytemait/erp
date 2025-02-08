import LoginPage from "@/components/LoginPage";

export default function Home() {
  const userRoles = ["accounts", "admin", "support"];

  return (
    <>
      <LoginPage roles = {userRoles}/>
    </>
  );
}