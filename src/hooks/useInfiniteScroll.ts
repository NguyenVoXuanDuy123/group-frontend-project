import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchApi } from "@/helpers/fetchApi";
type UsePaginatedDataOptions = {
  endpoint: string;
  limit: number;
  idBased?: boolean;
  moreQueryParams?: { [key: string]: unknown };
};

const DATA_PER_RENDER = 4;
type WithIdAndCreatedAt = { _id: string; createdAt?: string };
export const useInfiniteScroll = <T extends WithIdAndCreatedAt>({
  endpoint,
  limit,
  // If the infinite scroll is based on id, set idBased to true
  idBased = false,
  moreQueryParams,
}: UsePaginatedDataOptions) => {
  const [data, setData] = useState<T[]>([]);
  const [renderedData, setRenderedData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetchData = useCallback(
    async (limit: number, condition?: { [key: string]: unknown }) => {
      setIsLoading(true);
      try {
        const query = new URLSearchParams({
          limit: limit.toString(),
          ...condition,
          ...moreQueryParams,
        }).toString();

        const newData = await fetchApi<T[]>(
          `${endpoint}?${query}`,
          "GET",
          dispatch
        );

        if (newData !== null) {
          setData((prevData) => [...prevData, ...newData]);

          // If the data length is less than the limit, it means there is no more data to fetch
          setHasMore(newData.length === limit);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [moreQueryParams, endpoint, dispatch]
  );

  useEffect(() => {
    fetchData(limit);
  }, [fetchData, limit]);

  const loadMore = useCallback(() => {
    if (isLoading) return;
    if (renderedData.length < data.length) {
      setRenderedData((prevData) => [
        ...prevData,
        ...data.slice(prevData.length, prevData.length + DATA_PER_RENDER),
      ]);
    }
    if (!hasMore) return;

    // ALways fetch limit/2 more data when data.length - renderedData.length < limit/2
    //, so that the data still extends when the internet is disconnected
    const halfLimit = Math.ceil(limit / 2);
    if (data.length > 0 && data.length - renderedData.length < halfLimit) {
      const lastItem = data[data.length - 1];
      if (!idBased) {
        fetchData(halfLimit, { beforeDate: lastItem.createdAt });
      } else {
        fetchData(halfLimit, { afterId: lastItem._id });
      }
    }
  }, [
    data,
    fetchData,
    hasMore,
    idBased,
    isLoading,
    limit,
    renderedData.length,
  ]);

  // Create a function type React.Dispatch<React.SetStateAction<T[]>>
  // to mutate the data and renderedData at the same time
  const mutateData: React.Dispatch<React.SetStateAction<T[]>> = useCallback(
    (callback: React.SetStateAction<T[]>) => {
      setData(callback);
      setRenderedData(callback);
    },
    [setData, setRenderedData]
  );

  return [renderedData, mutateData, loadMore, isLoading] as const;
};
