import { AiFillGithub } from 'react-icons/ai'
import { BsGoogle } from 'react-icons/bs'

import { useBooks } from '../../hooks/getBooks'
import { Book } from '../../components'
import { useState } from 'react'

export function HomePage () {

  const {loading,error,books} = useBooks()

  

  console.log(books.map(book => {'book id = ' + book.id}))
  console.log(books.map(book => {'book title = ' + book.title}))

  const [loginValue,setLoginValue] = useState('')
  const [passwordValue,setPasswordValue] = useState('')

  const [authData,setAuthData] = useState({
    login:'',
    password:''
  })

return (
<div className="min-h-[100vh] flex flex-col gap-y-16 justify-center items-center">

  {/* Auth form */}
  <div className="flex flex-col gap-y-4 px-8 py-4 border-[1px] border-[#aaaaaa] rounded-xl">
    <h1 className="text-2xl font-bold text-center">Login</h1>
    <input className="rounded px-4 py-2" type="email" placeholder="Email" 
    value={loginValue} onChange={e => setLoginValue(e.target.value)}/>
    <input className="rounded px-4 py-2" type="password" placeholder="Password"
    value={passwordValue} onChange={e => setPasswordValue(e.target.value)}/>
    <button className="px-4 py-2 bg-gray-400 rounded-xl"
    onClick={() => {
      setAuthData({login:loginValue,password:passwordValue})
      console.info('auth data:' + JSON.stringify(authData)),
      console.info('login value:' + loginValue),
      console.info('password value:' + passwordValue)
    }}>Login</button>
    <button className="px-4 py-2 flex gap-x-4 bg-transparent border-[1px] border-[#aaaaaa] rounded-xl text-white"
    onClick={() => {/* BACKEND - login with google */}}>
      Continue with Google <BsGoogle size={24}/>
    </button>
    <button className="px-4 py-2 flex gap-x-4 bg-transparent border-[1px] border-[#aaaaaa] rounded-xl text-white"
    onClick={() => {/* BACKEND - login with github */}}>
      Continur with Github <AiFillGithub size={24}/>
    </button>
  </div>

  {/* Books output */}
  <div className="flex flex-col gap-y-4 px-8 py-4 border-[1px] border-[#aaaaaa] rounded-xl">
    <h1 className="text-2xl font-bold text-center">Books</h1>
    {loading && <p>Loading...</p>}
    { error && <p className='text-center text-red-600'>{error}</p>}
    {books.books.map(book => <Book book={book} key={book.id}/>)}
  </div>

</div>
)
}