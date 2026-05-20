import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

const SYSTEM_PROMPT = `Jesteś ekspertem od marketingu, psychologii sprzedaży i viralowego contentu na Instagramie.
Twoim zadaniem jest tworzenie ROLEK, KTÓRE:
* zatrzymują scroll w 2 sekundy
* łamią przekonania odbiorcy
* aktywują jego pragnienia
* prowadzą do sprzedaży produktów cyfrowych LOW TICKET (do 99 zł) lub zapisu na FREEBIE

Na początku pierwszej rozmowy zapytaj o imię i email użytkowniczki (potrzebne do weryfikacji zakupu).

Zbieraj dane jedno pytanie na raz w tej kolejności:
1. Kim jest Twoja idealna klientka?
2. Jaki ma konkretny problem?
3. Jakie ma główne pragnienie?
4. W co wierzy, co ją blokuje?
5. Co próbowała wcześniej i dlaczego nie działało?
6. Co oferujesz?
7. Jaki jest mechanizm Twojego rozwiązania?
8. Jakie słowo kluczowe ma wpisać odbiorca w komentarzu?

Gdy masz wszystkie dane — zrób analizę, potem na komendę HOOKI wygeneruj 30 hooków.
Na WIĘCEJ — kolejne 30. Na ZAMIEŃ + numery — zamień. Na PLAN — plan 30 dni po 10.
Język naturalny polski, zero kalek z angielskiego, zero półpauz.`;

async function sendMessage(chatId, text) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown",
    }),
  });
}

async function getHistory(chatId) {
  const { data } = await supabase
    .from("historia")
    .select("rola, wiadomosc")
    .eq("chat_id", String(chatId))
    .order("created_at", { ascending: true })
    .limit(30);
  return data || [];
}

async function saveMessage(chatId, rola, wiadomosc) {
  await supabase.from("historia").insert({
    chat_id: String(chatId),
    rola,
    wiadomosc,
  });
}

async function getUser(chatId) {
  const { data } = await supabase
    .from("klientki")
    .select("*")
    .eq("chat_id", String(chatId))
    .single();
  return data;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).json({ ok: true });

  const message = req.body?.message;
  if (!message?.text) return res.status(200).json({ ok: true });

  const chatId = message.chat.id;
  const text = message.text;

  try {
    // Zapisz wiadomość usera
    await saveMessage(chatId, "user", text);

    // Pobierz historię
    const history = await getHistory(chatId);

    // Zbuduj messages dla Claude
    const messages = history.map((h) => ({
      role: h.rola === "user" ? "user" : "assistant",
      content: h.wiadomosc,
    }));

    // Wywołaj Claude
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages,
    });

    const reply = response.content[0].text;

    // Zapisz odpowiedź
    await saveMessage(chatId, "assistant", reply);

    // Wyślij na Telegram
    await sendMessage(chatId, reply);
  } catch (err) {
    console.error(err);
    await sendMessage(chatId, "Wystąpił błąd, spróbuj ponownie.");
  }

  return res.status(200).json({ ok: true });
}
