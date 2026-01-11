import { createBrowserRouter, useRouteError } from "react-router-dom"

import {
    authRoutes,
    errorRoutes,
    ProtectedRoute,
    AppLayout,
    ErrorFallback,
} from "@herval/react-core"

import { appConfig } from "./app-config"

import { homeRoutes } from "@/features/home/routes"
import { designSystemRoutes } from "@/features/design-system/routes"

function RouteError() {
    const error = useRouteError() as Error
    return <ErrorFallback error={error} showStack={import.meta.env.DEV} />
}

const withErrorElement = (routes: Parameters<typeof createBrowserRouter>[0]) =>
    routes.map(route => ({ ...route, errorElement: <RouteError /> }))

export const router = createBrowserRouter([
    ...withErrorElement(authRoutes),

    {
        path: "/",
        element: (
            <ProtectedRoute>
                <AppLayout
                    projectConfig={appConfig.project}
                    menuItems={appConfig.menu}
                />
            </ProtectedRoute>
        ),
        children: [
            ...homeRoutes,
            ...designSystemRoutes,
            // ...formulariosRoutes,
            // ...toDoListRoutes,
            // ...pokedexRoutes,
            // ...previsaoTempoRoutes,
            // ...temasRoutes,
        ],
        errorElement: <RouteError />
    },

    ...withErrorElement(errorRoutes),
])
