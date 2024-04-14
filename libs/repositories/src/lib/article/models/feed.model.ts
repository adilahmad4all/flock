
import { RecordSchema, select } from 'cirql';
import { z } from 'zod';

// Define your Zod schemas
export const Feed = RecordSchema.extend({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
   body: z.string(),
   tags: z.string(),
   author: z.string(),
   created_at: z.string(),
   updated_at: z.string(),
 
});


export type IFeed = z.infer<typeof Feed>