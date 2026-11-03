/**
 * Scroll reveal primitives, without a JavaScript animation library.
 *
 * These render plain server HTML marked with `data-reveal`; the CSS in
 * globals.css and the small inline <RevealScript /> (end of <body>) fade them
 * in as they scroll into view. Content already on screen is shown at once,
 * and everything stays visible with JavaScript off or reduced motion on, so
 * animation never delays content or interaction.
 */
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none" | "scale";

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as: Comp = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  /** Seconds. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  return (
    <Comp className={className} data-reveal={direction} style={delay ? { transitionDelay: `${delay}s` } : undefined} suppressHydrationWarning>
      {children}
    </Comp>
  );
}

/** Parent for staggered children: each <StaggerItem> starts `gap` seconds after the previous one. */
export function Stagger({ children, className, gap = 0.05, as: Comp = "div" }: { children: ReactNode; className?: string; gap?: number; as?: "div" | "ul" | "ol" }) {
  return (
    <Comp className={className} data-reveal-stagger={Math.round(gap * 1000)}>
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className, as: Comp = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  return (
    <Comp className={className} data-reveal="up" suppressHydrationWarning>
      {children}
    </Comp>
  );
}

// Runs during HTML parsing, before React hydrates. Marks on-screen content as
// revealed immediately, reveals the rest when it nears the viewport (the huge
// top margin also reveals content skipped by an anchor jump), and watches for
// content added by client-side navigation. Positions are read from the
// enclosing .cv-auto section where there is one: measuring an element inside
// a skipped section would force the layout that content-visibility avoids.
const revealScript = `(function(){
var d=document,docEl=d.documentElement;
if(!("IntersectionObserver" in window))return;
docEl.setAttribute("data-js","");
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute("data-revealed","");io.unobserve(e.target);}});},{rootMargin:"100000px 0px -60px 0px"});
function scan(root){
  if(!root.querySelectorAll)return;
  root.querySelectorAll("[data-reveal-stagger]").forEach(function(g){
    var gap=+g.getAttribute("data-reveal-stagger")||50,i=0;
    for(var c=g.firstElementChild;c;c=c.nextElementSibling){if(c.hasAttribute("data-reveal")&&!c.style.transitionDelay)c.style.transitionDelay=(i++*gap)+"ms";}
  });
  root.querySelectorAll("[data-reveal]:not([data-revealed])").forEach(function(el){
    var host=el.closest(".cv-auto");
    if(host&&host.getBoundingClientRect().top>=innerHeight){io.observe(el);return;}
    if(el.getBoundingClientRect().top<innerHeight)el.setAttribute("data-revealed","");else io.observe(el);
  });
}
scan(d);
new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)scan(n.parentNode||n);});});}).observe(d.body,{childList:true,subtree:true});
})();`;

/** Place once, at the end of <body>. */
export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: revealScript }} />;
}
