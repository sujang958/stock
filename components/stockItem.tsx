import axios from "axios"
import { FC, useCallback, useEffect, useState } from "react"

interface StockData {
  companyName: string
  currencySymbol: string
  symbol: string
  marketState: string
  postMarket: {
    time: string
    price: number
    change: number
    changePercent: number
  }
  regularMarket: {
    time: string
    price: number
    change: number
    changePercent: number
    openPrice: number
    previousClose: number
    dayHigh: number
    dayLow: number
    volume: number
  }
}

const StockItem: FC<{ symbol: string }> = ({ symbol }) => {
  const [stock, setStock] = useState<StockData | {}>({})
  const getStockData = useCallback(async () => {
    const res = await axios.get(`/api/stock/${symbol}`)
    if (res.status > 200) getStockData()
    setStock(res.data)
  }, [])

  useEffect(() => {
    getStockData().then(() => setInterval(getStockData, 5000))
  }, [])

  if (!("marketState" in stock))
    return (
      <div className="rounded border border-gray shadow-lg p-2 pl-3 bg-gray-100">
        <p className="text-base noto-black">----</p>
        <div className="px-1">
          <div className="flex flex-row">
            <p className="text-xl">--</p>
            <p className="ml-1 mt-1.5 text-sm">-- %</p>
          </div>
          <div className="px-1 pt-0.5 pb-1">
            <p className="text-xs">-----</p>
            <p className="text-xs">-----</p>
            <p className="text-xs">-----</p>
            <p className="text-xs">-----</p>
            <p className="text-xs">-----</p>
          </div>
        </div>
      </div>
    )

  return (
    <div className="rounded border border-gray shadow-lg p-2 pl-3 bg-gray-100">
      <p className="text-base noto-black">
        {stock.companyName} ({stock.symbol})
      </p>
      <div className="px-1">
        <div
          className={`flex flex-row ${
            stock.regularMarket.changePercent < 0
              ? `text-blue-400`
              : `text-red-600`
          }`}
        >
          <p className="text-xl">{`${stock.currencySymbol} ${stock.regularMarket.price}`}</p>
          <p className="ml-1 mt-1 text-sm">
            {stock.regularMarket.changePercent.toFixed(4)} %
          </p>
        </div>
        <div className="px-1 pt-0.5 pb-1">
          <p className="text-xs">
            Starting cost: {stock.regularMarket.openPrice}
          </p>
          <p className="text-xs">
            Previous ended cost: {stock.regularMarket.previousClose}
          </p>
          <p className="text-xs">Volume: {stock.regularMarket.volume}</p>
          <p className="text-xs">
            Day highest limit: {stock.regularMarket.dayHigh}
          </p>
          <p className="text-xs">
            Day lowest limit: {stock.regularMarket.dayLow}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StockItem
