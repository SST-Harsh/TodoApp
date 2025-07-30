import { useState } from 'react'

export default function Searchbar({ onSearch }) {
    const [input, setInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.trim() !== '') {
            onSearch(input.trim())
            setInput('')
        }
    }

    return (
        <div>

            <form onSubmit={handleSubmit} className="w-full max-w-md flex gap-2">
                <input
                    type="text"
                    placeholder="Enter city name..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow px-4 py-2 rounded-l-md border-none outline-none"
                />
                <button
                    type="submit"
                    className="bg-white text-blue-600 px-4 py-2 rounded-r-md font-semibold hover:bg-blue-100"
                >
                    Search
                </button>
            </form>
        </div>
    )
}
