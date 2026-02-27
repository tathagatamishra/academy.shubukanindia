import StudentKata from '@/components/Student/StudentKata'
import { student } from '@/components/variables'
import React from 'react'

export default function page() {
  return (
    <StudentKata student={student} />
  )
}
