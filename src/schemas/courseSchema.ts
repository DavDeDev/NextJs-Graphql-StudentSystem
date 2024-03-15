import { ICourse } from '@/models/course.model';
import { HydratedDocument } from 'mongoose';
import z from 'zod';

export const CourseSchema = z.object({
  course_code: z.string().regex(
    /^[A-Za-z]{4}[0-9]{3}$/,
    "Course code must consist of 4 letters followed by 3 numbers"
  ),
  course_name: z.string().max(20),
  course_description: z.string().optional(),
  capacity: z.coerce.number().gte(1, "At least one student").lte(20, "Exceeded max capacity").optional(),
})