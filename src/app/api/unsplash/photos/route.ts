import { NextResponse } from "next/server";
import { SearchPhotosResponse } from "@/types/unsplash-results";
// import { unsplashResults } from "@/data/unsplash-results";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 },
    );
  }

  const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(query)}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

  try {
    const response = await fetch(url);
    const data: SearchPhotosResponse = await response.json();
    // console.log("unsplash: ", data);

    // !---- return mock data for test ---->
    // return NextResponse.json(unsplashResults);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Unsplash photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 },
    );
  }
}
