import { AiFillGithub } from 'react-icons/ai'
import { BsGithub, BsGoogle } from 'react-icons/bs'

import { useState } from 'react'
import axios from 'axios'
import { Navigate } from "react-router-dom";

type Variant = 'LOGIN' | 'REGISTER' | 'FORGOT'


interface IRegister {
  email: string
  userName: string
  password: string
  passwordConfirm: string
}


export function Auth() {



  const [variant, setVariant] = useState<Variant>('LOGIN')

  const [checked, setChecked] = useState(true)
  const [error, setError] = useState<unknown>()

  //values for login
  const [loginValue, setLoginValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [loginData, setLoginData] = useState({
    login: '',
    password: ''
  })

  //values for register
  const [emailValue, setEmailValue] = useState('')
  const [userNameValue, setUserNameValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const [registerData, setRegisterData] = useState({
    email: '',
    userName: '',
    password: '',
    passwordConfirm: '',
  })






  /* Register */
  async function Register() {
    setRegisterData({
      email: emailValue, userName: userNameValue, password: passwordValue, passwordConfirm: confirmPasswordValue
    })
    console.info('auth data:' + JSON.stringify(loginData)),
      console.info('login value:' + loginValue),
      console.info('password value:' + passwordValue)

    try {
      //sending request with loginData to server
      const response = await axios.post<IRegister>('https://localhost:7123/api/Accounts/register', registerData)

      //response from server (isAuthorized true/false)

      //isAuthorized
      // const { token } = response.data
      console.log(response.data)
      // localStorage.setItem('token', token)
      //send verification email
      return <Navigate to="/home" replace={true} />

      //!isAuthorized

    } catch (AxiosError) {
      setError(AxiosError)
    }
  }







  /* Login */
  async function Login() {
    setLoginData({
      login: loginValue, password: passwordValue
    })
    console.info('auth data:' + JSON.stringify(loginData)),
      console.info('login value:' + loginValue),
      console.info('password value:' + passwordValue)

    try {
      //sending request with loginData to server
      const response = await axios.post('https://localhost:7123/api/Accounts/login', { loginData })

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






  /* Recover */
  async function Recover() {
    //recover in the feature
  }


  return (
    <div className='overflow-hidden border-[1px] border-gray-500 rounded-xl text-white'>
      <div className={`flex p-6 transition-all duration-500
        ${variant === 'FORGOT' && 'h-[14rem] translate-x-[100%]'}
  ${variant === 'LOGIN' && 'h-[24rem]'}
  ${variant === 'REGISTER' && 'h-[29rem] translate-x-[-100%]'}`}>
        {/* FORGOT */}
        <form onSubmit={e => e.preventDefault()} className={`w-full flex flex-col gap-4 top-0 right-full text-center p-4 absolute`}>
          <h1 className='text-3xl font-bold text-white'>Enter your email</h1>
          <input className="rounded px-4 py-2 text-gray-400" type="email" placeholder="Email"
            value={loginValue} onChange={e => setLoginValue(e.target.value)} />
          <button className="px-4 py-2 bg-gray-400 rounded-xl"
            onClick={() => { Recover() }}>Send email</button>
          <p>Remember your password? <a className={`text-emerald-400 cursor-pointer`} onClick={() => setVariant('LOGIN')}>
            {variant === 'FORGOT' ? 'Log in' : 'Forgot Password?'}
          </a></p>
        </form>
        {/* LOGIN */}
        <form className='w-full flex flex-col gap-4 top-0 text-center' onSubmit={e => e.preventDefault()}>
          <h1 className='text-3xl font-bold text-white'>Login</h1>
          <div className='flex flex-col gap-2'>
            <input className="rounded px-4 py-2 text-gray-400" type="email" placeholder="Email"
              value={loginValue} onChange={e => setLoginValue(e.target.value)} />
            <input className="rounded px-4 py-2 text-gray-400" type="password" placeholder="Passowrd"
              value={passwordValue} onChange={e => setPasswordValue(e.target.value)} />
            <div className='flex justify-between'>
              <div className="remember-me">
                <input className='mr-2' type="checkbox" id="check" checked={checked}
                  onChange={() => setChecked(state => !state)} />
                <label><span>Remember me</span></label>
              </div>
              <a className={`text-end text-emerald-500 cursor-pointer`} onClick={() => setVariant('FORGOT')}>
                {variant === 'FORGOT' ? 'Log in' : 'Forgot Password?'}
              </a>
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-400 rounded-xl"
            onClick={() => { Login() }}>Login</button>
          <div className='flex justify-center flex-wrap gap-2 overflow-x-hidden'>
            <button className="px-4 py-2 flex gap-x-4 bg-transparent border-[1px] border-[#aaaaaa] rounded-xl text-white"
              onClick={() => {/* BACKEND-Social-auth-with-google-provider*/ }}>
              Continue with Google <BsGoogle size={24} />
            </button>
            <button className="px-4 py-2 flex gap-x-4 bg-transparent border-[1px] border-[#aaaaaa] rounded-xl text-white"
              onClick={() => {/* BACKEND-Social-auth-with-github-provider */ }}>
              Continue with Google <BsGithub size={24} />
            </button>
          </div>
          <p className='text-center'>Don't have an account? <a className='text-emerald-400 cursor-pointer'
            onClick={() => setVariant('REGISTER')}>Register</a></p>
        </form>
        {/* REGISTER */}
        <form className='w-full flex flex-col gap-4 top-0 left-full p-4 absolute text-center' onSubmit={e => e.preventDefault()}>
          <h1 className='text-3xl font-bold text-white'>Register</h1>
          <div className='flex flex-col gap-2'>
            <input className="rounded px-4 py-2 text-gray-400" type="text" placeholder="UserName"
              value={userNameValue} onChange={e => setUserNameValue(e.target.value)} />
            <input className="rounded px-4 py-2 text-gray-400" type="email" placeholder="Email"
              value={emailValue} onChange={e => setEmailValue(e.target.value)} />
            <input className="rounded px-4 py-2 text-gray-400" type="password" placeholder="Passowrd"
              value={passwordValue} onChange={e => setPasswordValue(e.target.value)} />
            <input className="rounded px-4 py-2 text-gray-400" type="password" placeholder="Confirm password"
              value={confirmPasswordValue} onChange={e => setConfirmPasswordValue(e.target.value)} />
            <div className='flex justify-between'>
              <div className="remember-me">
                <input type="checkbox" id="check" checked={checked}
                  onChange={() => setChecked(state => !state)} />
                <label><span>Remember me</span></label>
              </div>
              <a className={`text-end mr-[2px] text-emerald-400 cursor-pointer`} onClick={() => setVariant('FORGOT')}>
                {variant === 'FORGOT' ? 'Log in' : 'Forgot Password?'}
              </a>
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-400 rounded-xl"
            onClick={() => { Register() }}>Register</button>
          <div className='flex justify-center flex-wrap gap-2 overflow-x-hidden'>
            <button className="px-4 py-2 flex gap-x-4 bg-transparent border-[1px] border-[#aaaaaa] rounded-xl text-white"
              onClick={() => {/* BACKEND-Social-auth-with-google-provider*/ }}>
              Continue with Google <BsGoogle size={24} />
            </button>
            <button className="px-4 py-2 flex gap-x-4 bg-transparent border-[1px] border-[#aaaaaa] rounded-xl text-white"
              onClick={() => {/* BACKEND-Social-auth-with-github-provider */ }}>
              Continue with Google <BsGithub size={24} />
            </button>
          </div>
          <p className='text-center'>Already have an account? <a className='text-emerald-400 cursor-pointer'
            onClick={() => setVariant('LOGIN')}>Login</a></p>
        </form>
      </div>
    </div>
  )
}