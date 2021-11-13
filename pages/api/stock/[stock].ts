// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import yahooFinance from "yahoo-finance2"

type Data = {
  companyName: string | null
  currencySymbol?: string
  symbol: string
  marketState: string
  postMarket: {
    time?: Date
    price?: number
    change?: number
    changePercent?: number
  }
  regularMarket: {
    time?: Date
    price?: number
    change?: number
    changePercent?: number
    openPrice?: number
    previousClose?: number
    dayHigh?: number
    dayLow?: number
    volume?: number
  }
}

type Error = {
  code: 400
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  try {
    const { stock } = req.query
    const { price } = await yahooFinance.quoteSummary(String(stock))

    if (!price) throw new Error("Stock not found")

    res.status(200).send({
      companyName: price.shortName,
      currencySymbol: price.currencySymbol,
      symbol: price.symbol,
      marketState: price.marketState,
      postMarket: {
        time: price.postMarketTime,
        price: price.postMarketPrice,
        change: price.postMarketChange,
        changePercent: price.postMarketChangePercent,
      },
      regularMarket: {
        time: price.regularMarketTime,
        price: price.regularMarketPrice,
        change: price.regularMarketChange,
        changePercent: price.regularMarketChangePercent,
        openPrice: price.regularMarketOpen,
        previousClose: price.regularMarketPreviousClose,
        dayHigh: price.regularMarketDayHigh,
        dayLow: price.regularMarketDayLow,
        volume: price.regularMarketVolume,
      },
    })
    // regular market 정규장 post market 에프터장 (폐장 후) pre market 프리장 (개장 전)
  } catch (e) {
    console.log(String(e))
    res.status(400).send({
      code: 400,
      message: String(e),
    })
  }
}
