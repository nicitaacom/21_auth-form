import { Auth } from './Home/sections'

export function RootPage() {
  return (
    <div className="relative min-h-[100vh] max-w-full flex flex-col gap-y-16 justify-center items-center overflow-hidden">
      <Auth />
    </div>
  )
}