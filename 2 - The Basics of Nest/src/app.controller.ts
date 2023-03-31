import {Controller, Get} from "@nestjs/common";

@Controller('/api/v1')
export class AppController {
    @Get('/hello')
    getRootRoute() {
        return 'Hello World';
    }

    @Get('/bye')
    getHelloRoute() {
        return 'Bye World'
    }
}
