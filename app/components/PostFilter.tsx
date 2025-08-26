const PostFilter = ({ searchQuery, onSearchChange }: { searchQuery: string, onSearchChange: (value: string) => void }) => {
  return (
    <div className="mb-6">
      <input type="text" name="search" id="search" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} placeholder="search"
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  );
}

export default PostFilter;