import React, { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import useSearch from "../../../Hooks/useSearch";
import useFriends from "../../../Store/useFriends";
import useSendRequest from "../../../Hooks/Friends/useSendRequest";

const FriendSearch = () => {
  const { friendSearch } = useSearch();
  const { addingFriends, searchText, setSearchText } = useFriends();
  const { loading, sendFriendRequest } = useSendRequest();

  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      if (focused) inputRef.current.blur();
      else inputRef.current.focus();
      setFocused((prev) => !prev);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (!addingFriends) friendSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!addingFriends) return;
    setSearchText("");
    sendFriendRequest(searchText);
  };

  return (
    <form
      className="flex items-center mx-auto w-8/12 h-12 bg-gray-800 rounded-2xl px-2 text-lg"
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        className="flex items-center justify-center w-8 h-8 my-auto text-2xl text-white"
        onClick={handleButtonClick}
      >
        {focused ? <IoArrowBack /> : <IoMdSearch />}
      </button>
      <input
        type="text"
        className="flex-grow bg-transparent placeholder-slate-500 text-box p-2"
        placeholder={`${
          addingFriends ? "You can add Yappers with their YipYap username" : "Find my Yappers..."
        }`}
        value={searchText}
        ref={inputRef}
        onChange={handleChange}
      />
      {addingFriends ? (
        <button
          className="btn btn-sm h-9 w-32 bg-blue-500 hover:bg-blue-600 font-bold text-white text-base disabled:bg-gray-600 disabled:text-gray-400"
          type="submit"
          disabled={searchText == ""}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <span className="loading loading-spinner" />
            </div>
          ) : (
            "Add Yapper"
          )}
        </button>
      ) : (
        <></>
      )}
    </form>
  );
};

export default FriendSearch;
