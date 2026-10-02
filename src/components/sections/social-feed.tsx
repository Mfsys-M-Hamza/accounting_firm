import Image from "next/image";
import { siteConfig } from "@/config/site";
import { socialPosts } from "@/content/images";
import { configuredSocialLinks } from "@/lib/config-utils";
import { Stagger, StaggerItem } from "@/components/motion/motion";
import { SocialIcon } from "@/components/icons/brand-icons";
import { buttonClasses } from "@/components/ui/button";

const platformLabels = { linkedin: "LinkedIn", instagram: "Instagram", facebook: "Facebook", x: "X", youtube: "YouTube" } as const;

/** Grid of the firm's own social posts, each linking to its Instagram (or first configured) profile. */
export function SocialFeed({ limit = socialPosts.length }: { limit?: number }) {
  const links = configuredSocialLinks();
  if (links.length === 0 || socialPosts.length === 0) return null;
  const primary = links.find((l) => l.platform === "instagram") ?? links[0];

  return (
    <>
      <Stagger as="ul" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {socialPosts.slice(0, limit).map((post) => (
          <StaggerItem as="li" key={post.src.src}>
            <a
              href={primary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-navy-50 shadow-card ring-1 ring-line"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                placeholder="blur"
                sizes="(min-width:1024px) 22vw, 45vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <span className="sr-only"> — view on {platformLabels[primary.platform]} (opens in a new tab)</span>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {links.map((l) => (
          <a key={l.platform} href={l.url} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline")}>
            <SocialIcon platform={l.platform} /> Follow {siteConfig.companyName} on {platformLabels[l.platform]}
          </a>
        ))}
      </div>
    </>
  );
}
