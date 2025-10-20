'use client';

import { UserCircleIcon, EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {Button} from "@/app/ui/button";
import {updateUser, UserFormState} from '@/app/lib/users/actions';
import { useActionState } from 'react';

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export default function EditUserForm({
    user,
}: {
    user: User;
}) {
    const initialState: UserFormState = { message: null, errors: {} };
    const updateUserWithId = updateUser.bind(null, user.id);
    const [state, formAction] = useActionState(updateUserWithId, initialState);

    return (
        <form action={formAction}>
            {/* 显示通用错误消息 */}
            {state?.message && (
                <div className="mb-4 rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                {state.message}
                            </h3>
                        </div>
                    </div>
                </div>
            )}

            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* User Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        用户名
                    </label>
                    <div className="relative">
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="输入用户名"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={user.name}
                            aria-describedby="name-error"
                        />
                    </div>
                    {state?.errors?.name ? (
                        <div
                            id="name-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.name.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* User Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        邮箱
                    </label>
                    <div className="relative">
                        <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="输入邮箱地址"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={user.email}
                            aria-describedby="email-error"
                        />
                    </div>
                    {state?.errors?.email ? (
                        <div
                            id="email-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.email.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="mb-2 block text-sm font-medium">
                        密码
                    </label>
                    <div className="relative">
                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="输入新密码"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="password-error"
                        />
                    </div>
                    {state?.errors?.password ? (
                        <div
                            id="password-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.password.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Password Confirmation */}
                <div className="mb-4">
                    <label htmlFor="password_confirmation" className="mb-2 block text-sm font-medium">
                        确认密码
                    </label>
                    <div className="relative">
                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            placeholder="再次输入密码"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="password_confirmation-error"
                        />
                    </div>
                    {state?.errors?.password_confirmation ? (
                        <div
                            id="password_confirmation-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.password_confirmation.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/users"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    取消
                </Link>
                <Button type="submit">更新用户</Button>
            </div>
        </form>
    );
}
