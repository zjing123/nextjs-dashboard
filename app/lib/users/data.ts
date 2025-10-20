import postgres from 'postgres';
import {
    User
} from '@/app/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const ITEMS_PER_PAGE = 10;

export async function fetchFilteredUsers(
    query: string,
    currentPage: number
) {
    try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;

        const data = await sql`SELECT * from users
            WHERE users.name ILIKE ${`%${query}%`}
            OR users.email ILIKE ${`%${query}%`}
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch users.');
    }
}

export async function fetchUserById(id: string) {
    try {
        const data = await sql`SELECT * from users WHERE id = ${id}`;
        
        if (data.length === 0) {
            return null;
        }
        
        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function fetchUsersPages(query: string) {
    try {
        const data = await sql`SELECT COUNT(*)
            FROM users
            WHERE
                 users.name ILIKE ${`%${query}%`} OR
                 users.email ILIKE ${`%${query}%`}
        `;

        console.log(data)

        return Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of users.');
    }
}