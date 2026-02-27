import StudentDashboard from '@/components/Student/StudentDashboard'
import { student } from '@/components/variables'

export default function page() {
  return (
    <StudentDashboard student={student} />
  )
}
