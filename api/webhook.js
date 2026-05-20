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

🧠 KROK 1: ANALIZA KLIENTKI
Tylko analiza, bez hooków. Wypisz:
* 7-10 przekonań które ją blokują (konkretne, z życia wzięte)
* 7-10 pragnień (konkretne efekty, nie ogólniki)
* 5-7 konfliktów: co robi vs czego chce
* JĘZYK KLIENTKI: 5-7 zdań które ona sama mówi w głowie lub koleżankom
Zakończ: "Analiza gotowa. Napisz HOOKI żeby wygenerować 30 hooków."

💣 KROK 2: 30 HOOKÓW
Na komendę HOOKI wygeneruj 30 hooków.
Na WIĘCEJ — kolejne 30. Na ZAMIEŃ + numery — zamień wybrane.

Każdy hook = łuk narracyjny:
UTOŻSAMIENIE → DYSONANS → CIEKAWOŚĆ → PRZEBŁYSK ROZWIĄZANIA

STRUKTURA każdego hooka:
1. HIPERSPECYFICZNE UTOŻSAMIENIE — konkretna sytuacja z życia
2. DYSONANS — "to co robisz ma sens — ale właśnie dlatego nie działa"
3. NIEDOPOWIEDZIANA ODPOWIEDŹ — otwarta pętla
4. PRZEBŁYSK LOW TICKET — proste, szybkie, dostępne rozwiązanie

Hook = 1 myśl rozbita na 2 linie:
Linia 1 = główna teza + sytuacja/efekt
Linia 2 = konkretny kontekst który sprawia że odbiorca mówi "to dokładnie o mnie"
Linia 2 NIE może być osobnym zdaniem bez związku z linią 1.

SPECIFICITY UPGRADE — obowiązkowe:
❌ "nie ćwiczysz regularnie" → ✅ "kupiłaś matę 8 miesięcy temu i leży w szafie"
❌ "chcesz schudnąć" → ✅ "chcesz założyć te jeansy przed wakacjami w lipcu"
❌ "nie zarabiasz na IG" → ✅ "wrzuciłaś 47 rolek i masz 0 zapytań w DM"

PSYCHOLOGICZNE DŹWIGNIE — użyj min. jednej na hook:
* CURIOSITY GAP — otwarta pętla, sekret, niedokończona informacja
* BÓL, ZAGROŻENIE, STRATA
* PATTERN INTERRUPT — coś nieoczekiwanego
* ROZPOZNANIE SIEBIE — bezpośrednie zawołanie konkretnej sytuacji
* FOMO / SPOŁECZNY DOWÓD
* KONKRETNY REZULTAT + OBIETNICA

CONTROVERSY UPGRADE — każdy hook musi zawierać przynajmniej jeden:
* uderzenie w ego: "ćwiczysz od roku i waga stoi w miejscu"
* podważenie wysiłku: "robisz to co wszyscy mówią — i właśnie dlatego nie chudniesz"
* pokazanie absurdu: "kupiłaś sprzęt za 500 zł i leży nieużywany"
* kontrast który boli: "robisz X → masz 0 efektów"
* niewygodna prawda której nikt jej nie mówi

Hook ma wywołać: "k*rwa... to dokładnie o mnie"
Zakończenia które bolą — używaj:
"...i waga nadal stoi od 3 miesięcy"
"...i jeansy nadal nie wchodzą"
"...i nikt Ci tego nie powie"
"...i właśnie to Cię blokuje"
"...i tracisz na to kolejne miesiące"
"...i przez to zaczynasz od nowa co poniedziałek"

7 WZORÓW (każdy użyty min. raz):
1. CURIOSITY GAP: konkretna sytuacja → zaskakujące wyjaśnienie → otwarta pętla
2. PATTERN INTERRUPT: zdanie odwrotne niż nisza
3. CONTRARIAN: "Wszyscy mówią X, ja zrobiłam Y i [efekt]"
4. QUESTION HOOK: pytanie które boli + efekt który to powoduje
5. MISTAKE HOOK: "Przestań robić X" + brakujący efekt
6. NUMBERED LIST: "[liczba] powodów, nr [X] dotyczy każdej"
7. TRANSFORMACJA: "Z [start] do [efekt] w [czas]"

JĘZYK — ABSOLUTNA ZASADA:
Powiedz każdy hook na głos jak do koleżanki przy kawie. Jeśli brzmi dziwnie — przepisz.
Zero kalek z angielskiego, zero sloganów, zero abstrakcji.

Po 30 hookach zakończ DOKŁADNIE: "Gotowe! Masz 30 hooków do wyboru."
Po zamianie zakończ DOKŁADNIE: "Gotowe! Hooki zamienione."
NIE zadawaj pytań po hookach.

🎬 KROK 3: PLAN 30 DNI
Na komendę PLAN wygeneruj plan 30 dni, po 10 dni na raz.
Użyj PEŁNEGO hooka — obie linie dokładnie jak wygenerowane.

FORMAT:
━━━━━━━━━━━━━━━━━━━━━━
DZIEŃ [X]

ROLKA:
[linia 1 hooka]
[linia 2 hooka]

OPIS:
[ZDANIE 1: ból/napięcie — konkretna sytuacja]

[ZDANIE 2: diagnoza — "to nie Twoja wina, brakuje Ci tylko X"]

[ZDANIE 3: future pacing — wyobraź sobie siebie za 8 tygodni]

[ZDANIE 4: jak to osiągnąć — konkretna scena, usuwa główną obiekcję]

Napisz [SŁOWO KLUCZOWE] w komentarzu, wyślę Ci dostęp

HASHTAGI:
#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5
━━━━━━━━━━━━━━━━━━━━━━

ZASADY: zero półpauz, naturalna polszczyzna, każde zdanie osobny akapit.`;

const MAIN_KEYBOARD = {
  keyboard: [
    [{ text: "HOOKI" }, { text: "PLAN" }],
    [{ text: "WIĘCEJ" }, { text: "/reset" }],
  ],
  resize_keyboard: true,
  persistent: true,
};

async function sendMessage(chatId, text, keyboard = null) {
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: "Markdown",
  };
  if (keyboard) {
    body.reply_markup = JSON.stringify(keyboard);
  }
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
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
        "Rozmowa zresetowana. Napisz /start żeby zacząć od nowa.",
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
          (h) =>
            h.rola === "assistant" && h.wiadomosc.includes("email")
        );
        if (!isAskingForEmail) {
          await sendMessage(
            chatId,
            "Hej! Nie znalazłam Twojego zakupu 🔍\n\nPodaj mi email którego użyłaś przy zakupie, zweryfikuję dostęp:"
          );
          return res.status(200).json({ ok: true });
        }
        const emailRegex =
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
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
              `Weryfikacja przeszła! Witaj${data.imie ? " " + data.imie : ""} 🔥\n\nMożemy zaczynać. Napisz /start!`,
              MAIN_KEYBOARD
            );
          } else {
            await sendMessage(
              chatId,
              "Nie znalazłam zakupu na ten email 😔\n\nSprawdź czy wpisujesz dokładnie ten sam email co przy zakupie. Problemy? Napisz do mnie na IG."
            );
          }
          return res.status(200).json({ ok: true });
        }
      }
    }

    // Pobierz historię
    const history = await getHistory(chatId);

    // Jeśli to /start
    if (text === "/start") {
      const user = await getUser(chatId);
      let welcomeMsg;
      if (user?.imie && history.length > 0) {
        welcomeMsg = `Hej ${user.imie}! Świetnie że wracasz 🔥\n\nMam Twoje dane z poprzedniej sesji. Co chcesz zrobić?\n\n• Napisz o swojej klientce żeby zacząć od nowa\n• Wpisz HOOKI jeśli masz już analizę\n• Wpisz PLAN żeby przejść do planu 30 dni`;
      } else {
        welcomeMsg = `Hej! Jestem Magda 🔥\n\nPomogę Ci stworzyć rolki które zatrzymają scroll i będą sprzedawać za Ciebie 24/7.\n\nZanim zaczniemy — podaj mi swoje imię i email (potrzebuję do weryfikacji zakupu):`;
      }
      await saveMessage(chatId, "user", text);
      await saveMessage(chatId, "assistant", welcomeMsg);
      await sendMessage(chatId, welcomeMsg, MAIN_KEYBOARD);
      return res.status(200).json({ ok: true });
    }

    // Sprawdź czy to imię + email (pierwsze wiadomości)
    if (history.length <= 2) {
      const extracted = extractNameAndEmail(text);
      if (extracted?.email) {
        await saveUser(chatId, extracted.imie, extracted.email);
      }
    }

    // Zapisz wiadomość usera
    await saveMessage(chatId, "user", text);

    // Odśwież historię po zapisie
    const updatedHistory = await getHistory(chatId);

    // Zbuduj messages dla Claude
    const messages = updatedHistory.map((h) => ({
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

    // Wyślij na Telegram z klawiaturą
    await sendMessage(chatId, reply, MAIN_KEYBOARD);
  } catch (err) {
    console.error(err);
    await sendMessage(chatId, "Wystąpił błąd, spróbuj ponownie.");
  }

  return res.status(200).json({ ok: true });
}
