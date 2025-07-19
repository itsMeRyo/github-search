interface ErrorIndicatorProps {
    error: string | null
}

const ErrorIndicator: React.FC<ErrorIndicatorProps> = ({ error }) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
        </div>
    )
}

export default ErrorIndicator