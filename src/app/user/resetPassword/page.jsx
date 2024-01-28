import React from 'react'
import PlainLayout from '@/components/master/PlainLayout'
import {cookies} from "next/headers";
import { redirect } from 'next/navigation'
import SetPasswordForm from '@/components/user/SetPasswordForm';


const page = () => {

  const cookieStore = cookies()
  const token = cookieStore.get('token')
  if(typeof token!=='undefined'){
      redirect('/')
  }

  return (
   <PlainLayout>
    <SetPasswordForm />
   </PlainLayout>
  )
}

export default page