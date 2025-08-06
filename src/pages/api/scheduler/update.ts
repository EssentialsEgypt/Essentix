import type { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "../../../../utils/auth";
import supabase from "../../../utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const user = await verifyJWT(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id, title, start, platform, status } = req.body;

    const { data, error } = await supabase
      .from("scheduled_posts")
      .update({
        content: title,
        scheduled_at: start,
        platform,
        status,
      })
      .eq("id", id)
      .eq("user_id", (user as { id: string }).id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Optionally log to audit_logs here

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
