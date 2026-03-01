import InstructorDashboard from "@/components/Instructor/InstructorDashboard";
import { instructor } from "@/components/variables";

export default function page() {
  return (
    <InstructorDashboard instructor={instructor} />
  )
}
