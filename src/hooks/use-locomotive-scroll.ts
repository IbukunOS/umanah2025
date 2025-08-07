import { useEffect, useRef, useState } from "react";

export function useLocomotiveScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState<any | null>(null);

  useEffect(() => {
    let instance: any | null = null;

    const init = async () => {
      const { default: Locomotive } = await import("locomotive-scroll");
      if (!containerRef.current) return;

      instance = new Locomotive({
        el: containerRef.current,
        smooth: true,
        multiplier: 1.1,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });

      setScroll(instance);
    };

    init();

    return () => {
      if (instance) {
        try {
          instance.destroy?.();
        } catch {}
      }
    };
  }, []);

  return { containerRef, scroll } as const;
}

