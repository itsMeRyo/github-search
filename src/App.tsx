import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ErrorIndicator from '@/components/common/Error';
import LoadingIndicator from '@/components/common/Loading';
import SearchBar from '@/components/GithubSearch/SearchBar';
import RepositoryList from '@/components/GithubSearch/RepositoryList';

import { useGithubSearch } from '@/hooks/useGithubSearch';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    users,
    selectedUser,
    isUserNotFound,
    repositories,
    loading,
    error,
    activeAccordionItem,
    searchUsers,
    handleUserSelect,
    setActiveAccordionItem
  } = useGithubSearch();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">

        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={() => searchUsers(searchTerm)}
          isLoading={loading}
        />

        {loading && !users && <LoadingIndicator />}
        {error && (
          <ErrorIndicator error={error} />
        )}

        {users.length > 0 && (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={activeAccordionItem}
            onValueChange={setActiveAccordionItem}
            data-testid="user-list"
          >
            {users.map((user, index) => (
              <AccordionItem value={`item-${user?.id}`} key={user?.id} className="border-b border-gray-200 last:border-b-0">
                <AccordionTrigger
                  data-testid={`user-${index + 1}`}
                  onClick={() => handleUserSelect(user)}
                  className="flex items-center justify-between p-3 hover:bg-blue-50 cursor-pointer transition duration-150 ease-in-out"
                >
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-900">{user?.login}</span>
                  </div>
                </AccordionTrigger>
                {selectedUser?.id === user?.id && (
                  <AccordionContent className="p-4 bg-gray-50 border-t border-gray-200">
                    {loading && <LoadingIndicator message="Loading repositories..." />}
                    {error && <p className="text-center text-red-700">{error}</p>}
                    {!loading && !error && repositories.length === 0 ? (
                      <p className="text-gray-600 text-center p-4">No public repositories found for this user.</p>
                    ) : (
                      <RepositoryList repositories={repositories} />
                    )}
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        )}
        {!loading && !error && isUserNotFound && (
          <p className="text-gray-600 text-center p-4">No user found.</p>)}
      </div>
    </div>
  );
};

export default App;
