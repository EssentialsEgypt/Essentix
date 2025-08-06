import type { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "../../../../utils/auth";
import supabase from "../../../utils/supabaseClient";

type ScheduledPost = {
  id: string;
  user_id: string;
  content: string;
  scheduled_at: string;
  platform: string;
  status: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const user = await verifyJWT(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.body;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'id' in request body" });
    }

    const { data, error } = await supabase
      .from("scheduled_posts")
      .delete()
      .eq("id", id)
      .eq("user_id", (user as { id: string }).id);

    if (error) {
      console.error("Supabase delete error:", error);
      return res.status(500).json({ error: error.message });
    }

    const deletedData = data as ScheduledPost[] | null;

    if (!deletedData || deletedData.length === 0) {
      return res.status(404).json({ error: "Scheduled post not found or already deleted" });
    }

    // Optionally log to audit_logs here

    return res.status(200).json({ message: "Scheduled post deleted successfully", deleted: deletedData });
  } catch (error) {
    console.error("Internal server error in delete handler:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
