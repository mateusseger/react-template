import axios from 'axios'
import { ApiValidationError, type ApiValidationErrorResponse } from '../types'

const OIDC_KEY = `oidc.user:${import.meta.env.VITE_AUTH_AUTHORITY}:${import.meta.env.VITE_AUTH_CLIENT_ID}`

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:58732/api',
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000,
})

apiClient.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem(OIDC_KEY) || '{}')?.access_token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            window.location.href = '/unauthorized'
            return Promise.reject(error)
        }

        if (error.response?.status === 422) {
            const data: ApiValidationErrorResponse = error.response.data
            throw new ApiValidationError(
                data.message || 'Houve um erro ao processar sua requisição',
                data.errors || [],
                422
            )
        }

        return Promise.reject(error)
    }
)
