import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { GroupCard } from "@/types/group.types";
import { UserInformation } from "@/types/user.types";
import { useSearchParams } from "react-router-dom";
import { SearchBy } from "@/enums/search.enums";
import InfiniteScroll from "@/components/Common/InfiniteScroll";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const searchBy = (searchParams.get("searchBy") as SearchBy) || SearchBy.USER;

  const [searchResults, setSearchResults, loadMoreSearchResults] =
    useInfiniteScroll<UserInformation | GroupCard>({
      endpoint: `/api/search`,
      limit: 10,
      queryParams: {
        q,
        searchBy,
      },
      idBased: true,
    });

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        {searchResults.map((item) => (
          <div key={item._id} className="mb-4 p-4 border rounded-md">
            {"name" in item ? (
              <h2 className="text-xl font-semibold">
                {(item as GroupCard).name}
              </h2>
            ) : (
              <h2 className="text-xl font-semibold">
                {(item as UserInformation).username}
              </h2>
            )}
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
      <InfiniteScroll
        items={searchResults}
        loadMore={loadMoreSearchResults}
        renderItem={(item) => (
          <div key={item._id} className="mb-4 p-4 border rounded-md">
            {"name" in item ? (
              <h2 className="text-xl font-semibold">
                {(item as GroupCard).name}
              </h2>
            ) : (
              <h2 className="text-xl font-semibold">
                {(item as UserInformation).username}
              </h2>
            )}
            {/* Add more details as needed */}
          </div>
        )}
      />
    </div>
  );
};

export default SearchPage;
