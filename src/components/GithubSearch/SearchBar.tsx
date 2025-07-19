import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
    onSearch: () => void;
    isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    onSearchTermChange,
    onSearch,
    isLoading
}) => {
    return (
        <div className="mb-6">
            <Label htmlFor="search-input" className="sr-only">Search GitHub Users</Label>
            <Input
                id="search-input"
                data-testid="search-input"
                type="text"
                placeholder="Enter username"
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                className="w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSearch();
                    }
                }}
            />
            <Button
                onClick={onSearch}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
                disabled={isLoading || !searchTerm}
                data-testid="search-button"
            >
                Search
            </Button>
        </div>
    );
};

export default SearchBar