import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    candidate_Name: {
      type: String,
      required: true,
    },
    candidate_Id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Mr. Farewell", "Miss Farewell"],
      required: true,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields automatically
    collection: "Voting_Status", // Specify the collection name
  }
);

// Prevent duplicate votes for the same candidate in the same category
voteSchema.index({ candidate_Id: 1, category: 1 }, { unique: true });

export default mongoose.models.Vote || mongoose.model("Vote", voteSchema);
