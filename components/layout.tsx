import React, { FC, ReactNode } from "react"

const Layout: FC<ReactNode> = ({ children }) => {
  return (
    <>
      <header className="flex flex-row p-2 px-10 border-b border-black rounded">
        <div className="flex-1">☰</div>
        <div className="flex-1 text-right">+</div>
      </header>
      <main className="px-24 pt-14 bg-gray-200 min-h-screen">{children}</main>
    </>
  )
}

export default Layout
