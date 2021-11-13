import type { NextPage } from "next"

const Home: NextPage = () => {
  return (
    <div>
      <p className="text-xl noto-bold">Add your favorite easily</p>
      <div className="border-t border-black mx-4 pt-2 mt-2 px-2">
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="rounded border border-gray shadow p-2 px-3 bg-gray-100">
            <p className="text-base font-noto">Intel (Intc)</p>
          </div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
        </div>
      </div>
    </div>
  )
}

export default Home
