import styles from "./Search.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Search = ({onInputChange, searchValue, searchBussiness}) => {
    return (
        <div className={styles["container"]}>
                <input type="text" 
                    onChange={onInputChange}
                    value={searchValue}
                />
                <button
                    onClick={searchBussiness}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
        </div>
    )
}
