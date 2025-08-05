import React from 'react'
import LoginForm from '../Components/login-form'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-4">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
