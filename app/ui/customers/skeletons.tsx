import Image from "next/image";
import {DeleteCustomer, UpdateCustomer} from "@/app/ui/customers/buttons";

export function CustomersMobileSkeleton() {
    return (
        <div className="mb-2 w-full rounded-md bg-white p-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                    <div className="flex items-center">
                        <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
                        <div className="h-6 w-16 rounded bg-gray-100"></div>
                    </div>
                    <div className="h-6 w-16 rounded bg-gray-100 mt-2"></div>
                </div>
            </div>
            <div className="flex w-full items-center justify-between border-b py-5">
                <div className="flex w-1/2 flex-col">
                    <div className="h-6 w-16 rounded bg-gray-100"></div>
                    <div className="h-6 w-16 rounded bg-gray-100 mt-2"></div>
                </div>
                <div className="flex w-1/2 flex-col">
                    <div className="h-6 w-16 rounded bg-gray-100"></div>
                    <div className="h-6 w-16 rounded bg-gray-100 mt-2"></div>
                </div>
            </div>
            <div className="flex w-full items-center justify-between pt-4">
                <div>
                    <div className="h-6 w-16 rounded bg-gray-100"></div>
                    <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
                </div>
                <div className="flex justify-end gap-2">
                    <div className="h-10 w-10 rounded bg-gray-100"></div>
                    <div className="h-10 w-10 rounded bg-gray-100"></div>
                </div>
            </div>
        </div>

        /*<div className="mb-2 w-full rounded-md bg-white p-4"
        >
            <div className="flex w-full items-center justify-between border-b py-5">
                <div className="flex w-1/2 flex-col">
                    <p className="text-xs">Pending</p>
                    <p className="font-medium">{customer.total_pending}</p>
                </div>
                <div className="flex w-1/2 flex-col">
                    <p className="text-xs">Paid</p>
                    <p className="font-medium">{customer.total_paid}</p>
                </div>
            </div>
            <div className="flex w-full items-center justify-between py-2 pt-4">
                <div className="text-sm">
                    <p>{customer.total_invoices} invoices</p>
                </div>
                <div className="flex justify-end gap-2">
                    <UpdateCustomer id={customer.id}/>
                    <DeleteCustomer id={customer.id}/>
                </div>
            </div>
        </div>*/
    );
}

export function TableRowSkeleton() {
    return (
        <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
            {/* Customer Name and Image */}
            <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100"></div>
                    <div className="h-6 w-24 rounded bg-gray-100"></div>
                </div>
            </td>
            {/* Email */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="h-6 w-32 rounded bg-gray-100"></div>
            </td>
            {/* Total Invoices */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Total Pending */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Total Paid */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Actions */}
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                    <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
                    <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
                </div>
            </td>
        </tr>
    );
}

export function CustomersTableSkeleton() {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        <CustomersMobileSkeleton />
                        <CustomersMobileSkeleton />
                        <CustomersMobileSkeleton />
                        <CustomersMobileSkeleton />
                        <CustomersMobileSkeleton />
                        <CustomersMobileSkeleton />
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                Name
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Email
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Total Invoices
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Total Pending
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Total Paid
                            </th>
                            <th
                                scope="col"
                                className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                            >
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        <TableRowSkeleton />
                        <TableRowSkeleton />
                        <TableRowSkeleton />
                        <TableRowSkeleton />
                        <TableRowSkeleton />
                        <TableRowSkeleton />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}