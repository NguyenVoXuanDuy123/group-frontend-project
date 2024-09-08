import { useEffect, useRef, ReactNode } from "react";

type InfiniteScrollProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  loadMore: () => void;
};

const InfiniteScroll = <T,>({
  items,
  renderItem,
  loadMore,
}: InfiniteScrollProps<T>) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentObserverTarget = observerTarget.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0, rootMargin: "100px 0px 100px 0px" }
    );

    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }

    return () => {
      //cleanup function
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [items, loadMore]);

  return (
    <>
      {items.map(renderItem)}
      <div
        ref={observerTarget}
        className="w-full h-1 flex items-center justify-center"></div>
    </>
  );
};

export default InfiniteScroll;
