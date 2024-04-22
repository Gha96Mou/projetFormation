import { z } from 'zod';




const productSchema = z.object({ // Define the Zod schema
  code: z.string().trim().min(1), // Enforce non-empty string for code
  libelle: z.string().trim().min(1), // Enforce non-empty string for libelle
  commentaires: z.string().optional(), // Optional commentaires field (can be empty string)
});


export default productSchema;
