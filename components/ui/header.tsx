import { Menu } from 'lucide-react'
import Link from 'next/link'
import BovinaIcon from '../icons/bovina-icon'
import { Button } from './button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './sheet'

export function Header() {
  return (
    <header className="container mx-auto py-6">
    <nav className="flex items-center justify-between">
      <Link className="flex items-center gap-2" href="/">
        <BovinaIcon className="pr-2" size={30} />
        <span className="text-2xl font-bold text-red-600">Bora Churrasco</span>
      </Link>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-red-800">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-gradient-to-b from-amber-50 to-red-100 border-red-200">
            <SheetHeader>
              <SheetTitle className="text-red-800">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              <Link
                href="/recipes"
                className="text-red-800 hover:text-red-600 font-medium text-lg py-2 border-b border-red-200"
              >
                Receitas
              </Link>
              <Link
                href="/blog"
                className="text-red-800 hover:text-red-600 font-medium text-lg py-2 border-b border-red-200"
              >
                Blog
              </Link>
              <Button variant="default" className="bg-red-600 hover:bg-red-700 mt-4 w-full" asChild>
                <Link href="/participantes">
                  Teste Online
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/recipes" className="text-red-800 hover:text-red-600 font-medium">
          Receitas
        </Link>
        <Link href="/blog" className="text-red-800 hover:text-red-600 font-medium">
          Blog
        </Link>
        <Button variant="default" className="bg-red-600 hover:bg-red-700" asChild>
          <Link href="/participantes">
            Teste Online
          </Link>
        </Button>
      </div>
    </nav>
  </header>


  )
}
