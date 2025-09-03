import {z} from "zod";

export const signupSchema= z.object({
    username:z
    .string()
    .min(3,{message:"Should be more then 3 characters"})
    .regex(/^\S*$/,{message : "Spaces are not allowed in user name"})
    .max(12,{message:"only 10 chars are allowed"}),
    password:z
    .string()
    .min(3,{message:"3 se zyada"})
     .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least 1 special character",
    })
    .refine((val)=>[...val].some(char => char >= 'A' && char <= 'Z'),{
      message : "Must include at least one capital letter"
    })
})

export const signinSchema =z.object({
    username:z
    .string(),
    password:z
    .string()
})

export const shareSchema=z.object({
  share:z.boolean,
})

export const searchSchema = z.object({
  query: z.string().min(1, { message: "Search query is required" })
});
