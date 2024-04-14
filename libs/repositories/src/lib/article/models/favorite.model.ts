
import { RecordSchema, select } from 'cirql';
import { z } from 'zod';

// Define your Zod schemas
export const Favorite = RecordSchema.extend({
 
  article: z.string(),
  favoritedBy: z.string(),
 
  length: z.number(),
 
});


export type IFavorite = z.infer<typeof Favorite>