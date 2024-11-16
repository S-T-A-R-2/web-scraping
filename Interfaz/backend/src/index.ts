import express from 'express';
//import blogsRoutes from "./routes/blogs.route.js"
import authRoutes from './routes/auth-route'


import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//app.use("/api", blogsRoutes);
app.use("/api", authRoutes);

app.listen(5000);
console.log("conectado")
export default app;
