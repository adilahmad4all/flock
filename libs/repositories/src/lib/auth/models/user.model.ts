// export class User {
//   email: string;
//   username: string;
//   password?: string;
//   bio?: string;
//   image?: string;
//   token?: string;
// }

import { RecordSchema, select } from 'cirql';
import { z } from 'zod';

// Define your Zod schemas
export const User = RecordSchema.extend({
  username: z.string(),
  email:z.string(),
  password: z.string(),
  bio: z.string().optional(),
 
  image: z.string().optional(),
  token: z.string().optional(),
});


export type IUser = z.infer<typeof User>