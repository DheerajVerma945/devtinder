import React, { useEffect } from 'react'
import { requestsThunk } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state=>state.auth);

  if(!isLoggedIn){
    return null;
  }
  return (
    <div className='flex bg-gray-800 text-white items-center justify-center h-screen'>
      Home Screen
    </div>
  )
}

export default Home
