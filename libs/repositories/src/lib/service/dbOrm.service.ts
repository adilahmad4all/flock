import { Injectable } from "@nestjs/common";
import * as ExpressCassandra from "express-cassandra";
import { ConfigService } from "@nestjs/config";
import { ClientOptions, types } from "cassandra-driver";

@Injectable()
export class DbOrmService {
  public client: any;

  constructor(private configService: ConfigService) {
    this.client = ExpressCassandra.createClient({
      clientOptions: {
        contactPoints: [
          this.configService.get<string>("SCYLLA_CONTACT_POINTS"),
        ],
        localDataCenter: this.configService.get<string>("SCYLLA_DATA_CENTER"),
        protocolOptions: { port: 9042 },
        keyspace: "flock",
        // queryOptions: {consistency: ExpressCassandra.consistencies.one},
        socketOptions: { readTimeout: 60000 },
      },
      ormOptions: {
        defaultReplicationStrategy: {
          class: "SimpleStrategy",
          replication_factor: 1,
        },
        migration: "safe",
      },
    } as ClientOptions);
  }
}
