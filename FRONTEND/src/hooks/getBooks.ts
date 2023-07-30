import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import api from "../api/api"

export function useBooks() {
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function fetchBooks() {
    try {
      setLoading(true)
      const response = await api.get("/BookStore/")
      setBooks(response.data.books)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])
  return { books, error, loading }
}
