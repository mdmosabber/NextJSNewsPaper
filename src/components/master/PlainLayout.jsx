import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppNavbar from './AppNavbar';
import Footer from './Footer';
import {cookies} from "next/headers";

async function getData() {
  try {
    const categoryResponse = await fetch(`${process.env.HOST}/api/category`);
    const categoryData = await categoryResponse.json();

    const socialResponse = await fetch(`${process.env.HOST}/api/social`);
    const socialData = await socialResponse.json();

    return { socials: socialData.data, categories: categoryData.data };
    
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { socials: [], categories: [] }; 
  }
}

const PlainLayout = async (props) => {
  const data = await getData(); 

  const cookieStore = cookies()
  const token = cookieStore.get('token')
  let isLogin = false
  isLogin = typeof token !== "undefined";

  return (
    <>
      <AppNavbar isLogin={isLogin} data={data}/>
      {props.children}
      <Toaster position="bottom-center" />
      <Footer data={data} />
    </>
  );
};

export default PlainLayout;
