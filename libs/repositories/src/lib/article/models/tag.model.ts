
import { RecordSchema, select } from 'cirql';
import { z } from 'zod';

// Define your Zod schemas
export const Tag = RecordSchema.extend({
 
  name: z.string(),
  count: z.number(),
 
});


export type ITag = z.infer<typeof Tag>