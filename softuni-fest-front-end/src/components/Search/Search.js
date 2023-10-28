import styles from "./Search.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Search = ({onInputChange, searchValue}) => {
    return (
        <div className={styles["container"]}>
                <input type="text" 
                    onChange={onInputChange}
                    value={searchValue}
                />
                <button>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
        </div>
    )
}
