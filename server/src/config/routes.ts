import { MainController } from "controllers/main.controller";
import userRouter from "./routes/user.router";

class RouterConfig {
    private static readonly API_PATH: string = "/api/v1";

    public static routes(router: any): any {
        router.get("/", MainController.index);
        router.use(`${this.API_PATH}/user`, userRouter); 
    }
}

export default RouterConfig;
