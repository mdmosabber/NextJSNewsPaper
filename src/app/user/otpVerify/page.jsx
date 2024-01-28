import React from 'react'

import PlainLayout from '@/components/master/PlainLayout'
import PinVerifyForm from '@/components/user/PinVerifyForm'
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
    <PinVerifyForm />
   </PlainLayout>
  )
}

export default page