import { COURSE_STATUSES } from "@/lib/constants";
import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";


export interface IEnrollment extends Document {
  course_id: ObjectId;
  student_id: ObjectId;
  status: (typeof COURSE_STATUSES)[number];
  section: number;
}

type EnrollmentModel = Model<IEnrollment>;

const enrollmentSchema = new Schema<IEnrollment, EnrollmentModel>({
  course_id: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  student_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true  
  },
  status: {
    type: String,
    required: true,
    enum: COURSE_STATUSES,
    default: "enrolled"
  },
  section:{
    type: Number,
    required: true,
    default: 1
  }
})

const Enrollment: EnrollmentModel = mongoose.models.Enrollment ?? mongoose.model<EnrollmentModel>('Enrollment', enrollmentSchema, 'enrollments');

export { Enrollment }