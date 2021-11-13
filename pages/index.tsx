import type { NextPage } from "next"
import { useEffect, useState } from "react"
import StockItem from "../components/stockItem"

const Home: NextPage = () => {
  const [dateString, setDateString] = useState<string>(
    new Date().toTimeString().split(" ")[0]
  )

  useEffect(() => {
    setInterval(() => {
      const date = new Date()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()
      setDateString(
        `${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`
      )
    }, 1000)
  }, [])

  return (
    <div>
      <p className="text-3xl noto-black">{dateString}</p>
      <div className="border-t border-black mx-4 pt-2 mt-2 px-2">
        <p className="text-lg -ml-2 -mt-0.5">Stocks</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          <StockItem symbol="INTC" />
          <StockItem symbol="AMZN" />
          <StockItem symbol="AAPL" />
          <StockItem symbol="AMD" />
          <StockItem symbol="NVDA" />
          <StockItem symbol="MSFT" />
        </div>
      </div>
    </div>
  )
}

export default Home
