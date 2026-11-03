import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { postAuthor, type Post } from "@/content/posts";
import { images } from "@/content/images";
import { cn } from "@/lib/config-utils";

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** Article card: image, category, title, excerpt, author, published/updated date and reading time. */
export function PostCard({ post, featured = false, headingLevel = "h3" }: { post: Omit<Post, "body">; featured?: boolean; headingLevel?: "h2" | "h3" }) {
  const img = images[post.image];
  const Heading = headingLevel;
  return (
    <article
      className={cn(
        "group relative flex h-full overflow-hidden rounded-xl border border-line bg-white transition-[border-color,box-shadow] duration-200 hover:border-teal-600/40 hover:shadow-lift",
        featured ? "flex-col lg:flex-row" : "flex-col",
      )}
    >
      <div className={cn("relative overflow-hidden", featured ? "aspect-wide lg:aspect-auto lg:w-1/2" : "aspect-wide")}>
        <Image
          quality={85}
          src={img.src}
          alt={img.alt}
          fill
          placeholder="blur"
          // The featured card is the first thing on /resources (its LCP element), so don't lazy-load it.
          {...(featured ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
          sizes={featured ? "(min-width:1024px) 40vw, 100vw" : "(min-width:1024px) 24rem, (min-width:640px) 45vw, 100vw"}
          className="object-cover"
        />
      </div>
      <div className={cn("flex flex-1 flex-col", featured ? "p-8 lg:p-10" : "p-6")}>
        <p className="text-xs font-bold tracking-[0.08em] text-teal-700 uppercase">{post.category}</p>
        <Heading className={cn("mt-2 font-bold", featured ? "text-3xl leading-tight" : "text-lg leading-snug")}>
          <Link href={`/resources/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-teal-700">
            {post.title}
          </Link>
        </Heading>
        <p className={cn("mt-2.5 leading-relaxed text-body", featured ? "text-lg" : "line-clamp-3 text-[0.9375rem]")}>{post.excerpt}</p>
        <div className="mt-auto pt-5">
          <p className="border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-muted">
            <span className="font-semibold text-navy-900">{postAuthor(post)}</span>
            <br />
            {post.updatedAt ? (
              <>
                Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </>
            ) : (
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            )}{" "}
            · {post.readingMinutes} min read
          </p>
          <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-teal-700" aria-hidden="true">
            Read article <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
