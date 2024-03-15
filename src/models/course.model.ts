import mongoose, { Document, Model, Schema } from "mongoose";


export interface ICourse extends Document {
  course_name: string;
  course_code: string;
  course_description?: string;
  capacity?: number;
}

type CourseModel = Model<ICourse>;

const courseSchema = new Schema<ICourse, CourseModel>({
  course_name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  course_code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  course_description: {
    type: String,
    required: false
  },
  
})

const Course: CourseModel = mongoose.models.Course ?? mongoose.model<CourseModel>('Course', courseSchema, 'courses');

export { Course };