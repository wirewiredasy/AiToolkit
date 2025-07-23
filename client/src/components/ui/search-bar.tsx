import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export default function SearchBar({ placeholder = "Search tools...", onSearch, className = "" }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-12 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
        />
        {searchQuery && (
          <Button
            onClick={clearSearch}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-slate-100 rounded-xl"
          >
            <X className="w-4 h-4 text-slate-400" />
          </Button>
        )}
      </div>
      
      {/* Search suggestions could be added here */}
      {searchQuery && (
        <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-lg mt-2 p-4 z-50">
          <p className="text-sm text-slate-500">
            Searching for "{searchQuery}" across all tools...
          </p>
        </div>
      )}
    </div>
  );
}