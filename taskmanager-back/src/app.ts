import 'dotenv/config';
import express from 'express';
import taskRoutes from './routes/Routes';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api', taskRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
export default app;