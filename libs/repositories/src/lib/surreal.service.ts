import { Injectable } from '@nestjs/common';


import { Cirql } from 'cirql';



@Injectable()
export class SurrealService {

  client: Cirql;


  onModuleInit() {

    this.createClient();
  }

  private async createClient() {
   

    this.client = new Cirql();
    

await this.client.handle.connect('http://localhost:8000/');
await this.client.handle.signin({
    namespace: 'test',
    database: 'test',
    username: 'root',
    password: 'root',
});
    
  }


}
