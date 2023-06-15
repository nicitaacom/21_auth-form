import { useEffect,useState } from "react"
import axios, { AxiosError } from "axios"
import { json } from "react-router"

export function useBooks() {
  const [books,setBooks] = useState<any[]>([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')


  async function fetchBooks(){
    try {
      setLoading(true)
      const response = await fetch('https://localhost:7123/api/BookStore/')
      const data = await response.json()
      setBooks(data.books)
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