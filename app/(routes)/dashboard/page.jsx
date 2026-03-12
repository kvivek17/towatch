import React from 'react'
import AddRoom from './components/AddRoom'
import JoinRoom from './components/JoinRoom'

const Dashbaord = () => {
  return (
    <>
    <section className='grid grid-cols-1  md:grid-cols-2 min-h-[100vh]'>
        <div className='bg-blue-300 items-center flex justify-center flex-col gap-10'>
            <h2 className='text-4xl font-bold text-white w-[50%]'>
                You can create a room  with below button
            </h2>
            <AddRoom/>
            

             </div>

        <div className='bg-white text-blue-400 items-center flex  flex-col gap-22'>
            <h2 className='text-4xl font-bold text-blue-400 mt-55 w-[50%]'>
                Here,You can Join the room</h2>
                <JoinRoom/>
        </div>

    </section>
   
    </>
  )
}

export default Dashbaord