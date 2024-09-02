import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchApi } from "@/helpers/fetchApi";
type UsePaginatedDataOptions = {
  endpoint: string;
  limit: number;
  idBased?: boolean;
};

const DATA_PER_RENDER = 4;

export const useInfiniteScroll = <T>({
  endpoint,
  limit,
  // If the infinite scroll is based on id, set idBased to true
  idBased = false,
}: UsePaginatedDataOptions) => {
  const [data, setData] = useState<T[]>([]);
  const [renderedData, setRenderedData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetchData = useCallback(
    async (condition?: { [key: string]: unknown }) => {
      const query = new URLSearchParams({
        limit: limit.toString(),
        ...condition,
      }).toString();

      const newData = await fetchApi<T[]>(
        `${endpoint}?${query}`,
        "GET",
        dispatch
      );

      if (newData !== null) {
        setData((prevData) => [...prevData, ...newData]);
        setHasMore(newData.length === limit);
      }

      setIsLoading(false);
    },
    [endpoint, limit, dispatch]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadMore = useCallback(() => {
    if (isLoading) return;
    if (renderedData.length < data.length) {
      setRenderedData((prevData) => [
        ...prevData,
        ...data.slice(prevData.length, prevData.length + DATA_PER_RENDER),
      ]);
      return;
    }
    if (!hasMore) return;

    if (data.length > 0) {
      const lastItem = data[data.length - 1];

      // I have to use any here because I don't know the type of the last item
      if (!idBased) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchData({ beforeDate: (lastItem as any).createdAt });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchData({ afterId: (lastItem as any).id });
      }
    }
  }, [data, fetchData, hasMore, idBased, isLoading, renderedData]);

  return [renderedData, setRenderedData, loadMore, isLoading] as const;
};
