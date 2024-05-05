import { Injectable } from '@nestjs/common';
import { Client, mapping, auth } from 'cassandra-driver';

@Injectable()
export class CassandraService {

  client: Client;
  mapper: mapping.Mapper;

  private createClient() {
    // Local Connection
    this.client = new Client({
      contactPoints: ["node-0.aws-ap-south-1.4fdb6e03bd8ae24fe1e7.clusters.scylla.cloud", "node-1.aws-ap-south-1.4fdb6e03bd8ae24fe1e7.clusters.scylla.cloud", "node-2.aws-ap-south-1.4fdb6e03bd8ae24fe1e7.clusters.scylla.cloud"],
      keyspace: 'mykeyspace',
      localDataCenter: 'AWS_AP_SOUTH_1',
      
      credentials: {
        username: "scylla",
        password: "cAdosh4XOT9qR7x"  },
       
     
    });

    // Astra connection
    // this.client = new Client({
    //   // cloud: {
    //   //   secureConnectBundle: "./secure-connect-my-database.zip",
    //   // },
    //   // credentials: {
    //   //   username: "AkiBmOqyoSFKPmgtHidMfPgB",
    //   //   password: ",Zerz,3jAZ563XT92TpSl3wOZr,I5nlp_H6Fh,oGf4xhchLjgy0g+YqfFwQ,5PZMtbWEL1E9zThZy+oq9RFo8HlH-SACBGgp9y5F0_R55ONAZHYZh.UNcKYmMjk4ha0g",
    //   // },
    //   keyspace: "flock"
    // });
  }

  createMapper(mappingOptions: mapping.MappingOptions) {
    if (this.client == undefined) {
      this.createClient();
    }
    return new mapping.Mapper(this.client, mappingOptions);
  }
}