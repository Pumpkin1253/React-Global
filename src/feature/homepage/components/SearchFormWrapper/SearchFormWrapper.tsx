import { Outlet, useOutletContext } from "react-router-dom";
import { SearchForm } from "../SearchForm/SearchForm";
import styles from "./SearchFormWrapper.module.scss";

interface SearchContextType {
  initialQuery: string;
  onSearch: (query: string) => void;
  onShowAddForm: () => void;
  onCloseModal: () => void;
  onSubmitModal: () => void;
}

export function SearchFormWrapper() {
  const { initialQuery, onSearch, onShowAddForm, onCloseModal, onSubmitModal } =
    useOutletContext<SearchContextType>();

  const outletContext = {
    onCloseModal: onCloseModal,
    onSubmitModal: onSubmitModal,
  };

  return (
    <div className={styles.header}>
      <button className={styles.headerButton} onClick={onShowAddForm}>
        +
      </button>
      <SearchForm initialQuery={initialQuery} onSearch={onSearch}></SearchForm>
      <Outlet context={outletContext}></Outlet>
    </div>
  );
}
