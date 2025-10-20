import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchUserById } from '@/app/lib/users/data';
import EditUserForm from '@/app/ui/users/edit-form';

export const metadata: Metadata = {
    title: 'Edit User',
};

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const user = await fetchUserById(id);

    if (!user) {
        notFound();
    }

    return (
        <main>
            <EditUserForm user={user} />
        </main>
    );
}
