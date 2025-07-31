import { useState, useEffect } from 'react';
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
  };



  return (
    <div className={`max-w-full md:max-w-5xl mx-auto p-4 bg-white/10 drop-shadow-2xl backdrop-blur-md shadow-md rounded-lg transition-all duration-300 `}>
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
            className='w-full p-3 pl-4 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300'
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            
            disabled={loading}
          />

          <button
            onClick={handleSearch}
            disabled={loading || !inputValue.trim()}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${loading
                ? 'text-gray-400'
                : inputValue.trim()
                  ? 'text-blue-600 hover:text-blue-800'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
          >
            {loading ? (
              <div className='w-4 h-4 border-2 border-blue-100 border-t-transparent rounded-full animate-spin'></div>
            ) : (
              <FontAwesomeIcon icon={faSearch} className="text-lg" />
            )}
          </button>
        </div>
        <div>
          <button
            onClick={() => onSearch()}
            className='flex items-center gap-2 text-gray-100'
            disabled={loading}
          >
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{currentLocation} </span>
            <span>{geoLocation}</span>
          </button>
        </div>
      </div>
    </div>
  );
}