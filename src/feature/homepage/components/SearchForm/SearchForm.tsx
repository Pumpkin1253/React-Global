import { useState } from "react";
import "./SearchForm.scss";

export interface SearchFormProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

export function SearchForm(props: SearchFormProps) {
  const [query, setQuery] = useState<string>(props.initialQuery);

  return (
    <div className="search">
      <input
        className="search__field"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        type="text"
        placeholder="What do you want to watch?"
      />
      <button className="search__btn" onClick={() => props.onSearch(query)}>
        Search
      </button>
    </div>
  );
}
