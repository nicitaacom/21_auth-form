/* react */
import { Route, Routes } from "react-router-dom"
/* sections */
import { BooksPage, HomePage, RootPage } from "./pages"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
      </Routes>
    </>
  )
}

export default App
