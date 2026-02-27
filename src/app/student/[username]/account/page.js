import StudentAccount from '@/components/Student/StudentAccount'
import { student } from '@/components/variables'
import React from 'react'

export default function page() {
  return (
    <StudentAccount student={student} />
  )
}
