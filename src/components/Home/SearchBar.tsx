import { SearchBy } from "@/enums/search.enums";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.USER);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/search?q=${encodeURIComponent(searchQuery)}&searchBy=${searchBy}`
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 max-w-2xl mx-auto my-8"
    >
      <div className="relative flex-grow">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <select
        value={searchBy}
        onChange={(e) => setSearchBy(e.target.value as SearchBy)}
        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value={SearchBy.GROUP}>Group</option>
        <option value={SearchBy.USER}>User</option>
      </select>
      <button
        type="submit"
        className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Search
      </button>
    </form>
  );
}
