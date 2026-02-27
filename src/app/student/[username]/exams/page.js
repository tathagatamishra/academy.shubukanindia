import StudentExam from '@/components/Student/StudentExam'
import { student } from '@/components/variables'
import React from 'react'

export default function page() {
  return (
    <StudentExam student={student} />
  )
}
