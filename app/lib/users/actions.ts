'use server';

import {revalidatePath} from "next/cache";
import postgres from "postgres";
import {z} from "zod";
import bcrypt from "bcrypt";
import {redirect} from "next/navigation";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const UserFormSchema = z.object({
    id: z.string(),
    name: z.string().min(1, {
        message: 'Please enter user name.'
    }),
    email: z.string().email({
        message: 'Please enter a valid email.'
    }),
    password: z.string().min(1, {
        message: 'Please enter password.'
    }),
    password_confirmation: z.string().min(1, {
        message: 'Please enter password confirmation.'
    })
});

const CreateUser = UserFormSchema.omit({id: true}).refine(
    (data) => data.password === data.password_confirmation,
    {
        message: "Password confirmation does not match password",
        path: ["password_confirmation"], // 错误将显示在 password_confirmation 字段上
    }
);
export type UserFormState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        password_confirmation?: string[];
    };
    message?: string | null;
};


export async function createUser(
    prevState: UserFormState,
    formData: FormData
) {
    console.log(formData)

    const validatedFields = CreateUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    // Prepare data for insertion into the database
    const { name, email, password } = validatedFields.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`
           INSERT INTO users (name, email, password)
           VALUES(${name}, ${email}, ${hashedPassword})
        `;
    } catch (error) {
        console.log(error)
        return {
            message: 'Error: Create admin user failed.'
        };
    }

    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}

export async function updateUser(
    id: string,
    prevState: UserFormState,
    formData: FormData
) {
    const validatedFields = CreateUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    // Prepare data for insertion into the database
    const { name, email, password } = validatedFields.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`
           UPDATE users 
           SET name = ${name}, email = ${email}, password = ${hashedPassword}
           WHERE id = ${id}
        `;
    } catch (error) {
        console.log(error)
        return {
            message: 'Error: Update user failed.'
        };
    }

    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}

export async function deleteUser(id: string) {
    await sql `DELETE FROM users where id = ${id}`;

    revalidatePath('/dashboard/users');
}