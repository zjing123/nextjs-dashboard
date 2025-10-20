import {Metadata} from "next";
import {lusitana} from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { CreateUser } from "@/app/ui/users/buttons";
import { fetchUsersPages } from '@/app/lib/users/data';
import Pagination from "@/app/ui/customers/pagination";
import { UsersTableSkeleton } from '@/app/ui/users/skeletons'
import UsersTable from '@/app/ui/users/table'
import {Suspense} from "react";

export const metadata: Metadata = {
    title: 'Admin Users',
};

interface PageProps {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}

export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchUsersPages(query);


    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Admin Users</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search Customers..." />
                <CreateUser />
            </div>
            <Suspense key={query + currentPage} fallback={<UsersTableSkeleton />}>
                <UsersTable query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
}