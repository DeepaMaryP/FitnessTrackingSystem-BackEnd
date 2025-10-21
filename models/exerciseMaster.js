import mongoose, { Schema, model } from "mongoose";

const exerciseMasterSchema = new Schema({
  name: { type: String, required: true },             // e.g., "Push Ups"
  description: { type: String },
  exercise_type: {                                   // broad classification
    type: String,
    enum: ["Strength", "Cardio", "HIIT", "Yoga", "Flexibility", "Mixed"],
    default: "Strength"
  },
  difficulty_level: {                               // suitable level
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },
  met: { type: Number, required: true },             // scientific MET value
  default_duration_min: { type: Number, default: 10 },
  rest_sec: { type: Number, default: 60 },
  media_url: { type: String },                      // optional (image/video demo)
}, { timestamps: true });

const ExerciseMaster = model("exerciseMaster", exerciseMasterSchema);
export default ExerciseMaster;
