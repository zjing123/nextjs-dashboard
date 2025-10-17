import {Metadata} from "next";
import { fetchCustomerById } from '@/app/lib/data';
import {notFound} from "next/navigation";
import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

export const metadata: Metadata = {
    title: 'Edit Invoice',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const customer = await fetchCustomerById(id);

    if (!customer) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Customers', href: '/dashboard/customers' },
                    {
                        label: 'Edit Customer',
                        href: `/dashboard/customers/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form customer={customer}/>
        </main>
    );
}