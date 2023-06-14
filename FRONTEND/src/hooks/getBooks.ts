import { useEffect,useState } from "react"
import axios, { AxiosError } from "axios"

export function useBooks() {
  const [books,setBooks] = useState<any[]>([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')


  async function fetchBooks(){
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<any[]>('https://localhost:7123/api/BookStore/')
      setBooks(response.data.books)
      console.log('response.data = ' + response.data)
      console.log('response.data.books = ' + response.data.books)
      setLoading(false)
    } catch(e:unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(()=> {
    fetchBooks()
  },[])
  return { books, error, loading}
}