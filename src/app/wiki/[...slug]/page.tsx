import { notFound, redirect } from "next/navigation";
import SetPageTitle from "@/components/SetPageTitle";
import Link from "next/link";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params;
  const pathname = decodeURIComponent(slug.join('/'));
  const rawPost = await getPostBySlug(pathname);

  async function getPostBySlug(slug: string) {
    try {
      const {
        default: Post,
        frontmatter: metadata
      } = await import(`@/content/${slug.toLowerCase()}.mdx`);
  
      return { Post, metadata };
    } catch {
      return undefined;
    }
  }

  if (!rawPost) {
    notFound();
  }

  const { Post, metadata } = rawPost;

  if (metadata.url) {
    if (
      pathname.toLowerCase() !== metadata.url.toLowerCase() &&
      pathname.toLowerCase() !== pathname
    ) {
      redirect(pathname.toLowerCase());
    }
  
    if (pathname !== metadata.url) {
      redirect(metadata.url);
    }
  }

  const overrideComponents = {
    a: Link,
  }

  return (
    <>
      { // set to the provided title if post has one
        metadata.title && <SetPageTitle value={metadata.title} />
      }
      <Post components={overrideComponents} />
    </>
  );
}
 
export const dynamicParams = false;