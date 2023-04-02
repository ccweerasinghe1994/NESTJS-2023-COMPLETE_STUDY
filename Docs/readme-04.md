# Nest Architecture Organizing Code with Modules

## 31 - Project Overview
![alt text](./Assets/images/set-01/57.png)
![alt text](./Assets/images/set-01/58.png)
![alt text](./Assets/images/set-01/59.png)
![alt text](./Assets/images/set-01/60.png)
![alt text](./Assets/images/set-01/61.png)

let's generate the project using nest cli

```shell
nest new di

```

## 32 - Generating a Few Files

![alt text](./Assets/images/set-01/62.png)
![alt text](./Assets/images/set-01/63.png)

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
    supplyPower(watts:number) {
        console.log(`supplying ${watts} of power`)
    }
}
```

## 33 - Setting Up DI Between Modules

![alt text](./Assets/images/set-01/64.png)
![alt text](./Assets/images/set-01/65.png)
![alt text](./Assets/images/set-01/66.png)

let's add powerService to the app module as a export

```ts
import { PowerService } from './power.service';
@Module({
  providers: [PowerService],
  exports: [PowerService],
})
export class PowerModule {}

```

let's import the power module in the cpu module
```ts
import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import {PowerModule} from "../power/power.module";
@Module({
  providers: [CpuService],
  imports:[PowerModule]
})
export class CpuModule {}
```

let's add the cpu PowerService to the cpu service
```ts
import { Injectable } from '@nestjs/common';
import {PowerService} from "../power/power.service";
@Injectable()
export class CpuService {
    constructor(private powerService: PowerService) {}
}
```
## 34 - More on DI Between Modules
```ts
import { Module } from '@nestjs/common';
import { DiskService } from './disk.service';
import {PowerModule} from "../power/power.module";
@Module({
  providers: [DiskService],
  imports:[PowerModule]
})
export class DiskModule {
}
```
```ts
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
```
![alt text](./Assets/images/set-01/67.png)

## 35 - Consuming Multiple Modules
```ts

```
```ts

```
```ts

```
```ts

```
## 36 - Modules Wrapup


![alt text](./Assets/images/set-01/68.png)
![alt text](./Assets/images/set-01/69.png)
![alt text](./Assets/images/set-01/70.png)
![alt text](./Assets/images/set-01/71.png)
![alt text](./Assets/images/set-01/72.png)
![alt text](./Assets/images/set-01/73.png)
![alt text](./Assets/images/set-01/74.png)
![alt text](./Assets/images/set-01/75.png)
![alt text](./Assets/images/set-01/76.png)
![alt text](./Assets/images/set-01/77.png)
![alt text](./Assets/images/set-01/78.png)
![alt text](./Assets/images/set-01/79.png)
![alt text](./Assets/images/set-01/80.png)
![alt text](./Assets/images/set-01/81.png)
![alt text](./Assets/images/set-01/82.png)
![alt text](./Assets/images/set-01/83.png)
![alt text](./Assets/images/set-01/84.png)
![alt text](./Assets/images/set-01/85.png)
![alt text](./Assets/images/set-01/86.png)
![alt text](./Assets/images/set-01/87.png)
![alt text](./Assets/images/set-01/88.png)
![alt text](./Assets/images/set-01/89.png)
![alt text](./Assets/images/set-01/90.png)
![alt text](./Assets/images/set-01/91.png)
![alt text](./Assets/images/set-01/92.png)
![alt text](./Assets/images/set-01/93.png)
![alt text](./Assets/images/set-01/94.png)
![alt text](./Assets/images/set-01/95.png)
![alt text](./Assets/images/set-01/96.png)
![alt text](./Assets/images/set-01/97.png)
![alt text](./Assets/images/set-01/98.png)
![alt text](./Assets/images/set-01/99.png)
![alt text](./Assets/images/set-01/100.png)