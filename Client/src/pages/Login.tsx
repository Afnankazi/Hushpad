import React from 'react'
import LoginForm from '../Components/login-form'
import Animate from '../Components/Animate'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-4">
        <Animate time={1}>
           <LoginForm />
        </Animate>

      </div>
    </div>
  )
}

export default Login
