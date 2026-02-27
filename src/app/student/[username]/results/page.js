import StudentResult from '@/components/Student/StudentResult'
import { student } from '@/components/variables'
import React from 'react'

export default function page() {
  return (
    <StudentResult student={student} />
  )
}
