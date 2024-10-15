import { auth } from "./firebaseAdmin";

export async function verifyToken(request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  const token = authHeader.split("Bearer ")[1];
  return await auth.verifyIdToken(token);
}

export function validateRating(rating) {
  const numRating = Number(rating);
  if (isNaN(numRating) || numRating < 1 || numRating > 5) {
    throw new Error("Rating must be a number between 1 and 5");
  }
  return numRating;
}
