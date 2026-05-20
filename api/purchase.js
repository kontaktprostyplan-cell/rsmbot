import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).json({ ok: true });

  try {
    const body = req.body;
    console.log("EasyTools webhook:", JSON.stringify(body));

    const email =
      body?.email ||
      body?.customer?.email ||
      body?.order?.email ||
      body?.buyer_email;

    const imie =
      body?.name ||
      body?.customer?.name ||
      body?.first_name ||
      body?.buyer_name ||
      "";

    if (!email) {
      return res.status(400).json({ error: "No email found" });
    }

    const { data: existing } = await supabase
      .from("klientki")
      .select("*")
      .eq("email", email)
      .single();

    if (existing) {
      await supabase
        .from("klientki")
        .update({ aktywna: true, imie: imie || existing.imie })
        .eq("email", email);
    } else {
      await supabase.from("klientki").insert({
        email,
        imie,
        aktywna: true,
      });
    }

    console.log(`Zakup aktywowany: ${email}`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
