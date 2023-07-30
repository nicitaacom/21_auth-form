import { useBooks } from "../../../hooks/getBooks"
import { Book } from '../../../components'



export function Books() {

  const { loading, error, books } = useBooks()

  return (
    <>
      {/* Books output */}
      <div className="flex flex-col gap-y-4 px-8 py-4 border-[1px] border-[#aaaaaa] rounded-xl" >
        <h1 className="text-2xl font-bold text-center">Books</h1>
        {loading && <p>Loading...</p>}
        {error && <p className='text-center text-red-600'>{error}</p>}
        {books.map(book => <Book key={book.id} {...book} />)}
      </div>
    </>
  )
}