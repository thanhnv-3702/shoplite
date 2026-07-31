import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập họ tên"),
  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập email")
    .email("Email không hợp lệ"),
  message: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập nội dung")
    .min(10, "Nội dung tối thiểu 10 ký tự"),
});

export type ContactValues = z.infer<typeof contactSchema>;
