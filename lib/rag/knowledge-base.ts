export interface KnowledgeChunk {
  id: string;
  topic: string;
  text: string;
  keywords: string[];
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // ── Moon ──────────────────────────────────────────────────────────────────
  {
    id: "moon-1",
    topic: "moon",
    text: "The Moon is Earth's only natural satellite. It orbits Earth at an average distance of 384,400 km and completes one orbit every 27.3 days.",
    keywords: ["moon", "satellite", "orbit", "distance", "earth"],
  },
  {
    id: "moon-2",
    topic: "moon",
    text: "The Moon has no atmosphere, which means it has extreme temperatures: 127°C in sunlight and -173°C in shadow. There is no weather, wind, or sound.",
    keywords: ["moon", "atmosphere", "temperature", "weather", "sound"],
  },
  {
    id: "moon-3",
    topic: "moon",
    text: "Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon on July 20, 1969, during the Apollo 11 mission.",
    keywords: ["moon", "armstrong", "aldrin", "apollo", "1969", "walk", "landing"],
  },
  {
    id: "moon-4",
    topic: "moon",
    text: "The Moon's gravity is about 1/6th of Earth's gravity. This is why astronauts can jump much higher on the Moon.",
    keywords: ["moon", "gravity", "astronaut", "jump", "sixth"],
  },
  {
    id: "moon-5",
    topic: "moon",
    text: "The Moon causes ocean tides on Earth. As the Moon orbits, its gravitational pull creates two bulges of water — one facing the Moon and one on the opposite side.",
    keywords: ["moon", "tides", "ocean", "gravity", "water", "bulge"],
  },
  // ── Mars ──────────────────────────────────────────────────────────────────
  {
    id: "mars-1",
    topic: "mars",
    text: "Mars is the fourth planet from the Sun and is about half the size of Earth. A Martian day (sol) is 24 hours and 37 minutes.",
    keywords: ["mars", "planet", "sun", "size", "day", "sol"],
  },
  {
    id: "mars-2",
    topic: "mars",
    text: "Mars has the tallest volcano in the solar system: Olympus Mons, which is 21 km high — nearly three times the height of Mount Everest.",
    keywords: ["mars", "olympus mons", "volcano", "tall", "height", "everest"],
  },
  {
    id: "mars-3",
    topic: "mars",
    text: "Mars appears red because its surface is covered in iron oxide (rust). The rusty dust also floats in the thin atmosphere, giving the sky a reddish-pink colour.",
    keywords: ["mars", "red", "iron oxide", "rust", "colour", "atmosphere"],
  },
  {
    id: "mars-4",
    topic: "mars",
    text: "NASA's Perseverance rover landed on Mars in February 2021. It searches for signs of ancient microbial life and collects rock samples.",
    keywords: ["mars", "perseverance", "rover", "nasa", "life", "sample", "2021"],
  },
  {
    id: "mars-5",
    topic: "mars",
    text: "Mars has two small moons called Phobos and Deimos. Both are irregularly shaped and are thought to be captured asteroids.",
    keywords: ["mars", "phobos", "deimos", "moon", "asteroid"],
  },
  // ── Sun ───────────────────────────────────────────────────────────────────
  {
    id: "sun-1",
    topic: "sun",
    text: "The Sun is a star at the centre of our solar system. It is a nearly perfect sphere of hot plasma that is 1.4 million km in diameter — about 109 Earths wide.",
    keywords: ["sun", "star", "plasma", "diameter", "size"],
  },
  {
    id: "sun-2",
    topic: "sun",
    text: "The Sun generates energy through nuclear fusion: hydrogen atoms are fused into helium at its core, releasing enormous amounts of light and heat.",
    keywords: ["sun", "fusion", "hydrogen", "helium", "energy", "core"],
  },
  {
    id: "sun-3",
    topic: "sun",
    text: "The surface temperature of the Sun is about 5,500°C, but its outer atmosphere (the corona) reaches over 1,000,000°C — a mystery scientists are still studying.",
    keywords: ["sun", "temperature", "corona", "surface", "atmosphere"],
  },
  {
    id: "sun-4",
    topic: "sun",
    text: "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth, travelling at 300,000 km per second.",
    keywords: ["sun", "light", "speed", "minutes", "earth", "travel"],
  },
  // ── Black Holes ───────────────────────────────────────────────────────────
  {
    id: "bh-1",
    topic: "blackholes",
    text: "A black hole is a region of space where gravity is so strong that nothing — not even light — can escape once it crosses the event horizon.",
    keywords: ["black hole", "gravity", "light", "event horizon", "escape"],
  },
  {
    id: "bh-2",
    topic: "blackholes",
    text: "Black holes form when massive stars (at least 20 times the mass of the Sun) collapse at the end of their lives in a supernova explosion.",
    keywords: ["black hole", "star", "collapse", "supernova", "form"],
  },
  {
    id: "bh-3",
    topic: "blackholes",
    text: "In 2019, the Event Horizon Telescope captured the first ever image of a black hole — the supermassive black hole at the centre of galaxy M87, 55 million light-years away.",
    keywords: ["black hole", "image", "photo", "2019", "M87", "telescope"],
  },
  {
    id: "bh-4",
    topic: "blackholes",
    text: "Time near a black hole moves slower due to extreme gravity — this effect is called gravitational time dilation, predicted by Einstein's General Theory of Relativity.",
    keywords: ["black hole", "time", "dilation", "einstein", "relativity", "gravity"],
  },
  // ── ISS ───────────────────────────────────────────────────────────────────
  {
    id: "iss-1",
    topic: "iss",
    text: "The International Space Station (ISS) orbits Earth at about 408 km altitude, travelling at 28,000 km/h — completing one orbit every 90 minutes.",
    keywords: ["iss", "space station", "orbit", "altitude", "speed"],
  },
  {
    id: "iss-2",
    topic: "iss",
    text: "The ISS has been continuously inhabited since November 2000. It is a joint project between NASA, Roscosmos, ESA, JAXA, and CSA.",
    keywords: ["iss", "inhabited", "crew", "nasa", "agency", "2000"],
  },
  {
    id: "iss-3",
    topic: "iss",
    text: "Astronauts on the ISS experience 16 sunrises and sunsets every day because they orbit Earth so quickly.",
    keywords: ["iss", "sunrise", "sunset", "day", "orbit", "astronaut"],
  },
  {
    id: "iss-4",
    topic: "iss",
    text: "Living in microgravity causes muscles and bones to weaken. Astronauts exercise for about 2 hours every day to stay healthy.",
    keywords: ["iss", "microgravity", "muscle", "bone", "exercise", "health"],
  },
];