import { Topic } from "@/types";

export interface TopicMeta {
  id: Topic;
  title: string;
  emoji: string;
  tagline: string;
  color: string;
  badge: string;
  badgeLabel: string;
}

export const TOPICS: TopicMeta[] = [
  {
    id: "moon",
    title: "The Moon",
    emoji: "🌕",
    tagline: "Earth's closest neighbour",
    color: "from-slate-700 to-slate-900",
    badge: "🥇",
    badgeLabel: "Lunar Explorer",
  },
  {
    id: "mars",
    title: "Mars",
    emoji: "🔴",
    tagline: "The Red Planet",
    color: "from-red-800 to-orange-900",
    badge: "🚀",
    badgeLabel: "Mars Pioneer",
  },
  {
    id: "sun",
    title: "The Sun",
    emoji: "☀️",
    tagline: "Our star",
    color: "from-yellow-600 to-orange-700",
    badge: "⭐",
    badgeLabel: "Solar Scholar",
  },
  {
    id: "blackholes",
    title: "Black Holes",
    emoji: "🌀",
    tagline: "Where space gets weird",
    color: "from-purple-900 to-black",
    badge: "🌌",
    badgeLabel: "Cosmic Detective",
  },
  {
    id: "iss",
    title: "Space Station",
    emoji: "🛸",
    tagline: "Home in orbit",
    color: "from-blue-800 to-indigo-900",
    badge: "🏅",
    badgeLabel: "Station Commander",
  },
];