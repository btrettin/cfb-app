import express, { Application } from 'express';
import routes from './routes/index';

const app: Application = express();
const port = 3000;

app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});