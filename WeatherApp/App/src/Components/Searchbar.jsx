import { useState } from 'react';
import { faSearch, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Searchbar({
  onSearch,
  loading,
  currentLocation,
  geoLocation }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    onSearch(inputValue.trim());
    setInputValue('');
    loading = true; 
  };
  return (
    
    <div className={`max-w-full md:max-w-5xl mx-auto p-4 bg-white/20 rounded-xl drop-shadow-2xl backdrop-blur-md shadow-md transition-all duration-300 `}>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div className='flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0 min-w-[180px]'>
          <h1 className='text-2xl font-bold text-gray-100 flex items-center gap-2'>
            Weather App
          </h1>
          <p className='text-gray-100 text-sm'>Search for a city</p>
        </div>

        <div className='relative flex-1'>
          <input
            type='text'
            value={inputValue}
            placeholder='Search for a city...'
            className='w-full p-3 pl-4 pr-12 border border-gray-200 rounded-lg focus:outline-none  transition-all duration-300'
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            
          
          />

          <button
            onClick={handleSearch}
            disabled={loading || !inputValue.trim()}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors `}
          >
            {loading ? (
              <div className='w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin'></div>
            ) : (
              <FontAwesomeIcon icon={faSearch} className="text-lg text-white" />
            )}
          </button>
        </div>
        <div>
          <button
            className='flex items-center gap-2 text-gray-100'
            disabled={loading}
          >
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{currentLocation } {geoLocation }</span>
          </button>
        </div>
      </div>
    </div>
  );
}