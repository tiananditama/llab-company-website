// projectsData.jsx — single source of truth for the case-study grid.
// Each entry powers BOTH the thumbnail card on the home page AND the
// full detail view at /projects/<slug>.

// `hero` is the thumbnail image (.webp) or video (.mp4) shown on the grid.
// `media` is the list of frames shown in the detail body. Each one is
// either { type: "image", src } or { type: "video", src }.
// `category` is the small mono eyebrow above the title.
// `body` is an array of { heading, copy } objects rendered as sections.
// `metrics` is an optional list of { number, label } pairs for the stat row.

const PROJECTS = [
  {
    slug: "legion-x-jasmine-sokko",
    num: "01",
    title: "The Future Belongs To The Brave. It Belongs To The Crazy.",
    shortTitle: "Future Tense",
    client: "Lenovo Legion × Jasmine Sokko",
    category: "PRODUCT LAUNCH · 2022",
    hero: { type: "image", src: "projects/legion-x-jasmine-sokko/01.webp" },
    intro: "In a brazen launch operation, we initiated a partnership between Warner Music Group's Jasmine Sokko and Lenovo's Legion. The result is the wonderfully soaring, polyphonic-yet-lyrical track, \"FUTURE TENSE\" — for the Legion x70 campaign launch and its accompanying three-part YouTube series.",
    body: [
      {
        heading: "Smash Hit Strategy",
        copy: "To expand the existing loyal customer base, we tapped into the audience of an existing Key Opinion Leader (J. Sokko) within our desired target clientele — Gen-Zers, creators, trendsetters.\n\nWe also wished to show how the high-performance tech specs of a Legion laptop could be utilised by more than just gamers, but also creators like Jasmine. Sokko's dichotomy between her public and private personas makes her the perfect candidate to embody the duality and transferable features that Legion offerings can boast.",
      },
    ],
    metrics: [
      { number: "40.4K", label: "Likes for our CTA assets on Instagram" },
      { number: "13M",   label: "Digital impressions in two weeks" },
      { number: "1.2M",  label: "Views on YouTube" },
    ],
    media: [
      { type: "image", src: "projects/legion-x-jasmine-sokko/02.webp" },
    ],
  },

  {
    slug: "gaming-in-the-sky",
    num: "02",
    title: "Gaming In The Sky",
    shortTitle: "Gaming In The Sky",
    client: "Xbox One",
    category: "EXPERIENTIAL · LAUNCH",
    hero: { type: "image", src: "projects/gaming-in-the-sky/01.webp" },
    intro: "Our integrated campaign for the Xbox One console was the first in Singapore to host a gaming event at Singapore Flyer, Asia's largest Ferris wheel. Consoles were set up within individual flyer capsules. Utilising the 32-minute trip duration, press and partners were invited to try the Xbox One firsthand while surrounded by a magnificent view of the Singapore skyline.",
    body: [
      {
        heading: "Smash Hit Strategy",
        copy: "The choice of venue is deliberate — it creates an air of exclusivity and utilises the concept of a captive audience. The lineup of activities is also designed to delight and awe. Many attendees reported being reluctant to leave after just one round.",
      },
    ],
    metrics: [
      { number: "1ST", label: "in Singapore to launch a gaming event on Asia's largest Ferris wheel" },
    ],
    media: [
      { type: "image", src: "projects/gaming-in-the-sky/02.webp" },
      { type: "image", src: "projects/gaming-in-the-sky/03.webp" },
    ],
  },

  {
    slug: "citizens-of-tmrw",
    num: "03",
    title: "Citizens of TMRW",
    shortTitle: "Citizens of TMRW",
    client: "Lenovo",
    category: "EXPERIENTIAL · REBRAND",
    hero: { type: "video", src: "projects/citizens-of-tmrw/01.mp4" },
    intro: "Citizens of TMRW is an award-winning experiential event that celebrates the innovations of today and inspires the imagination for tomorrow. The event showcases dynamic products, onsite contests, cool giveaways and great prizes.",
    body: [
      {
        heading: "Smash Hit Strategy",
        copy: "To incite revolutionary change about the way Lenovo laptops are perceived, we embarked on creating a drastically ultra-modern concept event.\n\nA key episode of the event comprises a futuristic microsite simulation of what laptops would be like in the future. Interactive pages allowed participants to create designs like headphones that resembled floating surround-sound orbs, flexible sensory keyboards, and other predictions of technology in the next millennia.\n\nParticipants could also opt in to submit designs and win prizes for their contributions toward Lenovo's future R&D. The competition was held in 11 countries with considerably successful turnout.",
      },
    ],
    metrics: [
      { number: "11", label: "Countries" },
    ],
    media: [
      { type: "video", src: "projects/citizens-of-tmrw/02.mp4" },
      { type: "video", src: "projects/citizens-of-tmrw/03.mp4" },
      { type: "video", src: "projects/citizens-of-tmrw/04.mp4" },
    ],
  },

  {
    slug: "do-great-things",
    num: "04",
    title: "Do Great Things",
    shortTitle: "Do Great Things",
    client: "Microsoft Windows 10",
    category: "PRODUCT LAUNCH · EVENT",
    hero: { type: "image", src: "projects/do-great-things/01.webp" },
    intro: "It is a truth universally acknowledged that a hotly anticipated product must be in want of a splashy debut party. Aside from live product demonstrations and a dramatic reveal of the OS interface, the occasion was peppered with amusing diversions like food and drink, face painting, photo booths, with celebrity guests like rapper Shigga Shay, DJ Nicole Chen, YouTuber Tan Jian Hao and more.",
    body: [
      {
        heading: "Smash Hit Strategy",
        copy: "\"Do Great Things\" aptly encapsulates the essence of the new Windows 10 features — every component was carefully designed to enable the user to do something great.\n\nFeeding off the excitement from the global anticipation of Windows 10, our event was designed to bring Windows fans together in a hopeful climax — where they come away feeling empowered to do more in their everyday, armed with their new tool, Windows 10.",
      },
    ],
    metrics: [
      { number: "340", label: "Guests" },
      { number: "29",  label: "Regional media" },
      { number: "22",  label: "Singapore-based media" },
      { number: "37",  label: "Stories" },
    ],
    media: [
      { type: "image", src: "projects/do-great-things/02.webp" },
      { type: "image", src: "projects/do-great-things/03.webp" },
      { type: "image", src: "projects/do-great-things/04.webp" },
    ],
  },

  {
    slug: "a-duel-dual-phone",
    num: "05",
    title: "A Duel Dual Phone",
    shortTitle: "Duel Dual Phone",
    client: "Lenovo Legion",
    category: "PRODUCT LAUNCH · 2020",
    hero: { type: "video", src: "projects/a-duel-dual-phone/01.mp4" },
    intro: "The Legion Duel Phone is the first gaming smartphone released by Lenovo Legion. In the social context of 2020, it was vital to be heard through the noise when penetrating a new sector — the gaming smartphone industry. To sum up the sensibilities behind the product and the ads that come with it, our team anointed the campaign with the tagline, \"The Evolutionary Edge.\"",
    body: [
      {
        heading: "Smash Hit Strategy",
        copy: "Our marketing mantra: Attract, Engage, Sustain.\n\nEvery asset catered to a hyper-specific client persona — the \"Hardcore-Mobile-Gamer-slash-Creator.\" Key visuals featured motifs that delve deep into the world of futuristic cyberpunk.\n\nFollowing the cult following of the first Legion Duel Phone, following iterations continue to spur prolific user-generated content on YouTube, supplying invaluable and enduring media coverage.",
      },
    ],
    media: [
      { type: "image", src: "projects/a-duel-dual-phone/02.webp" },
      { type: "image", src: "projects/a-duel-dual-phone/03.webp" },
      { type: "image", src: "projects/a-duel-dual-phone/04.webp" },
    ],
  },

  {
    slug: "dairy-queen-xmas",
    num: "06",
    title: "A Different Christmas",
    shortTitle: "Dairy Queen Xmas",
    client: "Dairy Queen",
    category: "PRODUCT LAUNCH · 2022",
    hero: { type: "image", src: "projects/dairy-queen-xmas/02.webp" },
    intro: "Using our proprietary blend of trendiness and lovable, colourful graphics, we propelled the launch of Dairy Queen's Limited Edition Cheese Tart Blizzards into viral magnitudes with attractive packaging, digital media, and physical store displays.",
    body: [
      {
        heading: "Smash Hit Strategy",
        copy: "It is indisputable knowledge that younger age groups have a heightened liking for sweet-tasting food. This makes the Gen-Z crowd a natural choice for this project's target group. The group's converging propensity for soft, wholesome illustrations and natural clustering social behaviours on Instagram ignited our main campaign concept.\n\nThe combination resulted in a fun and engaging campaign that sparked an onslaught of social media activity when DQ customers posted greetings to friends with pictures of the colourful DQ blizzard cups.",
      },
    ],
    metrics: [
      { number: "40.4K", label: "Likes for our CTA assets on Instagram" },
      { number: "3M",    label: "Digital impressions in two weeks" },
    ],
    media: [
      { type: "image", src: "projects/dairy-queen-xmas/03.webp" },
      { type: "image", src: "projects/dairy-queen-xmas/04.webp" },
      { type: "video", src: "projects/dairy-queen-xmas/01.mp4" },
    ],
  },

  {
    slug: "power-in-your-hands",
    num: "07",
    title: "Power In Your Hands",
    shortTitle: "Power In Your Hands",
    client: "Lenovo Legion",
    category: "PRODUCT LAUNCH · 2022",
    hero: { type: "image", src: "projects/power-in-your-hands/01.webp" },
    intro: "In our cheeky YouTube faux press conference, Lenovo's Asia Pacific takes questions from a throng of plucky reporters, each new quip or question ever more urgent and eager. For tech fanatics who can chat variable refresh rate, core processing power and other tech-spec details for days, the 18-minute video is a must-watch.\n\nFor the rest of us, we'll settle for the one-minute summary. Or not. The power is in your hands.",
    body: [
      {
        heading: "Smash Hit Strategy",
        copy: "For the 2022 Legion lineup, \"the-geekier-the-better\" is our absolute golden mantra.\n\nTailoring content to fit audience preferences to the extreme point of \"fan-service\" isn't just fun — the campy format marries the interests of both the brand and its target audience. We get to tout an astonishing number of powerful key selling points whilst answering the passionate queries of Lenovo's loyal fanatics. A match made in heaven.",
      },
    ],
    metrics: [
      { number: "287,510", label: "Views for long-form content" },
      { number: "4.2M",    label: "Views for 1-minute summary" },
    ],
    media: [
      { type: "image", src: "projects/power-in-your-hands/02.webp" },
      { type: "image", src: "projects/power-in-your-hands/03.webp" },
      { type: "image", src: "projects/power-in-your-hands/04.webp" },
    ],
  },

  {
    slug: "my-many-selves",
    num: "08",
    title: "#MyManySelves",
    shortTitle: "#MyManySelves",
    client: "TikTok × Lenovo IdeaPad",
    category: "SOCIAL CAMPAIGN",
    hero: { type: "image", src: "projects/my-many-selves/01.webp" },
    intro: "Aimed at the young and schooling crowd, a TikTok dance challenge and competition was created to entice our target demographic within their preferred platform. The brand-awareness campaign for Lenovo's IdeaPad series looked to build and increase brand familiarity while creating high engagement with the targeted student demographic.",
    body: [
      {
        heading: "Smash Hit Strategy",
        copy: "Aside from the obligatory edgy visuals and catchy refrains, the theme of multifaceted personal identity is universal, timeless, and psychologically tried-and-tested.\n\nTo further incentivise engagement, participants of the challenge stood a chance to win Lenovo laptops, accessories and cash prizes. The campaign spurred a profusion of user-generated content which furthered publicity coverage, snaring the campaign a cool 6.1 billion views.",
      },
    ],
    metrics: [
      { number: "6.1B", label: "Views during the campaign launch duration" },
    ],
    media: [
      { type: "video", src: "projects/my-many-selves/02.mp4" },
      { type: "video", src: "projects/my-many-selves/03.mp4" },
    ],
  },

  {
    slug: "november-shopathon",
    num: "09",
    title: "November Shopathon",
    shortTitle: "Shopathon",
    client: "Great Eastern · UpGreat",
    category: "SHOPPER ENGAGEMENT",
    hero: { type: "image", src: "projects/november-shopathon/01.webp" },
    intro: "To further engagement for Great Eastern's rewards platform UpGreat, LLAB flexed our networking abilities for this project — pulling in titan collaborators. The campaign centers on propelling usage of Singapore's first AI-hybrid wellness coach.",
    body: [
      {
        heading: "Smash Hit Strategy",
        copy: "Why limit sales to just Singles' Day? In November, every day is 11.11 when it comes to the UpGreat November Shopathon.\n\nCompetition gave away 1,100,000 UPGREAT Points that allow participants to redeem exciting rewards. Cheeky fingers egg you on to keep swiping, keep shopping, keep earning those rebates.",
      },
    ],
    metrics: [
      { number: "1.7K", label: "Members of GetGreat Singapore" },
    ],
    media: [
      { type: "image", src: "projects/november-shopathon/02.webp" },
      { type: "video", src: "projects/november-shopathon/03.mp4" },
    ],
  },
];

window.PROJECTS = PROJECTS;
