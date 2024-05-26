import { Injectable } from '@nestjs/common';
import * as ExpressCassandra  from 'express-cassandra';


@Injectable()
export class DbOrmService {

  public client:any;
constructor() {
  this.client = ExpressCassandra.createClient({
    clientOptions: {
        contactPoints: ['127.0.0.1'],
        localDataCenter: 'datacenter1',
        protocolOptions: { port: 9042 },
        keyspace: 'flock',
        // queryOptions: {consistency: ExpressCassandra.consistencies.one},
        socketOptions: { readTimeout: 60000 },
    },
    ormOptions: {
        defaultReplicationStrategy : {
            class: 'SimpleStrategy',
            replication_factor: 1
        },
        migration: 'safe',
    }
});
}



 

}