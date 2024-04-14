import { RecordSchema, select } from 'cirql';
import { z } from 'zod';

// Define your Zod schemas
export const Comment = RecordSchema.extend({
  id: z.string(),
  article: z.string(),
  author: z.string(),
 
  body: z.string(),
  created_at: z.string(),
});


export type IComment = z.infer<typeof Comment>