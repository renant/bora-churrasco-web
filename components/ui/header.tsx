import Link from 'next/link'
import BovinaIcon from '../icons/bovina-icon'

export function Header() {
  return (
    <div className="absolute z-20  min-w-full bg-red-800 shadow-md ">
      <div className="container mx-auto mt-2">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Link
              href="/"
              className="flex items-center  text-gray-700 hover:text-gray-900"
            >
              <BovinaIcon className="pr-2" size={30} />
              <span className="text-sm font-bold text-orange-400 hover:text-orange-600 md:text-xl">
                Bora Churrasco
              </span>
            </Link>
          </div>
          <div className="flex flex-row gap-8">
            <Link
              href="/recipes"
              className="md:text-md text-sm font-extrabold text-orange-400"
            >
              Receitas
            </Link>
            <Link
              href="/blog"
              className="md:text-md text-sm font-extrabold text-orange-400"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
