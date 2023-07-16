/* react */
import { Route, Routes } from "react-router-dom"
/* sections */
import { BooksPage, HomePage, RootPage } from "./pages"

function App() {

  return (
    <div className="font-primary text-secondary">
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
      </Routes>
    </div>
  )
}

export default App
