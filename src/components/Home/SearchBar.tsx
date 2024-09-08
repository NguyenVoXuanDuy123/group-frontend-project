import { SearchBy } from "@/enums/search.enums";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popover from "../Common/Popover";
import ChevronDown from "../svg/ChevronDown";
import SearchIcon from "../svg/SearchIcon";
import FriendIcon from "../svg/side-bar-icons/FriendIcon";
import GroupIcon from "../svg/side-bar-icons/GroupIcon";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.USER);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate("/");
      setTimeout(() => {
        navigate(`/search?q=${searchQuery}&searchBy=${searchBy}`);
      }, 100);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 max-w-2xl mx-auto my-8 w-full border border-light-grey rounded-lg"
    >
      <div className="flex items-center rounded-lg p-2 w-full bg-white">
        <Popover
          popoverOpen={popoverOpen}
          setPopoverOpen={setPopoverOpen}
          displayComponent={
            <button
              type="button"
              className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium
                       text-gray-700 bg-white  rounded-md hover:bg-gray-50 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                       w-full sm:w-auto"
            >
              {searchBy === SearchBy.GROUP ? (
                <GroupIcon className="mr-2 h-4 w-4" />
              ) : (
                <FriendIcon className="mr-2 h-4 w-4" />
              )}
              {capitalizeFirstLetter(searchBy)}
              <ChevronDown />
            </button>
          }
        >
          <div className="mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="none">
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => {
                  setSearchBy(SearchBy.USER);
                  setPopoverOpen(false);
                }}
              >
                <FriendIcon className="mr-2 h-4 w-4" />
                <span>User</span>
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => {
                  setSearchBy(SearchBy.GROUP);
                  setPopoverOpen(false);
                }}
              >
                <GroupIcon className="mr-2 h-4 w-4" />
                <span>Group</span>
              </button>
            </div>
          </div>
        </Popover>

        <div className="mx-2 h-8 w-[1px] bg-light-grey"></div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="flex-grow p-2 border-0 focus:outline-none text-gray-700"
        />

        <button
          onClick={handleSubmit}
          className="p-2 text-blue-500 hover:text-blue-700"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
}
