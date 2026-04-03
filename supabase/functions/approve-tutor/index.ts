import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY");
  const SUPABASE_URL = "https://dvyttjhheedvfqdyxfqr.supabase.co";

  if (!SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: "Missing SERVICE_ROLE_KEY" }), {
      status: 500,
    });
  }

  const payload = await req.json();
  const record = payload.record;
  const oldRecord = payload.old_record;

  // Only act when status changes to "approved"
  if (!record || record.status !== "approved") {
    return new Response(JSON.stringify({ skipped: true }), { status: 200 });
  }

  // Don't re-trigger if it was already approved before
  if (oldRecord && oldRecord.status === "approved") {
    return new Response(JSON.stringify({ skipped: "already approved" }), {
      status: 200,
    });
  }

  // Create a Supabase admin client
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Invite the tutor — creates an auth account and sends them
  // an email with a link to set their password
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(
    record.email,
    {
      data: {
        name: record.name,
        role: "tutor",
      },
    }
  );

  if (error) {
    console.error("Invite error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({ success: true, userId: data.user?.id }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
