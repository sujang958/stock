import React, { FC, ReactNode } from "react"

const Layout: FC<ReactNode> = ({ children }) => {
  return (
    <>
      <header className="flex flex-row p-2 px-10 border-b border-black rounded">
        <div className="flex-1 text-base">☰</div>
        <div className="flex-1 text-center noto-black">
          <p className="text-base">{new Date().toDateString()}</p>
        </div>
        <div className="flex-1 text-right text-base">+</div>
      </header>
      <main className="px-20 md:px-24 pt-8 bg-gray-100 min-h-screen pb-20">
        {children}
      </main>
    </>
  )
}

export default Layout
