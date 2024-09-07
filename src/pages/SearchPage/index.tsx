import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { GroupCard } from "@/types/group.types";
import { UserInformation } from "@/types/user.types";
import { useSearchParams } from "react-router-dom";
import { SearchBy } from "@/enums/search.enums";
import InfiniteScroll from "@/components/Common/InfiniteScroll";
import ProfileGroupCard from "@/components/Profile/ProfileGroupCard";
import SearchBar from "@/components/Home/SearchBar";
import FriendCard from "@/components/SideBarRight/FriendCard";
import getFullName from "@/helpers/getFullName";

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
      <InfiniteScroll
        items={searchResults}
        loadMore={loadMoreSearchResults}
        renderItem={(item) => (
          <div key={item._id} className="mb-4 p-4 pb-2 rounded-lg bg-white">
            {"name" in item ? (
              <ProfileGroupCard group={item} />
            ) : (
              <FriendCard
                avatar={item.avatar}
                name={getFullName(item)}
                username={item.username}
                mutualFriendCount={item.mutualFriendCount}
              />
            )}
          </div>
        )}
      />
    </div>
  );
};

export default SearchPage;
