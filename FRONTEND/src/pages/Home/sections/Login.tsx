import { AiFillGithub } from 'react-icons/ai'
import { BsGoogle } from 'react-icons/bs'

import { useState } from 'react'
import axios from 'axios'
import { Navigate } from "react-router-dom";

export function Login() {

  const [loginValue, setLoginValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [error, setError] = useState<unknown>()



  const [authData, setAuthData] = useState({
    login: '',
    password: ''
  })

  async function Login() {
    setAuthData({ login: loginValue, password: passwordValue })
    console.info('auth data:' + JSON.stringify(authData)),
      console.info('login value:' + loginValue),
      console.info('password value:' + passwordValue)

    try {
      //sending request with authData to server
      const response = await axios.post('https://localhost:7123/api/Accounts/login', { authData })

      //response from server (isAuthorized true/false)

      //isAuthorized
      const { token } = response.data
      console.log(response.data)
      localStorage.setItem('token', token)
      return <Navigate to="/home" replace={true} />

      //!isAuthorized

    } catch (AxiosError) {
      setError(AxiosError)
    }
  }


  return (
    <>
      <div className="flex flex-col gap-y-4 px-8 py-4 border-[1px] border-[#aaaaaa] rounded-xl" >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input className="rounded px-4 py-2" type="email" placeholder="Email"
          value={loginValue} onChange={e => setLoginValue(e.target.value)} />
        <input className="rounded px-4 py-2" type="password" placeholder="Password"
          value={passwordValue} onChange={e => setPasswordValue(e.target.value)} />
        <button className="px-4 py-2 bg-gray-400 rounded-xl"
          onClick={() => { Login() }}>Login</button>
        <button className="px-4 py-2 flex gap-x-4 bg-transparent border-[1px] border-[#aaaaaa] rounded-xl text-white"
          onClick={() => {/* BACKEND - login with google */ }}>
          Continue with Google <BsGoogle size={24} />
        </button>
        <button className="px-4 py-2 flex gap-x-4 bg-transparent border-[1px] border-[#aaaaaa] rounded-xl text-white"
          onClick={() => {/* BACKEND - login with github */ }}>
          Continur with Github <AiFillGithub size={24} />
        </button>
      </div >
    </>
  )
}