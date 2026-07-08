import { withBasePath } from "@/lib/basePath";

// ─── Bio ──────────────────────────────────────────────────────────────────────

export const bio = {
  name: "Ali Khedr",
  displayName: "Ali AlSheikh",
  fullName: "Ali AlSheikh Kheder",
  title: "Independent Syrian journalist, photographer, videographer & musician",
  location: "Beirut, Lebanon",
  bio: "Independent Syrian journalist, photographer, videographer, and musician based in Beirut. Worked with numerous international organizations and media outlets. Co-founder of Syrian Eyes & Jazz Kabeez. 10+ years involved in humanitarian and social movements.",
  email: "alishkhedr@gmail.com",
  phone: "+961 76 955 915",
} as const;

// ─── Social links ─────────────────────────────────────────────────────────────

export const socials = [
  {
    label: "Email",
    display: "alishkhedr@gmail.com",
    href: "mailto:alishkhedr@gmail.com",
  },
  {
    label: "Instagram",
    display: "@ali_shaikh_",
    href: "https://instagram.com/ali_shaikh_",
  },
  {
    label: "Facebook",
    display: "facebook.com/askorn",
    href: "https://www.facebook.com/askorn",
  },
  {
    label: "LinkedIn",
    display: "Ali AlSheikh Khedr",
    href: "https://www.linkedin.com/in/ali-alsheikh-khedr-a1b8a680/",
  },
] as const;

// ─── Videos ───────────────────────────────────────────────────────────────────

export const showreelId = "oUT55Mi2pZY";

export const videoSections = [
  {
    category: "Aerial Showreel",
    ids: ["uhGqHkKA6O8"],
  },
  {
    category: "Documentary",
    ids: ["S8tkry0C3x4"],
  },
  {
    category: "Humanitarian",
    ids: ["J26wXZ5rNNQ", "9TP7o073QPE"],
  },
  {
    category: "Arts & Culture",
    ids: ["BySavSOpWak", "_KNvVrFN_JI", "StSqx3hl7TU"],
  },
] as const;

// ─── Featured projects ────────────────────────────────────────────────────────

export const projects = [
  {
    id: "01",
    title: "Indivisible",
    category: "Documentary Photography",
    description:
      "16 Days of Activism against gender-based violence — photographers and writers shedding light on the experiences of marginalised groups.",
    image: withBasePath("/images/work/indivisible.jpg"),
    url: "https://www.1morecup.org/indivisiblestories",
    tags: ["Photography", "Advocacy", "Gender Rights"],
    year: "2022",
  },
  {
    id: "02",
    title: "Beirut Uprising",
    category: "Photojournalism",
    description:
      "On-the-ground photography from the October 2019 Lebanese uprising — a watershed moment captured in the streets of Beirut.",
    image: withBasePath("/images/work/beirut-uprising.jpg"),
    url: null,
    tags: ["Photography", "Documentary", "Beirut"],
    year: "2019",
  },
  {
    id: "03",
    title: "Open Society Foundations",
    category: "Documentary Photography",
    description:
      "Field documentation of OSF humanitarian initiatives in the Bekaa Valley, capturing community resilience and grassroots organising.",
    image: withBasePath("/images/work/osf.jpg"),
    url: null,
    tags: ["Photography", "Humanitarian", "OSF"],
    year: "2015",
  },
  {
    id: "04",
    title: "Seenaryo",
    category: "Film",
    description:
      "Arts and education documentary for Lebanon's leading youth theatre charity — transformation through creative practice in communities shaped by displacement.",
    image: withBasePath("/images/work/seenaryo.jpg"),
    url: null,
    tags: ["Film", "Education", "Arts"],
    year: "2020",
  },
  {
    id: "05",
    title: "Youth & Children's Theatre",
    category: "Film",
    description:
      "Syrian refugee youth theatre in the Bekaa Valley — documenting creative expression and resilience among displaced communities.",
    image: withBasePath("/images/work/youth-theatre.jpg"),
    url: null,
    tags: ["Film", "Community", "Refugees"],
    year: "2018",
  },
] as const;

// ─── Journalism ───────────────────────────────────────────────────────────────

export const journalismWorks = [
  {
    title: "Through Syrian Eyes: Daily Life for Refugees in Lebanon",
    publisher: "Amnesty International",
    url: "https://www.amnesty.org/en/latest/campaigns/2016/03/syrian-refugees-bekaa-valley-lebanon/",
    image: withBasePath("/images/press/amnesty.jpg"),
    year: "2016",
  },
  {
    title: "Syrian Refugees: Tension and Solidarity in Exile in Lebanon",
    publisher: "Al Jazeera English",
    url: "https://www.aljazeera.com/indepth/inpictures/syrian-refugees-tension-solidarity-exile-lebanon-180506093057204.html",
    image: withBasePath("/images/press/aljazeera.jpg"),
    year: "2018",
  },
  {
    title: "Dangerous Exit: Who Controls How Syrians in Lebanon Go Home",
    publisher: "Refugees Deeply",
    url: "https://www.newsdeeply.com/refugees/articles/2018/08/08/dangerous-exit-who-controls-how-syrians-in-lebanon-go-home",
    image: withBasePath("/images/press/refugees-deeply.jpg"),
    year: "2018",
  },
  {
    title: "Solidarity and Exile in Lebanon: Syrian Refugees and Their Hosts",
    publisher: "Saferworld",
    url: "https://www.saferworld.org.uk/en-stories-of-change/solidarity-and-exile-in-lebanon-syrian-refugees-and-their-hosts-1",
    image: withBasePath("/images/press/saferworld-1.png"),
    year: "2018",
  },
  {
    title: "Stories from Lebanon: Responses to Migration",
    publisher: "Saferworld",
    url: "https://www.saferworld.org.uk/en-stories-of-change/stories-from-lebanon-responses-to-migration",
    image: withBasePath("/images/press/saferworld-2.png"),
    year: "2018",
  },
] as const;

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skills = [
  {
    domain: "Cinematography",
    items: ["Aerial / Drone", "Documentary Film", "Director of Photography", "Color Grading"],
  },
  {
    domain: "Photography",
    items: ["Photojournalism", "Portrait", "Documentary", "Arts & Culture"],
  },
  {
    domain: "Music",
    items: ["Jazz Composition", "Sufi Fusion", "Live Recording", "Performance"],
  },
  {
    domain: "Journalism",
    items: ["Feature Writing", "Photo Essays", "Field Reporting", "Al Jazeera · Amnesty · Saferworld"],
  },
] as const;
