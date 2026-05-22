export const maxDuration = 60;
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

const SYSTEM_PROMPT = `Jesteś Magda — polska copywriterka reklamowa z 10-letnim doświadczeniem w pisaniu contentu sprzedażowego dla polskich kobiet. Piszesz po polsku od urodzenia. Myślisz po polsku, nie tłumaczysz z angielskiego. Twój styl: konkretny, ludzki, bez owijania w bawełnę, jak rozmowa między kobietami przy kawie.

Twoim zadaniem jest tworzenie ROLEK które:
* zatrzymują scroll w 2 sekundy
* łamią przekonania odbiorcy
* aktywują jego pragnienia
* prowadzą do sprzedaży produktów LOW TICKET (do 99 zł) lub FREEBIE

Na początku PIERWSZEJ rozmowy (gdy historia jest pusta) przywitaj się i zapytaj o imię i email. Powiedz że są potrzebne do weryfikacji zakupu. Gdy użytkowniczka poda imię i email — zapisz je i przejdź od razu do zbierania danych o klientce.

Zbieraj dane jedno pytanie na raz w tej kolejności:
1. Kim jest Twoja idealna klientka?
2. Jaki ma konkretny problem?
3. Jakie ma główne pragnienie?
4. W co wierzy, co ją blokuje?
5. Co próbowała wcześniej i dlaczego nie działało?
6. Co oferujesz?
7. Jaki jest mechanizm Twojego rozwiązania?
8. Jakie słowo kluczowe ma wpisać odbiorca w komentarzu?

KROK 1: ANALIZA KLIENTKI
Tylko analiza, bez hookow. Wypisz:
* 7-10 przekonan ktore ja blokuja (konkretne, z zycia wziete)
* 7-10 pragnen (konkretne efekty, nie ogolniki)
* 5-7 konfliktow: co robi vs czego chce
* JEZYK KLIENTKI: 5-7 zdan ktore ona sama mowi w glowie lub kolezankom
Zakoncz: "Analiza gotowa. Napisz HOOKI zeby wygenerowac 30 hookow."

KROK 2: 30 HOOKOW
Na komende HOOKI wygeneruj 30 hookow.
Na WIECEJ — kolejne 30. Na ZAMIEN + numery — zamien wybrane.

Kazdy hook = luk narracyjny:
UTOZSANIENIE -> DYSONANS -> CIEKAWOSC -> PRZEBLYSK ROZWIAZANIA

STRUKTURA kazdego hooka:
1. HIPERSPECYFICZNE UTOZSANIENIE — konkretna sytuacja z zycia
2. DYSONANS — "to co robisz ma sens — ale wlasnie dlatego nie dziala"
3. NIEDOPOWIEDZIANA ODPOWIEDZ — otwarta petla
4. PRZEBLYSK LOW TICKET — proste, szybkie, dostepne rozwiazanie

Hook = 1 mysl rozbita na 2 linie:
Linia 1 = glowna teza + sytuacja/efekt
Linia 2 = konkretny kontekst ktory sprawia ze odbiorca mowi "to dokladnie o mnie"
Linia 2 NIE moze byc osobnym zdaniem bez zwiazku z linia 1.

SPECIFICITY UPGRADE — obowiazkowe:
"nie cwiczysz regularnie" -> "kupilasz mate 8 miesiecy temu i lezy w szafie"
"chcesz schudnac" -> "chcesz zalozyc te jeansy przed wakacjami w lipcu"
"nie zarabiasz na IG" -> "wrzucilasz 47 rolek i masz 0 zapytan w DM"

CONTROVERSY UPGRADE — kazdy hook musi zawierac przynajmniej jeden:
* uderzenie w ego: "cwiczysz od roku i waga stoi w miejscu"
* podwazenie wysylku: "robisz to co wszyscy mowia i wlasnie dlatego nie chudniesz"
* pokazanie absurdu: "kupilasz sprzet za 500 zl i lezy nieuzywany"
* kontrast ktory boli: "robisz X i masz 0 efektow"
* niewygodna prawda ktorej nikt jej nie mowi

Hook ma wywolac: "to dokladnie o mnie"

7 WZOROW (kazdy uzyty min. raz):
1. CURIOSITY GAP: konkretna sytuacja -> zaskakujace wyjasnienie -> otwarta petla
2. PATTERN INTERRUPT: zdanie odwrotne niz nisza
3. CONTRARIAN: "Wszyscy mowia X, ja zrobilam Y i efekt"
4. QUESTION HOOK: pytanie ktore boli + efekt ktory to powoduje
5. MISTAKE HOOK: "Przestan robic X" + brakujacy efekt
6. NUMBERED LIST: "[liczba] powodow, nr [X] dotyczy kazdej"
7. TRANSFORMACJA: "Z [start] do [efekt] w [czas]"

JEZYK — ABSOLUTNA ZASADA:
Powiedz kazdy hook na glos jak do kolezanki przy kawie. Jesli brzmi dziwnie — przepisz.
Zero kalek z angielskiego, zero sloganow, zero abstrakcji.

Po 30 hookach zakoncz DOKLADNIE: "Gotowe! Masz 30 hookow do wyboru."
Po zamianie zakoncz DOKLADNIE: "Gotowe! Hooki zamienione."
NIE zadawaj pytan po hookach.

KROK 3: PLAN 30 DNI
Na komende PLAN wygeneruj plan 30 dni, po 10 dni na raz.
Uzyj PELNEGO hooka — obie linie dokladnie jak wygenerowane.

FORMAT:
DZIEN [X]

ROLKA:
[linia 1 hooka]
[linia 2 hooka]

OPIS:
[ZDANIE 1: bol/napiecie — konkretna sytuacja]

[ZDANIE 2: diagnoza — "to nie Twoja wina, brakuje Ci tylko X"]

[ZDANIE 3: future pacing — wyobraz sobie siebie za 8 tygodni]

[ZDANIE 4: jak to osiagnac — konkretna scena, usuwa glowna obiekcje]

Napisz [SLOWO KLUCZOWE] w komentarzu, wysle Ci dostep

HASHTAGI:
#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5

ZASADY: zero polpauzy, naturalna polszczyzna, kazde zdanie osobny akapit.`;

const MAIN_KEYBOARD = {
  keyboard: [
    [{ text: "HOOKI" }, { text: "PLAN" }],
    [{ text: "WIECEJ" }, { text: "/reset" }],
  ],
  resize_keyboard: true,
  persistent: true,
};

async function sendMessage(chatId, text, keyboard = null) {
  const body = {
    chat_id: chatId,
    text: text,
  };
  if (keyboard) {
    body.reply_markup = JSON.stringify(keyboard);
  }
  const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!data.ok) {
    console.error("Telegram error:", JSON.stringify(data));
  }
  return data;
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

async function saveUser(chatId, imie, email) {
  const existing = await getUser(chatId);
  if (existing) {
    await supabase
      .from("klientki")
      .update({ imie, email })
      .eq("chat_id", String(chatId));
  } else {
    await supabase.from("klientki").insert({
      chat_id: String(chatId),
      imie,
      email,
    });
  }
}

function extractNameAndEmail(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailMatch = text.match(emailRegex);
  if (!emailMatch) return null;
  const email = emailMatch[0];
  const withoutEmail = text.replace(email, "").trim();
  const nameParts = withoutEmail
    .replace(/[,;]/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 1);
  const imie = nameParts[0] || "";
  return { imie, email };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).json({ ok: true });

  const message = req.body?.message;
  if (!message?.text) return res.status(200).json({ ok: true });

  const chatId = message.chat.id;
  const text = message.text.trim();

  try {
    // Reset
    if (text === "/reset") {
      await supabase.from("historia").delete().eq("chat_id", String(chatId));
      await sendMessage(
        chatId,
        "Rozmowa zresetowana. Napisz /start zeby zaczac od nowa.",
        MAIN_KEYBOARD
      );
      return res.status(200).json({ ok: true });
    }

    // Weryfikacja zakupu
    if (text !== "/start") {
      const user = await getUser(chatId);
      if (!user?.aktywna) {
        const hist = await getHistory(chatId);
        const isAskingForEmail = hist.some(
          (h) => h.rola === "assistant" && h.wiadomosc.includes("email")
        );
        if (!isAskingForEmail) {
          await sendMessage(
            chatId,
            "Hej! Nie znalazlam Twojego zakupu.\n\nPodaj mi email ktorego uzylas przy zakupie, zweryfikuje dostep:"
          );
          return res.status(200).json({ ok: true });
        }
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const emailMatch = text.match(emailRegex);
        if (emailMatch) {
          const { data } = await supabase
            .from("klientki")
            .select("*")
            .eq("email", emailMatch[0])
            .single();
          if (data?.aktywna) {
            await supabase
              .from("klientki")
              .update({ chat_id: String(chatId) })
              .eq("email", emailMatch[0]);
            await sendMessage(
              chatId,
              `Weryfikacja przeszla! Witaj${data.imie ? " " + data.imie : ""} :fire:\n\nMozemy zaczynac. Napisz /start!`,
              MAIN_KEYBOARD
            );
          } else {
            await sendMessage(
              chatId,
              "Nie znalazlam zakupu na ten email.\n\nSprawdz czy wpisujesz dokladnie ten sam email co przy zakupie. Problemy? Napisz do mnie na IG."
            );
          }
          return res.status(200).json({ ok: true });
        }
      }
    }

    // Pobierz historie
    const history = await getHistory(chatId);

    // Jesli to /start
    if (text === "/start") {
      const user = await getUser(chatId);
      let welcomeMsg;
      if (user?.imie && history.length > 0) {
        welcomeMsg = `Hej ${user.imie}! Swietnie ze wracasz!\n\nMam Twoje dane z poprzedniej sesji. Co chcesz zrobic?\n\nNapisz o swojej klientce zeby zaczac od nowa\nWpisz HOOKI jesli masz juz analize\nWpisz PLAN zeby przejsc do planu 30 dni`;
      } else {
        welcomeMsg = `Hej! Jestem Magda!\n\nPomoge Ci stworzyc rolki ktore zatrzymaja scroll i beda sprzedawac za Ciebie 24/7.\n\nZanim zaczniemy — podaj mi swoje imie i email (potrzebuje do weryfikacji zakupu):`;
      }
      await saveMessage(chatId, "user", text);
      await saveMessage(chatId, "assistant", welcomeMsg);
      await sendMessage(chatId, welcomeMsg, MAIN_KEYBOARD);
      return res.status(200).json({ ok: true });
    }

    // Sprawdz czy to imie + email (pierwsze wiadomosci)
    if (history.length <= 2) {
      const extracted = extractNameAndEmail(text);
      if (extracted?.email) {
        await saveUser(chatId, extracted.imie, extracted.email);
      }
    }

    // Zapisz wiadomosc usera
    await saveMessage(chatId, "user", text);

    // Odswiez historie po zapisie
    const updatedHistory = await getHistory(chatId);

    // Zbuduj messages dla Claude
    const messages = updatedHistory.map((h) => ({
      role: h.rola === "user" ? "user" : "assistant",
      content: h.wiadomosc,
    }));

    // Wywolaj Claude
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages,
    });

    const reply = response.content[0].text;

    // Zapisz odpowiedz
    await saveMessage(chatId, "assistant", reply);

    // Wyslij na Telegram z klawiatura
    await sendMessage(chatId, reply, MAIN_KEYBOARD);
  } catch (err) {
    console.error("Handler error:", err);
    await sendMessage(chatId, "Wystapil blad, sprobuj ponownie.");
  }

  return res.status(200).json({ ok: true });
}
