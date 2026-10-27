// Supabase Edge Function (Deno runtime)
// Deploy with: supabase functions deploy hello-world
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req: Request) => {
  const { name } = await req.json().catch(() => ({ name: "World" }));

  return new Response(
    JSON.stringify({ message: `Hello ${name}!` }),
    { headers: { "Content-Type": "application/json" } },
  );
});
