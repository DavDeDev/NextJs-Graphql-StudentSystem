import { ICourse } from '@/models/course.model';
import { HydratedDocument } from 'mongoose';
import z from 'zod';

export const CourseSchema = z.object({
  course_code: z.string().min(1),
  course_name: z.string().min(1),
  course_description: z.string().optional(),
  capacity: z.number().optional(),
})