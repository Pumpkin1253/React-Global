import type { SortOption } from "../../interfaces/homepage.interfaces";
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
        id="sort-select"
        value={props.sortBy}
        onChange={(e) => props.onChange(e.target.value as SortOption)}
      >
        <option value="releaseDate">Release Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
}
