import 'dotenv/config';
import app from './server';
import 'express-async-errors';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});