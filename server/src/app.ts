import express, {Router} from 'express';
import bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import AppRouter from 'config/routes';
import helmet from 'helmet';
import Bootstrap from 'config/bootstrap';
import RouterConfig from 'config/routes';
import Middleware from './config/middleware';
import * as fs from 'fs';
import * as path from 'path';

class App {

    public app: express.Application;
    protected router: AppRouter;
    protected port
    constructor() {
        this.app = express(); //run the express instance and store in app
        this.port = process.env.PORT || 4000;
        this.config(this.app);
       // this.setMongoConfig();

       this.listen();


    }

    private config(app): void {
        // middlewares
        app.use(helmet())
        // support application/json type post data
        app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        app.use(bodyParser.urlencoded({
            extended: false
        }));

        app.use(cookieParser());
        //Enables cors   
        app.use(cors());

        this.configRoutes(app);
        // error handling
        this.initErrorHandling(app);
    }

    //Connecting to our MongoDB database
    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        const MONGO_DB: string = process.env.MONGO_URL
        mongoose.set('useCreateIndex', true);
        const db: any = mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        const mongo = mongoose.connection
        mongo.once("connected", async () => {
            console.log(`Connected to database at ${MONGO_DB}`);
            const response = await Bootstrap.init();
            this.listen();
        });
        mongo.on('disconnected', () => { console.log('mongo: Disconnected') })
    }

    
    private configRoutes (app: express.Application){
        Middleware.routes(app);
        RouterConfig.routes(app);
    }
    private initErrorHandling (app: express.Application){
        const isProduction = (process.env.NODE_ENV === 'production');

        isProduction ? app.set('env', 'production') : app.set('env', 'development');
        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            let err: any = new Error('Not A Valid url');
            err.status = 404;
            next(err);
        });
        if (app.get('env') === 'development') {
            app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || 500);
                res.json({
                    message: err.message,
                    error: err
                });
            });
        }
        
        app.use(function(err: any, req: express.Request, res: express.Response, next: Function) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: {}
            });
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
            this.initSocket();
        })
    }

    public initSocket = () => {
        let http = require('http').Server(this.app);
        let io = require('socket.io')(http);
        let ss = require('socket.io-stream');
        var stream = ss.createStream();

        io.on('connection', (socket:any) => {
            console.log('one user connected');
            ss(socket).emit('video-stream', stream);
            stream.pipe(fs.createWriteStream(path.join(__dirname,'video.mp4')));
        })
    }



}

const server: App = new App();


