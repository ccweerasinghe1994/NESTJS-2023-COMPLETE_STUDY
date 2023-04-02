import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
    supplyPower(watts:number):void {
        console.log(`supplying ${watts} of power`)
    }
}
