import {z} from 'zod'
export const memberEditSchema = z.object({
    name:z.string().min(1,{
        message: 'Name is required'
    })
})

export type MemberEditSchema=z.infer<typeof memberEditSchema>