import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function GuideSearchBar() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/guides/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <div className="relative -top-16 max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <label
                htmlFor="search"
                className="block mb-2 text-gray-700 font-normal"
            >
                Search your Local Guide
            </label>
            <form className="flex gap-4" onSubmit={handleSubmit}>
                <input
                type="text"
                id="search"
                placeholder="Search the area"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <button
                type="submit"
                className="bg-green-300 text-black font-semibold px-6 rounded-md hover:bg-green-400 transition"
                >
                Search
                </button>
            </form>
        </div>
    )
}

export default GuideSearchBar;