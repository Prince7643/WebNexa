import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import { stripeWebhook } from "./controllers/stripewebhook.js";

const app = express();
const corsOptions = {
    origin: process.env.TRUSTED_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true
}
// Middleware
app.use(cors(corsOptions));
app.post('/api/stripe',express.raw({type:'application/json'}),stripeWebhook)
app.use(express.json({limit:'50mb'}));

const port = process.env.PORT;

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use('/api/user',userRouter)
app.use('/api/project', projectRouter)


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});