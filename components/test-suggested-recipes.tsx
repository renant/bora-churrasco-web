import Image from "next/image";
import Link from "next/link";

export default function TestSuggestedRecipes() {
  // Hardcoded test data to ensure rendering works
  const testRecipes = [
    {
      slug: "kafta-para-churrasco",
      title: "Kafta para churrasco",
      imagePath: "https://firebasestorage.googleapis.com/v0/b/bora-churrasco.appspot.com/o/images-notion%2F0263671a-9715-42f8-b48d-81bb906f17b1?alt=media&token=e75e2b2f-cc35-4c6d-b3c3-65ea8b4a76b4",
      date: "2023-08-05"
    },
    {
      slug: "picanha-com-manteiga-de-ervas",
      title: "Picanha com manteiga de ervas",
      imagePath: "https://firebasestorage.googleapis.com/v0/b/bora-churrasco.appspot.com/o/images-notion%2F0263671a-9715-42f8-b48d-81bb906f17b1?alt=media&token=e75e2b2f-cc35-4c6d-b3c3-65ea8b4a76b4",
      date: "2023-07-15"
    },
    {
      slug: "fraldinha-marinada",
      title: "Fraldinha marinada",
      imagePath: "https://firebasestorage.googleapis.com/v0/b/bora-churrasco.appspot.com/o/images-notion%2F0263671a-9715-42f8-b48d-81bb906f17b1?alt=media&token=e75e2b2f-cc35-4c6d-b3c3-65ea8b4a76b4",
      date: "2023-06-20"
    },
    {
      slug: "costela-assada-na-brasa",
      title: "Costela assada na brasa",
      imagePath: "https://firebasestorage.googleapis.com/v0/b/bora-churrasco.appspot.com/o/images-notion%2F0263671a-9715-42f8-b48d-81bb906f17b1?alt=media&token=e75e2b2f-cc35-4c6d-b3c3-65ea8b4a76b4",
      date: "2023-05-10"
    },
    {
      slug: "pao-de-alho",
      title: "Pão de alho",
      imagePath: "https://firebasestorage.googleapis.com/v0/b/bora-churrasco.appspot.com/o/images-notion%2F0263671a-9715-42f8-b48d-81bb906f17b1?alt=media&token=e75e2b2f-cc35-4c6d-b3c3-65ea8b4a76b4",
      date: "2023-04-25"
    },
    {
      slug: "farofa-crocante-com-bacon-e-castanhas",
      title: "Farofa crocante com bacon",
      imagePath: "https://firebasestorage.googleapis.com/v0/b/bora-churrasco.appspot.com/o/images-notion%2F0263671a-9715-42f8-b48d-81bb906f17b1?alt=media&token=e75e2b2f-cc35-4c6d-b3c3-65ea8b4a76b4",
      date: "2023-03-30"
    }
  ];

  return (
    <section className="w-full bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200 mt-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Você também pode gostar
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Descubra sabores incríveis para deixar seu churrasco ainda mais especial! 🍖
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {testRecipes.map((recipe) => (
          <Link href={`/recipes/${recipe.slug}`} key={recipe.slug} className="group">
            <div className="relative text-center transition-all duration-300 hover:scale-105">
              <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={recipe.imagePath}
                  alt={`Foto da receita: ${recipe.title}`}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end p-3">
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight drop-shadow-lg line-clamp-2">
                    {recipe.title}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link 
          href="/recipes" 
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
        >
          Ver Todas as Receitas
        </Link>
      </div>
    </section>
  );
}