import type { ApiValidationError } from '../types'

interface ApiValidationErrorMessageProps {
    error: ApiValidationError
}

export function ApiValidationErrorMessage({ error }: ApiValidationErrorMessageProps) {
    if (error.errorMessages.length === 0) {
        return <span>{error.message}</span>
    }

    return (
        <div className="space-y-1">
            {error.errorMessages.map((msg, i) => (
                <div key={i}>• {msg}</div>
            ))}
        </div>
    )
}
