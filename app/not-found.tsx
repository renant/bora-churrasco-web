import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8">
        <CardHeader>
          <svg
            className="mx-auto h-12 w-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Not Found</title>
            <line x1="12" x2="12" y1="20" y2="10" />
            <line x1="18" x2="18" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="16" />
          </svg>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Página Não Encontrada
          </h2>
        </CardHeader>
        <CardContent>
          <p className="mt-2 text-center text-sm text-gray-600">
            Desculpe, não conseguimos encontrar a página que você está
            procurando.
          </p>
          <div className="mt-5">
            <Link href="/">
              <Button
                className="group w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                variant="default"
              >
                Voltar para a Página Inicial
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
