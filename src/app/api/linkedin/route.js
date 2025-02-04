import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function POST(req) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text content is required" },
        { status: 400 }
      );
    }

    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

    // First, get the LinkedIn member ID
    const profileResponse = await fetch(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );

    if (!profileResponse.ok) {
      throw new Error("Failed to fetch LinkedIn profile");
    }

    const profileData = await profileResponse.json();
    const memberId = profileData.sub; // LinkedIn's member ID

    // Create the post using member ID
    const postResponse = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
        "LinkedIn-Version": "202304",
      },
      body: JSON.stringify({
        author: `urn:li:person:${memberId}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text,
            },
            shareMediaCategory: "NONE",
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
      }),
    });

    if (!postResponse.ok) {
      const errorData = await postResponse.json();
      console.error("LinkedIn API Error:", errorData);
      throw new Error(errorData.message || "Failed to post to LinkedIn");
    }

    const result = await postResponse.json();

    return NextResponse.json({
      success: true,
      postId: result.id,
    });
  } catch (error) {
    console.error("LinkedIn posting error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to post to LinkedIn",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
