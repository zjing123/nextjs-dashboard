import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-2">
            <FaceFrownIcon className="w-10 text-gray-400" />
            <h2 className="text-xl font-semibold">404 Not Found</h2>
            <p>Could not find the requested user.</p>
            <Link href="/dashboard/users">
                <Button>Go Back</Button>
            </Link>
        </main>
    );
}
