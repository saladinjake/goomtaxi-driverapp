import React, { useState } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

const Login = props => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = ev => {
    ev.preventDefault()

    axios.post(`${BASE_URL}/login`, {email, password})
    .then( res => {
      if(res.data.success){
        sessionStorage.setItem('token', JSON.stringify(res.data.token))
        sessionStorage.setItem('user', JSON.stringify(res.data.user))
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        props.history.push('/maps')
      }
    })
    .catch(console.error)
  }

  return(
    <div  className="login-wrapper">
      <h2>GOOM Logistics</h2>
      <div>
        <h3>Log into your account</h3>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
          <button>Login</button>
        </form>
      </div>
      
     
  
    </div>
  )
}

export default Login
