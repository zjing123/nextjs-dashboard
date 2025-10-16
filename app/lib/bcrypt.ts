import bcrypt from 'bcrypt';

/**
 * 哈希密码
 * @param password 原始密码
 * @returns 哈希后的密码
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

/**
 * 比较密码
 * @param password 原始密码
 * @param hashedPassword 哈希后的密码
 * @returns 密码是否匹配
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
