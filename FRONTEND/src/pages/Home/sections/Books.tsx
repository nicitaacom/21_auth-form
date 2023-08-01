import { useBooks } from "../../../hooks/getBooks"
import { Book } from '../../../components'
import { useNavigate } from "react-router-dom"



export function Books() {

  const navigate = useNavigate()
  const { loading, error, books } = useBooks()

  return (
    <>
      {/* Books output */}
      <div className="flex flex-col gap-y-4 px-8 py-4 border-[1px] border-[#aaaaaa] rounded-xl" >
        <h1 className="text-2xl font-bold text-center">Books</h1>
        {loading && <p>Loading...</p>}
        {error && <p className='text-center text-red-600'>{error}</p>}
        {books.map(book => <Book key={book.id} {...book} />)}
        <button className="px-4 py-2 bg-gray-400 rounded-xl"
          onClick={() => { localStorage.removeItem('token'); navigate('/', { replace: true }) }}>Logout</button>
      </div>
    </>
  )
}