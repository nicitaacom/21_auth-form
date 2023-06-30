/* react */
import { Route, Routes } from "react-router-dom"
/* sections */
import { HomePage, RootPage } from "./pages"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
