export interface ValidationError {
    field: string
    message: string
}

export interface ApiValidationErrorResponse {
    message: string
    errors: ValidationError[]
}

export class ApiValidationError extends Error {
    public readonly errors: ValidationError[]
    public readonly statusCode: number

    constructor(message: string, errors: ValidationError[], statusCode: number = 422) {
        super(message)
        this.name = 'ApiValidationError'
        this.errors = errors
        this.statusCode = statusCode
    }

    get errorMessages(): string[] {
        return this.errors.map((e) => e.message)
    }
}
