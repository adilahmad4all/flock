import { Injectable } from '@nestjs/common';


import { Cirql } from 'cirql';
import { LegacyCirqlStateful } from 'cirql';



@Injectable()
export class SurrealService {

  client;

  
  onModuleInit() {

    this.createClient();
  }

  private async createClient() {
   

    this.client =  new LegacyCirqlStateful({
      connection: {
          endpoint: 'http://localhost:8000/',
          namespace: 'test',
          database: 'test',
      },
      credentials: {
          user: 'root',
          pass: 'root',
      }
  });
    

// await this.client.handle.connect('http://localhost:8000/');
// await this.client.handle.signin({
//     namespace: 'test',
//     database: 'test',
//     username: 'root',
//     password: 'root',
// });
    
  }


}
