"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { categories, type Post } from "@/content/posts";
import { cn } from "@/lib/config-utils";
import { PostCard } from "./post-card";

type PostSummary = Omit<Post, "body">;

/** Category filter + search over article summaries (bodies are not sent to the client). */
export function ResourceExplorer({ posts }: { posts: PostSummary[] }) {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) => (category === "All" || p.category === category) && (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q)),
    );
  }, [posts, category, query]);

  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c, posts.filter((p) => p.category === c).length])), [posts]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                category === c ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-ink hover:border-navy-600/50",
              )}
            >
              {c}
              {c !== "All" ? <span className={cn("ml-1.5 text-xs", category === c ? "text-white/60" : "text-muted")}>{counts[c]}</span> : null}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80">
          <label htmlFor="resource-search" className="sr-only">
            Search articles
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="h-12 w-full rounded-full border border-line bg-white pr-10 pl-11 text-[0.9375rem] outline-none focus:border-navy-600 focus:ring-4 focus:ring-navy-600/10 [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-muted hover:text-ink">
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-muted">
        {results.length} {results.length === 1 ? "article" : "articles"}
        {category !== "All" ? ` in ${category}` : ""}
        {query ? ` matching “${query}”` : ""}
      </p>

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <li key={p.slug} className="animate-[fade-up_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
              <PostCard post={p} headingLevel="h3" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold text-ink">No articles found</p>
          <p className="mt-2 text-body">Try a different search term or category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 text-sm font-semibold text-navy-700 underline underline-offset-2"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
