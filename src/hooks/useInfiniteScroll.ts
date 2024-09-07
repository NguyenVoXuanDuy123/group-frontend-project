import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchApi } from "@/helpers/fetchApi";
type UsePaginatedDataOptions = {
  endpoint: string;
  limit: number;
  /* If idBased is set to true, the infinite scroll will fetch data based on the last id*/
  idBased?: boolean;
  queryParams?: { [key: string]: string };
  /*
   * If isAllowFetch is set to false, the infinite scroll will not fetch data
   * even though backend will prevent the fetch if the user don't have the permission
   * but isAllowFetch here will prevent from making the request,
   * so that we don't have to wait for the response and save the user's bandwidth
   */
  isAllowFetch?: boolean;
};

const DATA_PER_RENDER = 4;
type WithIdAndCreatedAt = { _id: string; createdAt?: string };
export const useInfiniteScroll = <T extends WithIdAndCreatedAt>({
  endpoint,
  limit,
  idBased = false,
  queryParams,
  isAllowFetch = true,
}: UsePaginatedDataOptions) => {
  const [data, setData] = useState<T[]>([]);
  const [renderedData, setRenderedData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetchData = useCallback(
    async (
      limit: number,
      condition?: { [key: string]: string | undefined }
    ) => {
      if (!isAllowFetch) return;
      setIsLoading(true);
      try {
        const query = new URLSearchParams({
          limit: limit.toString(),
          ...condition,
          ...queryParams,
        }).toString();

        const response = await fetchApi<T[]>(
          `${endpoint}?${query}`,
          "GET",
          dispatch
        );

        if (response.status === "success") {
          const newData = response.result;
          setData((prevData) => [...prevData, ...newData]);

          // If the data length is less than the limit, it means there is no more data to fetch
          setHasMore(newData.length === limit);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isAllowFetch, endpoint, dispatch]
  );

  useEffect(() => {
    fetchData(limit);
  }, [fetchData, limit]);

  const loadMore = useCallback(() => {
    if (isLoading || !isAllowFetch) return;
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
    isAllowFetch,
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
