import loggerMiddleware from '../api/middlewares/logger';
class Middleware {

    public static routes(app: any): void {
        app.all("*",  loggerMiddleware);
    }
}

export default Middleware;