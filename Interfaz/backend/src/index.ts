import express from 'express';
//import blogsRoutes from "./routes/blogs.route.js"
import authRoutes from './routes/auth-route'

import cookieParser from 'cookie-parser'

import invoiceRoutes from './routes/invoice-route'

import medicineRoutes from './routes/medicine-route'

import pharmacyRoutes from './routes/pharmacy-route'

import cors from 'cors';
import {connectDB} from './db'

connectDB();

const app = express();
app.use(cors({
    origin: 'https://ds-proyecto-1.onrender.com',
    credentials: true
}));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

//app.use("/api", blogsRoutes);
app.use("/api", authRoutes);
app.use("/api", invoiceRoutes)
app.use("/api", medicineRoutes);
app.use("/api", pharmacyRoutes)

app.listen(5000);

export default app;
