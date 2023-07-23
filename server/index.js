import 'dotenv/config'
import express, { urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { database } from './database/connection.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js'

const app = express();

//middlewares
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({origin:true,credentials:true}));

app.set(urlencoded({extended:true}));

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter)


//db
database();

app.listen(process.env.PORT || 7000,()=>{
    console.log(`server started on PORT ${process.env.PORT || 7000} `)
})
