import {Metadata} from "next";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/users/create-form";

export const metadata: Metadata = {
    title: 'Create Admin User',
};

interface PageProps {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}

export default async function Page() {

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Users', href: '/dashboard/users' },
                    {
                        label: 'Create User',
                        href: '/dashboard/users/create',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}