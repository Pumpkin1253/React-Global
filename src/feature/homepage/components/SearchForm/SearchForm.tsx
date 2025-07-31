import { useState } from "react";
import styles from "./SearchForm.module.scss";

export interface SearchFormProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

export function SearchForm(props: SearchFormProps) {
  const [query, setQuery] = useState<string>(props.initialQuery);

  return (
    <div className={styles.search}>
      <input
        className={styles.searchField}
        type="text"
        placeholder="What do you want to watch?"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <button
        className={styles.searchBtn}
        onClick={() => props.onSearch(query)}
      >
        Search
      </button>
    </div>
  );
}
