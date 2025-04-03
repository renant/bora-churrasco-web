'use client'

import CriancaIcon from '@/components/icons/crianca-icon'
import HomemIcon from '@/components/icons/homem-icon'
import MulherIcon from '@/components/icons/mulher-icon'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import churrascoStore from '@/lib/churrascoStore'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Participantes() {
  const {
    homens,
    setHomens,
    mulheres,
    setMulheres,
    criancas,
    setCriancas,
    temParticipantes,
  } = churrascoStore()

  const handleNumberInput = (value: string, setter: (val: number) => void) => {
    const num = parseInt(value)
    if (!isNaN(num) && num >= 0) {
      setter(num)
    } else if (value === '') {
      setter(0)
    }
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="w-full max-w-xl"
      >
        <Card className="border-red-200 bg-white/5 shadow-lg backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-500 md:text-4xl">
              Vamos começar com o número de participantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <motion.div variants={item} className="space-y-6">
              <div className="group relative space-y-2">
                <Label htmlFor="homens" className="text-red-400">
                  Homens
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 transition-colors group-focus-within:bg-red-500/20">
                    <HomemIcon size={30} />
                  </div>
                  <Input
                    id="homens"
                    type="number"
                    min="0"
                    onChange={(e) => handleNumberInput(e.target.value, setHomens)}
                    value={homens === 0 ? '' : homens}
                    className="flex-1 border-red-400 bg-transparent text-lg text-red-600 placeholder-red-400/40 transition-all focus:border-red-500 focus:ring-red-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="group relative space-y-2">
                <Label htmlFor="mulheres" className="text-red-400">
                  Mulheres
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 transition-colors group-focus-within:bg-red-500/20">
                    <MulherIcon size={30} />
                  </div>
                  <Input
                    id="mulheres"
                    type="number"
                    min="0"
                    onChange={(e) => handleNumberInput(e.target.value, setMulheres)}
                    value={mulheres === 0 ? '' : mulheres}
                    className="flex-1 border-red-400 bg-transparent text-lg text-red-600 placeholder-red-400/40 transition-all focus:border-red-500 focus:ring-red-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="group relative space-y-2">
                <Label htmlFor="criancas" className="text-red-400">
                  Crianças
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 transition-colors group-focus-within:bg-red-500/20">
                    <CriancaIcon size={30} />
                  </div>
                  <Input
                    id="criancas"
                    type="number"
                    min="0"
                    onChange={(e) => handleNumberInput(e.target.value, setCriancas)}
                    value={criancas === 0 ? '' : criancas}
                    className="flex-1 border-red-400 bg-transparent text-lg text-red-600 placeholder-red-400/40 transition-all focus:border-red-500 focus:ring-red-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="flex justify-center pt-6"
            >
              <Link href="/assados" className={cn(!temParticipantes() && "pointer-events-none")}>
                <Button
                  variant="outline"
                  size="lg"
                  disabled={!temParticipantes()}
                  className={cn(
                    "group relative overflow-hidden px-8 py-6 transition-all",
                    temParticipantes()
                      ? "border-red-500 text-red-500 hover:border-red-600 hover:text-red-600"
                      : "border-red-300 text-red-300 cursor-not-allowed"
                  )}
                >
                  <span className="relative z-10">Avançar</span>
                  <div className={cn(
                    "absolute inset-0 -z-0 transition-transform duration-300",
                    temParticipantes()
                      ? "bg-red-500/10 group-hover:scale-95"
                      : "bg-red-300/5"
                  )} />
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
