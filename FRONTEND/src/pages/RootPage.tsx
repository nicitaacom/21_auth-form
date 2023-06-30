import { Books, Login } from './Home/sections'

export function RootPage() {
  return (
    <div className="min-h-[100vh] flex flex-col gap-y-16 justify-center items-center">
      <Login />
      <Books />
    </div>
  )
}