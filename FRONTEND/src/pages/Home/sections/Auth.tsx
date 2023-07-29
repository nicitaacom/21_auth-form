import { BsGithub, BsGoogle } from 'react-icons/bs'
import { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";
import { ILogin, IRegister } from '../../../interfaces/IAuth';

type Variant = 'LOGIN' | 'REGISTER' | 'FORGOT'


export function Auth() {



  const [variant, setVariant] = useState<Variant>('LOGIN')

  const [checked, setChecked] = useState(true)
  const [error, setError] = useState<unknown>()

  //values for login
  const [loginValue, setLoginValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  //values for register
  const [emailValue, setEmailValue] = useState('')
  const [userNameValue, setUserNameValue] = useState('')
  const [passwordRegValue, setPasswordRegValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')


  const navigate = useNavigate()

  /* Register */

  async function register() {

    const setAuthorizationHeader = (token: string) => {
      if (token) {
        // Set the authorization header with the bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        // Remove the authorization header if no token is provided
        delete axios.defaults.headers.common['Authorization'];
      }
    }

    const registerData = {
      email: emailValue,
      userName: userNameValue,
      password: passwordRegValue,
      passwordConfirm: confirmPasswordValue
    };

    try {
      const response = await axios.post<IRegister>(
        'https://localhost:7123/api/accounts/register',
        registerData
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token)

        // Set the authorization header
        setAuthorizationHeader(token);

        // Navigate to the desired route
        navigate('/books', { replace: true })
      }


    } catch (AxiosError) {
      setError(AxiosError);
    }
  }



  /* Login */
  async function login() {

    const setAuthorizationHeader = (token: string) => {
      if (token) {
        // Set the authorization header with the bearer token
        axios.defaults.headers.common['Authorization'] = `Authorization ${token}`;
      } else {
        // Remove the authorization header if no token is provided
        delete axios.defaults.headers.common['Authorization'];
      }
    }

    const loginData = {
      email: loginValue,
      password: passwordValue,
    };

    try {
      //sending request with loginData to server
      const response = await axios.post<ILogin>('https://localhost:7123/api/accounts/login', loginData)

      //response from server isAuthorized true
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token)

        // Set the authorization header
        setAuthorizationHeader(token);

        // Navigate to the desired route
        navigate('/books', { replace: true })
      }

      //response from server isAuthorized true
    } catch (AxiosError) {
      setError(AxiosError)
    }
  }






  /* Recover */
  async function recover() {
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
            onClick={() => { recover() }}>Send email</button>
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
            onClick={() => { login() }}>Login</button>
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
              value={passwordRegValue} onChange={e => setPasswordRegValue(e.target.value)} />
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
            onClick={() => { register() }}>Register</button>
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