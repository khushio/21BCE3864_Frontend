import React, { useState } from 'react';

interface Trademark {
  id: string;
  trademarkName: string;
  owner: string;
  lawFirm: string;
  attorney: string;
  status: string;
}

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [owner, setOwner] = useState('');
  const [lawFirm, setLawFirm] = useState('');
  const [attorney, setAttorney] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Trademark[]>([]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.trademarkia.com/v1/search?query=${query}&owner=${owner}&lawFirm=${lawFirm}&attorney=${attorney}&status=${status}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError('Error occurred while fetching results');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="container mx-auto p-6 max-w-4xl bg-blue-100 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Trademarkia Search</h1>
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a trademark"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Owner"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={lawFirm}
              onChange={(e) => setLawFirm(e.target.value)}
              placeholder="Law Firm"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={attorney}
              onChange={(e) => setAttorney(e.target.value)}
              placeholder="Attorney"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Status"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </form>

        {/* Status Indicator */}
        {loading && (
          <p className="text-blue-500 text-center mt-6 font-semibold">Searching...</p>
        )}
        {error && (
          <p className="text-red-500 text-center mt-6 font-semibold">{error}</p>
        )}
        {!loading && results.length === 0 && (
          <p className="text-gray-500 text-center mt-6">No results found</p>
        )}

        {/* Results */}
        <div className="mt-8 grid grid-cols-1 gap-6">
          {results.map((result) => (
            <div key={result.id} className="border border-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">{result.trademarkName}</h3>
              <p className="text-gray-600 mt-2">Owner: {result.owner}</p>
              <p className="text-gray-600">Law Firm: {result.lawFirm}</p>
              <p className="text-gray-600">Attorney: {result.attorney}</p>
              <p className="text-gray-600">Status: {result.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
