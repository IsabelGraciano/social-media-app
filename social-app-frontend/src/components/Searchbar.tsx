import { BsSearch } from 'react-icons/bs';

function Searchbar() {
    return(
        <div className='relative'>
            <input
                type="text"
                name="searchbar"
                id="searchbar"
                className='bg-gray-200 h-8 w-64 rounded-full pl-10 pr-3'
            />
            <label
                htmlFor="searchbar"
                className='absolute top-1/2 right-3 transform -translate-y-1/2'
            >
               <BsSearch/>     
            </label>
        </div>
    )
}

export default Searchbar