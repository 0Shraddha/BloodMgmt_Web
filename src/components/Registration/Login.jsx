import React from 'react'
import Input from './Input'
import './Input.scss'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
   <>
        <div className="login-container align-items-center">
            <h2 class="py-3 form-heading text-center">Login</h2>

            <form className='py-4 px-5' action="" width="300px">
                <Input label="Username" type="text" placeholder="Enter your username "/>
                <Input label="Password" type="password" placeholder="Enter your password "/>
                <div>
                    <Link to="/" className='btn' id="btnSubmit">Login</Link>
                </div>
            </form>
                    
            <p className="text-muted text-center">Don't have an account? <Link to="/signup" className='btn btn-sm btn-outline-dark'>Sign up</Link></p>
        </div>
   </>
  )
}

export default Login