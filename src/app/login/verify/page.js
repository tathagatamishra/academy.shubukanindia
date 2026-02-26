import { redirect } from "next/navigation";
import OTPVerification from "@/components/Auth/OTPVerification";

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const role = params?.role;
  const email = params?.email;

  if (!role || !email) {
    redirect("/");
  }

  return <OTPVerification email={email} role={role} />;
}