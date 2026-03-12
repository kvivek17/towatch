import { SignIn } from '@clerk/nextjs'


export default function Page() {

  return (
    <div className='flex justify-center items-center m-8 p-6'>
      <SignIn />
    </div>
  )
}
