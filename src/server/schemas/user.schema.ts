import { z } from "zod";


export const userSchema = z.object({
    name: z.string(),
    phone: z.string(),
    document: z.string().length(11),
    addressId: z.string()
})

export type UserSchema = z.infer<typeof userSchema>
