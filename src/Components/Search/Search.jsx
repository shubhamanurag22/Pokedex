import useDebounce from '../../hooks/useDebounce';
import './Search.css';

function Search( {updateSearchTerm} ){
    const debounceCallback = useDebounce((e) => updateSearchTerm(e.target.value));

    return(
        <div className='search-wrapper'>
            <input 
                id="pokemon-name-search" 
                type="text" 
                placeholder="Pokemon Name..."
                onChange={debounceCallback}
            />
        </div>
    )
}

export default Search;