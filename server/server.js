/* -------------------------------
|  Import express &  packages
|  ------------------------------- */
import express      from 'express';
import cookieParser from 'cookie-parser';
import cors         from 'cors';
import path         from 'path';
import compresion   from 'compression';
import dotenv       from 'dotenv';
import morgan       from 'morgan';
import helmet       from 'helmet';
import Routes       from './routes/index';
import Database     from './config/Database';





//dotenv config to be sure that .env file is imported and used correctly
dotenv.config({path: path.join(__dirname, '/.env')})

const port = process.env.PORT || 3000;
const name = process.env.APP_NAME;
const env  = process.env.NODE_ENV;





/* ------------------------------
|  App initialization
|  ------------------------------ */
const app = express();

app.use(cookieParser())

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(compresion())

app.use(helmet())



if(env !== 'production') app.use(morgan('dev'));





/* --------------------------------
|  Connect to the database
| --------------------------------- */
Database.prototype.connect();





/* --------------------------------
|  Routes handling
| --------------------------------- */
Routes.prototype.set(app)





app.listen(port, () => {
    console.log(`\n\nApp ${name} started listening to port ${port}`)
})