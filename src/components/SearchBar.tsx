import { memo } from "react";
interface SearchBarProps {
  onChange: (e: any) => void;
  searchTerm: string;
}
function SearchBar({ onChange, searchTerm }: SearchBarProps) {
  return (
    <>
      <img src="./search.svg" />
      <input
        placeholder="Search Movies and TV shows"
        value={searchTerm}
        onChange={onChange}
      />
    </>
  );
}

export default memo(SearchBar);
