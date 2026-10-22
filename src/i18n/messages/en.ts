import type { Messages } from "../types";
const en: Messages = {
  meta: {
    title: "Yâren — Every cup, a story shared.",
    description:
      "The warmth of Turkish coffee, the character of espresso, the calm of filter coffee. Find your cup and share its story in the Yâren courtyard.",
  },
  common: {
    skip: "Skip to content",
    close: "Close story",
    story: "Explore its story",
    readTime: "A cup-sized read",
    brewing: "The journey to your cup",
    pairing: "A little something alongside",
    priceNote: "Prices belong to our sample courtyard menu.",
    backTop: "Back to top",
    noJsFinder:
      "Enable JavaScript to try the coffee finder. In the meantime, explore the stories behind our coffees.",
  },
  nav: {
    coffees: "Our coffees",
    story: "Our story",
    finder: "Find your coffee",
    contact: "Say hello",
    menu: "Open menu",
    closeMenu: "Close menu",
    theme: "Appearance",
    language: "Language",
    label: "Main navigation",
  },
  theme: { light: "Light", dark: "Dark", system: "System" },
  hero: {
    eyebrow: "ROOTED IN TRADITION. BREWED FOR TODAY.",
    lines: ["Every cup,", "a story", "shared."],
    description:
      "The familiar sound of a cezve, the warmth of a cup in your hands. Leave the hurry at the door; there is room for coffee and conversation here.",
    discover: "Explore our coffees",
    find: "Find your coffee",
    seal: ["GOOD COFFEE", "GREAT COMPANY"],
    caption: "A little sunlight. A little coffee. A little company.",
    note: "Brewed for conversation, not for rushing.",
    values: ["Familiar roots", "Care in every cup", "Always warm company"],
  },
  collection: {
    eyebrow: "01 / CHOOSE YOUR CUP",
    title: ["A companion", "for every taste."],
    intro:
      "A familiar comfort or a new curiosity. Three coffees, three rituals; stories meeting around the same table.",
    caption: "Taste it in the cup. Discover the story behind it.",
  },
  coffees: {
    "turk-kahvesi": {
      name: "Turkish Coffee",
      description:
        "Slowly prepared, patiently shared. Finely ground beans become a velvety cup with a lasting place in the conversation.",
      notes: ["Velvety", "Balanced", "Lingering"],
      ritual: "FROM OUR ROOTS",
      alt: "A copper cezve and a foamy cup of Turkish coffee on a walnut table",
      story: {
        title: "A small cup, a lasting bond",
        paragraphs: [
          "Turkish coffee is more than a brewing method; it is a small invitation to spend time together. Finely ground coffee meets water in a cezve and is poured without filtering out the grounds. Its foam, fragrance and slowly savoured final sip each belong to the ritual. A glass of water, a little Turkish delight and, above all, conversation turn a simple serving into an everyday gesture of hospitality.",
          "At Yâren, we approach this familiar ritual with care. We prepare it patiently, giving the grounds time to settle and the aroma room to unfold. Take small sips, notice its body and leave space for the stories around the table. It might accompany a neighbour’s visit, a reunion with a friend or a quiet moment of your own. The cup may be small, but there is always room for another story.",
        ],
        steps: [
          "Bring finely ground coffee and water together in a cezve.",
          "Heat gently and give the foam time to rise.",
          "Pour, let the grounds settle and discover it in small sips.",
        ],
        pairing:
          "A glass of water, a little Turkish delight and a conversation with nowhere to rush.",
      },
    },
    espresso: {
      name: "Espresso",
      description:
        "A small cup with a generous character. Hazelnut crema, a full body and a lingering finish; the essence of a moment.",
      notes: ["Intense", "Chocolate notes", "Full-bodied"],
      ritual: "A MOMENT, DISTILLED",
      alt: "A short espresso with hazelnut crema in a small ceramic demitasse",
      story: {
        title: "A small cup with a bold character",
        paragraphs: [
          "Espresso finds its place in the brief, carefully made pauses of Italian coffee culture. Hot water passes through finely ground coffee under pressure, creating a concentrated drink in a small cup. Its hazelnut-coloured crema, body and lingering aroma come together in just a few sips. A small serving does not mean that it must be rushed; even a short coffee leaves plenty of details to discover.",
          "At Yâren, we see espresso as an invitation to pay attention. Begin with its fragrance, then notice the body of the first sip and the notes that remain. The balance between the bean, the grind and the preparation gives every cup its character. Make room for it during a short escape from your day. Sometimes a single sentence holds an entire story; espresso is coffee’s concentrated, simple and quietly confident sentence.",
        ],
        steps: [
          "Grind the beans finely and evenly.",
          "Pass hot water through the coffee bed under pressure.",
          "Enjoy it freshly prepared, taking a moment for its aroma and finish.",
        ],
        pairing:
          "A small square of dark chocolate and a quiet pause in your day.",
      },
    },
    "filtre-kahve": {
      name: "Filter Coffee",
      description:
        "A little time, a gentle rhythm. Clear, fragrant flavours unfold as the water flows; a companion for an unhurried pause.",
      notes: ["Gentle", "Aromatic", "Clean"],
      ritual: "THE BEAUTY OF SLOW",
      alt: "Water flowing gently into a glass filter coffee brewer",
      story: {
        title: "The beauty of taking it slow",
        paragraphs: [
          "In the story of filter coffee, there is room for flowing water, the fragrance of beans and the pleasure of waiting. Hot water moves through ground coffee, carrying dissolved flavours into the cup while the filter leaves the grounds behind. The result is a clearer drink that gives you space to notice different notes. The brewer may change, but water, grind and time always have a part in shaping its character.",
          "At Yâren, filter coffee is a companion for longer pauses. Follow its aroma from the first warm sip as the cup slowly cools. It belongs beside a few pages of a book, a window or an easy conversation. There is no perfect ritual: simply lift the cup and take a moment for its fragrance. Sometimes the finest detail of a day is hidden in a coffee enjoyed without hurrying anywhere.",
        ],
        steps: [
          "Prepare the filter and choose a grind that suits your brewer.",
          "Add the water with a controlled, even flow.",
          "Let the brew finish and rediscover its aromas as the cup cools.",
        ],
        pairing:
          "A slice of simple cake, a few pages of a book and some time to yourself.",
      },
    },
  },
  finder: {
    eyebrow: "02 / A LITTLE DISCOVERY",
    title: "Find your coffee",
    intro:
      "Every day has its own rhythm. Make three small choices and find today’s coffee companion.",
    step: "STEP",
    next: "Next",
    back: "Back",
    submit: "Find my coffee",
    reset: "Start again",
    result: "Your companion today",
    resultNote: "A little taste suggestion, based on your choices.",
    resultReasons: {
      "turk-kahvesi":
        "A familiar ritual, a balanced taste and a cup made for conversation. Today has a place for Turkish coffee.",
      espresso:
        "A short pause and a bold character. Let espresso accompany this small escape from your day.",
      "filtre-kahve":
        "Gentle aromas and a little time to yourself. Let filter coffee follow today’s quieter rhythm.",
    },
    mood: {
      title: "What kind of moment is this?",
      options: {
        conversation: "A conversation",
        escape: "A short escape",
        "me-time": "Time for myself",
      },
    },
    strength: {
      title: "What taste are you looking for?",
      options: { soft: "Gentle", balanced: "Balanced", intense: "Intense" },
    },
    breakLength: {
      title: "How long is your pause?",
      options: {
        short: "2–3 minutes",
        medium: "5–10 minutes",
        long: "A longer pause",
      },
    },
  },
  story: {
    imageAlt:
      "Three friends bringing their cups of coffee together over a table",
    eyebrow: "03 / OUR STORY",
    title: ["Coffee brings us here.", "Company makes us stay."],
    lead: "Yâren means a friend, a companion along the way. To us, it means gathering around the same table.",
    body: "We bring the familiar sound of the cezve, the bold character of espresso and the curiosity of a freshly brewed filter into one courtyard. Methods change, but the connection around a good coffee stays the same. Make room for a cup; there is a place for your story at this table, too.",
    signature: "Brewed with care. Shared with pleasure.",
    caption: "One table. So many different stories.",
    values: ["Familiar roots", "Fresh curiosity", "A shared moment"],
  },
  contact: {
    imageAlt:
      "Turkish coffee, water, Turkish delight and an olive branch on a sunlit wooden cafe table",
    formLabel: "Yâren contact form",
    eyebrow: "04 / IT STARTS WITH HELLO",
    title: ["There is a place", "for you at our table."],
    intro:
      "An idea, a question or a coffee story of your own? Bring your cup and join the conversation.",
    caption: "A cup of coffee, a glass of water and a little conversation.",
    note: "A little introduction, just for practice. This demo form does not send messages or save your details.",
    noJs: "Enable JavaScript to use the form.",
    name: "Your name",
    email: "Email address",
    message: "Your message",
    namePlaceholder: "What shall we call you?",
    emailPlaceholder: "hello@example.com",
    messagePlaceholder: "We would love to hear your story…",
    required: "All fields are required.",
    submit: "Send message",
    successTitle: "Your message is ready. Thank you!",
    successBody:
      "This is a demo, so your message was not sent and your details were not saved. We hope to share a real conversation someday.",
    reset: "Write another message",
    errors: {
      nameRequired: "Please tell us your name.",
      emailRequired: "Please add your email address.",
      emailInvalid: "Please enter a valid email address.",
      messageRequired: "Please write a message to start the conversation.",
    },
  },
  footer: {
    eyebrow: "GOOD COMPANY, TO THE LAST SIP",
    title: ["The cup is empty.", "The story stays."],
    intro: "Good coffee, warm company and stories worth sharing.",
    explore: "Around the courtyard",
    preferences: "Make yourself at home",
    tagline: "Every cup, a story shared.",
    fictional: "A fictional brand. A real love of design.",
    crafted: "Brewed with care. Shared with pleasure.",
  },
};
export default en;
