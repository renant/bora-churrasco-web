import JsonLd from "@/components/JsonLd";
import Image from "next/image";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";

type Params = Promise<{ slug: string }>;

async function loadMdxFile(slug: string) {
  try {
    const mdxPath = path.join(process.cwd(), "post-contents", `${slug}.mdx`);

    if (!fs.existsSync(mdxPath)) {
      return null;
    }
    const mdxModule = await import(`@/post-contents/${slug}.mdx`);
    return mdxModule;
  } catch (error) {
    console.error("Failed to load MDX file:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  if (!params || !(await params).slug) {
    throw new Error("Slug is required");
  }

  const { slug } = await params;
  const mdxModule = await loadMdxFile(slug);

  if (!mdxModule) {
    return {
      title: "Bora Churrasco! - Post não encontrado",
      description: "Post não encontrado",
    };
  }

  const { metadata } = mdxModule;

  const url = `https://www.borachurrasco.app/post/${metadata.slug}`;

  return {
    title: `${metadata.title} | Bora Churrasco`,
    description: `${metadata.resume}`,
    alternates: {
      canonical: url,
    },
    keywords: metadata.tags,
    images: [
      {
        url: metadata.coverImage,
      },
    ],
    openGraph: {
      title: `${metadata.title} | Bora Churrasco`,
      description: `${metadata.resume}`,
      url: url,
      images: [
        {
          url: metadata.coverImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
      locale: "pt_BR",
      type: "article",
      article: {
        publishedTime: new Date(metadata.date).toISOString(),
        authors: ["Bora Churrasco"],
        tags: metadata.tags,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: `${metadata.title} | Bora Churrasco`,
      description: `${metadata.resume}`,
      images: [metadata.coverImage],
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { metadata, default: Post } = await loadMdxFile(slug);

  if (!metadata) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-transparent px-4  md:container md:mx-auto md:px-9 md:pt-20 lg:px-64">
      <div className="space-y-6">
        <div
          className="relative w-full overflow-hidden rounded-lg bg-gray-100"
          style={{
            aspectRatio: "16/9",
            contain: "layout paint",
          }}
        >
          <Image
            priority
            width={1200}
            height={675}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
            className="object-cover"
            src={metadata.coverImage}
            alt={`Image do post ${metadata.title}`}
            quality={85}
            fetchPriority="high"
          />
        </div>

        <article
          className="prose prose-sm max-w-none space-y-4 pb-44 md:prose-lg prose-headings:my-4 prose-h2:my-4 prose-p:my-2 prose-a:text-blue-700"
          itemScope
          itemType="https://schema.org/Article"
        >
          <meta
            itemProp="datePublished"
            content={new Date(metadata.date).toISOString()}
          />

          <h1 itemProp="headline" className="mb-4 mt-0">
            {metadata.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <time dateTime={new Date(metadata.date).toISOString()}>
              {new Date(metadata.date).toLocaleDateString("pt-BR", {
                timeZone: "America/Sao_Paulo",
              })}
            </time>
          </div>

          <Post />
        </article>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: metadata.title,
          description: metadata.resume,
          datePublished: new Date(metadata.date).toISOString(),
          author: {
            "@type": "Person",
            name: "Bora Churrasco",
          },
          image: metadata.coverImage,
          publisher: {
            "@type": "Organization",
            name: "Bora Churrasco",
            logo: {
              "@type": "ImageObject",
              url: "https://www.borachurrasco.app/images/ms-icon-310x310.png",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.borachurrasco.app/post/${metadata.slug}`,
          },
          articleSection: metadata.tags?.[0],
          keywords: metadata.tags?.join(", "),
        }}
      />
    </main>
  );
}

export function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "post-contents"));
  const slugs = files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));

  return slugs;
}

export const dynamicParams = false;
