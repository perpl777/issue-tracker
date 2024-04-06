import { z } from "zod";

// Раньше мы называли объект для валидации schema, но в больших
// проектах у нас может быть множество схем для разных задач.
// Поэтому назовем ее более осмысленно.
export const createIssueSchema = z.object({
  title: z.string({ required_error: 'title is required' }).min(1, 'title must contain at least 1 symbol').max(255),
  description: z.string({ required_error: 'description is required' }).min(1, 'description must contain at least 1 symbol')
});


export type IssueForm = z.infer<typeof createIssueSchema>;