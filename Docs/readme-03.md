
#  Nest Architecture Services and Repositories

## 21 - Services and Repositories

![alt text](./Assets/images/set-01/39.png)
![alt text](./Assets/images/set-01/40.png)
![alt text](./Assets/images/set-01/41.png)
## 22 - Implementing a Repository

\src\messages\message.repository.ts
```ts
import { readFile } from 'fs/promises';
export class MessageRepository {
  // 1. Add a create() method to the repository
  async create(message: string) {}
  // 2. Add a find() method to the repository
  async find() {}
  // 3. Add a findOne() method to the repository
  async findOne(id: string) {
    console.log(id);
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages[id];
  }
}
```
## 23 - Reading and Writing to a Storage File
## 24 - Implementing a Service
## 25 - Manual Testing of the Controller
## 26 - Reporting Errors with Exceptions
## 27 - Understanding Inversion of Control
## 28 - Introduction to Dependency Injection
## 29 - Refactoring to Use Dependency Injection
## 30 - Few More Notes on DI

![alt text](./Assets/images/set-01/42.png)
![alt text](./Assets/images/set-01/43.png)
![alt text](./Assets/images/set-01/44.png)
![alt text](./Assets/images/set-01/45.png)
![alt text](./Assets/images/set-01/46.png)
![alt text](./Assets/images/set-01/47.png)
![alt text](./Assets/images/set-01/48.png)
![alt text](./Assets/images/set-01/49.png)
![alt text](./Assets/images/set-01/50.png)
![alt text](./Assets/images/set-01/51.png)
![alt text](./Assets/images/set-01/52.png)
![alt text](./Assets/images/set-01/53.png)
![alt text](./Assets/images/set-01/54.png)
![alt text](./Assets/images/set-01/55.png)
![alt text](./Assets/images/set-01/56.png)
![alt text](./Assets/images/set-01/57.png)
![alt text](./Assets/images/set-01/58.png)
![alt text](./Assets/images/set-01/59.png)
![alt text](./Assets/images/set-01/60.png)
![alt text](./Assets/images/set-01/61.png)
![alt text](./Assets/images/set-01/62.png)
![alt text](./Assets/images/set-01/63.png)
![alt text](./Assets/images/set-01/64.png)
![alt text](./Assets/images/set-01/65.png)
![alt text](./Assets/images/set-01/66.png)
![alt text](./Assets/images/set-01/67.png)
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