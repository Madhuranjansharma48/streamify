
import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("Stream API key or Secret is missing. Please check your environment variables.");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export async function upsertStreamUser(userData) {
  if (!userData || !userData.id) {
    throw new Error("Invalid user data provided to upsertStreamUser.");
  }
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    throw new Error(`Error upserting Stream user: ${error.message}`);
  }
}

export function generateStreamToken(userId) {
  if (!userId) {
    throw new Error("User ID is required to generate a Stream token.");
  }
  try {
    return streamClient.createToken(String(userId));
  } catch (error) {
    throw new Error(`Error generating Stream token: ${error.message}`);
  }
}
