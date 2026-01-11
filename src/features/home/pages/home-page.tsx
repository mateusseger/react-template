import { PageHeader } from "@/shared/components"
import { useAuth } from "@herval/react-core"
import { Home } from "lucide-react"

export function HomePage() {
    const { user } = useAuth()

    return (
        <div className="flex flex-col min-h-full gap-6 px-0 py-4 sm:px-4">
            <PageHeader
                icon={Home}
                title={`Olá, ${user?.profile?.name?.split(' ')[0]}!`}
                description="Seja bem-vindo ao template de projetos React."
            />
        </div>
    )
}
