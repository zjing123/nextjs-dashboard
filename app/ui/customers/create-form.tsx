'use client';

import { UserCircleIcon, EnvelopeIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {Button} from "@/app/ui/button";
import ImageUploader from "@/app/ui/customers/image-upload";
import {createCustomer, CustomerFormState} from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form() {
    const initialState: CustomerFormState = { message: null, errors: {} };
    const [state, formAction] = useActionState(createCustomer, initialState);

    console.log(state);

    return (
        <form action={formAction}>
            {/* 显示通用错误消息 */}
            {state?.message && (
                <div className="mb-4 rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-500">{state.message}</p>
                </div>
            )}
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Customer Name */}
                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Customer Name
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter customer name..."
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="name-error"
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.name &&
                            state.errors.name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Invoice Amount */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Customer Email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Enter customer email..."
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="email-error"
                            />
                            <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.email &&
                            state.errors.email.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Invoice Status */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Upload Customer Image
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <ImageUploader />
                    </div>
                    <div id="image-url-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.image_url &&
                            state.errors.image_url.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </fieldset>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/customers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Customer</Button>
            </div>
        </form>
    );
}