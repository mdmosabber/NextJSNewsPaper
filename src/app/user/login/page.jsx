import PlainLayout from '@/components/master/PlainLayout'
import LoginForm from '@/components/user/LoginForm'
import React from 'react'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const page = () => {

  const cookieStore = cookies()
  const token = cookieStore.get('token')
  if(typeof token!=='undefined'){
      redirect('/')
  }

  return (
   <PlainLayout>
      <LoginForm/>
   </PlainLayout>
  )
}

export default page