import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vote from "@/models/Vote";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate request
    if (!body.candidate_Name || !body.candidate_Id || !body.category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new vote
    const vote = await Vote.create({
      candidate_Name: body.candidate_Name,
      candidate_Id: body.candidate_Id,
      category: body.category,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Vote recorded successfully",
        data: vote,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Voting error:", error);

    // Handle duplicate vote error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Vote already recorded for this candidate in this category",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to record vote",
      },
      { status: 500 }
    );
  }
}

// Get vote counts
export async function GET() {
  try {
    await connectDB();

    const votes = await Vote.aggregate([
      {
        $group: {
          _id: {
            category: "$category",
            candidate_Id: "$candidate_Id",
            candidate_Name: "$candidate_Name",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    return NextResponse.json({
      success: true,
      data: votes,
    });
  } catch (error) {
    console.error("Error fetching votes:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch votes",
      },
      { status: 500 }
    );
  }
}
