import Signup from "@/components/Auth/Signup";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const role = params?.role;

  if (!role || (role !== "student" && role !== "instructor")) {
    redirect("/");
  }

  return <Signup role={role} />;
}