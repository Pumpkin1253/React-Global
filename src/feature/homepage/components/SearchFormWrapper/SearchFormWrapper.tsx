import { useOutletContext } from "react-router-dom";
import { SearchForm } from "../SearchForm/SearchForm";
import styles from "./SearchFormWrapper.module.scss";

interface SearchContextType {
  initialQuery: string;
  onSearch: (query: string) => void;
  onShowAddForm: () => void;
}

export function SearchFormWrapper() {
  const { initialQuery, onSearch, onShowAddForm } =
    useOutletContext<SearchContextType>();
  return (
    <div className={styles.header}>
      <button className={styles.headerButton} onClick={onShowAddForm}>
        +
      </button>
      <SearchForm initialQuery={initialQuery} onSearch={onSearch}></SearchForm>
    </div>
  );
}
