import bcrypt from 'bcrypt';

import 'dotenv/config';

const PasswordHash = async (password: string) => {
	const salt = await bcrypt.genSalt(Number(process.env.SALT));
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

export { PasswordHash };
