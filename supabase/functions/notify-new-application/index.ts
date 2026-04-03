import "@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL");

  if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
    return new Response(JSON.stringify({ error: "Missing secrets" }), {
      status: 500,
    });
  }

  const payload = await req.json();

  // The webhook sends the new row inside `record`
  const record = payload.record ?? payload;
  const name = record.name ?? "Unknown";
  const email = record.email ?? "Unknown";
  const subjects = (record.subjects ?? []).join(", ");
  const location = record.location ?? "Unknown";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Kenna <onboarding@resend.dev>",
      to: [NOTIFY_EMAIL],
      subject: `New tutor application: ${name}`,
      html: `
        <h2>New tutor application received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Subjects:</strong> ${subjects}</p>
        <p>Review it in your <a href="https://supabase.com/dashboard">Supabase dashboard</a>.</p>
      `,
    }),
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.ok ? 200 : 500,
    headers: { "Content-Type": "application/json" },
  });
});
