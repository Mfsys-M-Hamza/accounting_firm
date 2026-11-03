"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function Placeholder() {
  // Same footprint as the real form so nothing shifts when it swaps in.
  return <div aria-hidden="true" className="min-h-[38rem] rounded-xl bg-white/95 shadow-lift sm:min-h-[30rem]" />;
}

const CallbackForm = dynamic(() => import("./callback-form").then((m) => m.CallbackForm), { ssr: false, loading: Placeholder });

/**
 * The enquiry form sits at the bottom of most pages, and its validation
 * libraries are the largest script on the site. Load it only when the visitor
 * scrolls within ~800px of it, so it never slows down the first screen.
 */
export function LazyCallbackForm({ defaultService }: { defaultService?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{show ? <CallbackForm defaultService={defaultService} /> : <Placeholder />}</div>;
}
