import type { SortOption } from "../../constants/homepage.constants";
import styles from "./SortControl.module.scss";

export interface SortControlProps {
  sortBy: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortControl(props: SortControlProps) {
  return (
    <div className={styles.sort}>
      <label htmlFor="sort-select">Sort by</label>
      <select
        data-cy="sort-select"
        id="sort-select"
        value={props.sortBy}
        onChange={(e) => props.onChange(e.target.value as SortOption)}
      >
        <option data-cy="sort-date" value="release_date">
          Release Date
        </option>
        <option data-cy="sort-title" value="title">
          Title
        </option>
      </select>
    </div>
  );
}
