export * from './lib/article/models/comment.model';
export * from './lib/article/models/favorite.model';
export * from './lib/article/models/feed.model';
export * from './lib/article/models/tag.model';

export * from './lib/article/services/comment.service';
export * from './lib/article/services/favorite.service';
export * from './lib/article/services/feed.service';
export * from './lib/article/services/tag.service';

export * from './lib/article/comment.repository';
export * from './lib/article/favorite.repository';
export * from './lib/article/feed.repository';
export * from './lib/article/tag.repository';

export * from './lib/auth/models/user.model';

export * from './lib/auth/services/user.service';

export * from './lib/auth/user.repository';

export * from './lib/profile/models/follower.model';
export * from './lib/profile/models/profile.model';

export * from './lib/profile/services/profile.service';
export * from './lib/profile/services/follower.service';

export * from './lib/profile/follower.repository';
export * from './lib/profile/profile.repository';
export * from './lib/service/database.service';


// import { Client, mapping, auth, DseClientOptions } from 'cassandra-driver';
// import { User } from './lib/auth/models/user.model';



// main();
//   async function main () {
//     console.log("starting");
//     // const client = new Client({
//   //     contactPoints: ["node-0.aws-ap-south-1.4fdb6e03bd8ae24fe1e7.clusters.scylla.cloud", "node-1.aws-ap-south-1.4fdb6e03bd8ae24fe1e7.clusters.scylla.cloud", "node-2.aws-ap-south-1.4fdb6e03bd8ae24fe1e7.clusters.scylla.cloud"],
//   //     keyspace: 'flock',
//   //     localDataCenter: 'AWS_AP_SOUTH_1',
      
//   //     credentials: {
//   //       username: "scylla",
//   //       password: "cAdosh4XOT9qR7x"  },

        
//   // });

//   const client = new Client({
//     contactPoints: ['127.0.0.1'],
//     keyspace: 'flock',
//     localDataCenter: 'datacenter1',
// });
  
//     const mappingOptions: mapping.MappingOptions = {
//       models: {
//         'User': {
//           tables: ['users'],
//           mappings: new mapping.UnderscoreCqlToCamelCaseMappings
//         }
//       }
//     }
    
  
//     var userMapper: mapping.ModelMapper<User> =  new mapping.Mapper(client, mappingOptions).forModel('User');
//     var user:User = new User();
//      user.email = 'wakanda';
//      user.password = 'puppy';
//      user.username = 'nakama';
//      user.tocken = 'locklock';
  
//      let usercreate = await userMapper.insert(user);
//     let ulist = (await userMapper.findAll()).toArray();
    
//   };