import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { Post } from "@/content/posts";
import { images } from "@/content/images";
import { cn } from "@/lib/config-utils";

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function PostCard({ post, featured = false, headingLevel = "h3" }: { post: Omit<Post, "body">; featured?: boolean; headingLevel?: "h2" | "h3" }) {
  const img = images[post.image];
  const Heading = headingLevel;
  return (
    <article className={cn("group relative flex h-full overflow-hidden rounded-3xl border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lift", featured ? "flex-col lg:flex-row" : "flex-col")}>
      <div className={cn("relative overflow-hidden", featured ? "aspect-[16/10] lg:aspect-auto lg:w-1/2" : "aspect-[16/10]")}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          placeholder="blur"
          sizes={featured ? "(min-width:1024px) 40vw, 100vw" : "(min-width:1024px) 26vw, (min-width:640px) 45vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold tracking-wide text-navy-900 uppercase">{post.category}</span>
      </div>
      <div className={cn("flex flex-1 flex-col", featured ? "p-8 lg:p-12" : "p-6")}>
        <p className="flex items-center gap-3 text-sm text-muted">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" /> {post.readingMinutes} min read
          </span>
        </p>
        <Heading className={cn("mt-3 font-semibold", featured ? "text-3xl leading-tight lg:text-4xl" : "text-xl leading-snug")}>
          <Link href={`/resources/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-navy-700">
            {post.title}
          </Link>
        </Heading>
        <p className={cn("mt-3 leading-relaxed text-body", !featured && "line-clamp-3")}>{post.excerpt}</p>
        <span className="mt-auto pt-5 text-sm font-semibold text-navy-700" aria-hidden="true">
          Read article →
        </span>
      </div>
    </article>
  );
}
