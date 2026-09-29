import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Info } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getPost, posts, relatedPosts, slugify, type Block } from "@/content/posts";
import { images } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/config-utils";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/motion";
import { PostCard, formatDate } from "@/components/sections/post-card";
import { ShareButtons } from "@/components/sections/share-buttons";
import { Illustration } from "@/components/icons/illustrations";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/resources/${post.slug}`,
    image: images[post.image].src.src,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
  });
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} id={slugify(block.text)} className="scroll-mt-28">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 key={i}>{block.text}</h3>;
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside key={i} className="my-8 rounded-2xl border-l-4 border-gold-500 bg-gold-100/50 px-6 py-5 text-ink">
          {block.text}
        </aside>
      );
    default:
      return <p key={i}>{block.text}</p>;
  }
}

export default async function ArticlePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const img = images[post.image];
  const author = post.author ?? `${siteConfig.companyName} Editorial Team`;
  const toc = post.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  const url = absoluteUrl(`/resources/${post.slug}`);
  // Place the in-article CTA roughly halfway through the body.
  const midpoint = post.body.findIndex((b, i) => b.type === "h2" && i >= post.body.length / 2);

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden bg-navy-900 pt-32 pb-40 sm:pt-36">
          <div className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" aria-hidden="true" />
          <div className="container-page max-w-4xl animate-[fade-up_0.8s_cubic-bezier(0.22,1,0.36,1)_both]">
            <Breadcrumbs
              light
              className="mb-6"
              items={[
                { name: "Resources", href: "/resources" },
                { name: post.title, href: `/resources/${post.slug}` },
              ]}
            />
            <p className="eyebrow text-gold-400">{post.category}</p>
            <h1 className="mt-4 text-4xl leading-[1.12] font-semibold text-white sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-lg text-white/75">{post.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/65">
              <span>
                By <span className="font-semibold text-white">{author}</span>
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.updatedAt ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                  </span>
                </>
              ) : null}
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden="true" /> {post.readingMinutes} min read
              </span>
            </div>
          </div>
        </header>

        <div className="container-page -mt-28 max-w-5xl">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] shadow-lift">
            <Image src={img.src} alt={img.alt} fill priority placeholder="blur" sizes="(min-width:1024px) 64rem, 100vw" className="object-cover" />
          </div>
        </div>

        <div className="container-page grid max-w-5xl gap-12 py-14 lg:grid-cols-[1fr_15rem]">
          <div className="prose-article min-w-0 text-body">
            {post.body.map((block, i) =>
              i === midpoint ? (
                <div key={`cta-${i}`}>
                  <aside className="not-prose my-10 flex flex-col gap-5 rounded-3xl bg-navy-900 p-7 sm:flex-row sm:items-center">
                    <Illustration name="consultation" className="size-16 shrink-0" />
                    <div className="flex-1">
                      <p className="font-display text-xl leading-snug font-semibold text-white">Want expert help with this?</p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-white/70">Our team can handle it for you. Get a free, no-obligation quote.</p>
                    </div>
                    <ButtonLink href="/quote" variant="gold" className="shrink-0 no-underline">
                      Get a quote
                    </ButtonLink>
                  </aside>
                  {renderBlock(block, i)}
                </div>
              ) : (
                renderBlock(block, i)
              ),
            )}

            <aside className="mt-12 flex gap-3 rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              <Info className="mt-0.5 size-5 shrink-0 text-navy-700" aria-hidden="true" />
              <p className="mb-0!">
                This article is general information only and is not professional advice. Rules differ between jurisdictions and change over time — please{" "}
                <Link href="/contact">contact us</Link> for advice on your specific circumstances.
              </p>
            </aside>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            {toc.length > 0 ? (
              <nav aria-label="In this article">
                <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">In this article</p>
                <ol className="mt-4 space-y-2.5 border-l border-line text-sm">
                  {toc.map((h) => (
                    <li key={h.text}>
                      <a href={`#${slugify(h.text)}`} className="-ml-px block border-l-2 border-transparent pl-4 text-body transition-colors hover:border-gold-500 hover:text-navy-700">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            <div>
              <p className="mb-3 text-xs font-bold tracking-[0.14em] text-muted uppercase">Share</p>
              <ShareButtons url={url} title={post.title} />
            </div>
            <div className="rounded-3xl border border-line p-6">
              <p className="font-display text-lg font-semibold text-ink">Talk to an adviser</p>
              <p className="mt-2 text-sm text-body">Book a consultation to discuss your situation.</p>
              <ButtonLink href="/book-consultation" size="sm" className="mt-4 w-full">
                Book now <ArrowRight aria-hidden="true" />
              </ButtonLink>
            </div>
          </aside>
        </div>
      </article>

      <Section labelledBy="related-title" tone="paper">
        <SectionHeading id="related-title" align="left" eyebrow="Keep reading" title="Related articles" />
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts(post).map((p) => (
            <StaggerItem key={p.slug}>
              <PostCard post={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <JsonLd data={articleSchema(post, author, img.src.src)} />
    </>
  );
}
