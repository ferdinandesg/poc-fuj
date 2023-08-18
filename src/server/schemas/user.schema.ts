import { z } from "zod";


export const userSchema = z.object({
    name: z.string(),
    phone: z.string().optional(),
    document: z.string().length(11).optional(),
    addressId: z.string().optional()
})

export type UserSchema = z.infer<typeof userSchema>
