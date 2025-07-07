import ClientSuggestedPosts from "@/components/client-suggested-posts";
import ComoCalcularComponent from "@/components/como-calcular-component";
import Result from "@/components/ui/result";

export default function Resultado() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-0 md:p-16">
        <Result />
        <div className=" mb-4 md:mb-12">
          <ClientSuggestedPosts count={3} />
        </div>
        <ComoCalcularComponent />
      </main>
    </>
  );
}
