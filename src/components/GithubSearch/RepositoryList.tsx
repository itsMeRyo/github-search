import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { GitHubRepo } from '@/types';

interface RepositoryListProps {
    repositories: GitHubRepo[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {repositories.map((repo) => (
                <Card key={repo.id} className="bg-gray-200 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <CardHeader className="p-0 sm:mb-0 sm:w-3/4">
                        <CardTitle className="text-lg font-semibold text-gray-800">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {repo.name}
                            </a>
                        </CardTitle>
                        <CardDescription className="text-gray-700 text-sm">
                            {repo.description || 'No description provided.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex items-center text-gray-600 text-xs mt-2 sm:mt-0 sm:w-1/4 sm:justify-end">
                        <span className="flex items-center mr-3">
                            <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.725c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                            </svg>
                            {repo.stargazers_count}
                        </span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a3 3 0 016 0v3a1 1 0 11-2 0V7a1 1 0 00-1-1h-.096a1 1 0 00-.746.368L7 7.746V7a3 3 0 003-3z" clipRule="evenodd"></path>
                            </svg>
                            {repo.forks_count}
                        </span>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default RepositoryList