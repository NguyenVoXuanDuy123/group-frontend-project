import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { GroupCard } from "@/types/group.types";
import { UserInformation } from "@/types/user.types";
import { useSearchParams } from "react-router-dom";
import { SearchBy } from "@/enums/search.enums";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const searchBy = (searchParams.get("searchBy") as SearchBy) || SearchBy.USER;
  console.log(searchParams);
  console.log(q);
  console.log(searchBy);

  const [searchResult, setSearchResult, loadMoreSearchResult] =
    useInfiniteScroll<UserInformation | GroupCard>({
      endpoint: `/api/search`,
      limit: 10,
      queryParams: {
        q,
        searchBy,
      },
      idBased: true,
    });

  console.log(searchResult);

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        {searchResult.map((item) => (
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
      <button
        onClick={loadMoreSearchResult}
        className="mt-4 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Load More
      </button>
    </div>
  );
};

export default SearchPage;
