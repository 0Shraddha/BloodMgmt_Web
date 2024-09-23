import React from 'react'
import Input from './Input'
import './Input.scss'

const Login = () => {
  return (
   <>
        <div className="login-container">
            <form action="">
                <Input label="Username" type="text" placeholder="Enter your username "/>
                <Input label="Password" type="password" placeholder="Enter your password "/>
                <div>
                    <button className='btn' id="btnSubmit">Login</button>
                </div>
            </form>
        </div>
   </>
  )
}

export default Login