import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface LocationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

const LocationSearch = ({ searchQuery, setSearchQuery, onSearch }: LocationSearchProps) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for your farm location..."
          className="flex-1"
        />
        <Button onClick={onSearch} disabled={!searchQuery}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default LocationSearch;