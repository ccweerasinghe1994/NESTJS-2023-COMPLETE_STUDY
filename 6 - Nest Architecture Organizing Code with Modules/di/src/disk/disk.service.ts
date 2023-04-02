import { Injectable } from '@nestjs/common';
import {PowerService} from "../power/power.service";

@Injectable()
export class DiskService {
    constructor(private powerService:PowerService) {
    }

    getData():string{
        console.log(`drawing 5 of power`);
        this.powerService.supplyPower(5);
        return 'data';
    }
}
