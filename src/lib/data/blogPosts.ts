// src/lib/data/blogPosts.ts

import { head } from 'framer-motion/client'

export interface BlogContentBlock {
  type: 'paragraph' | 'heading' | 'quote' | 'image' | 'list'
  value?: string // For text content
  level?: 2 | 3 // Optional heading level
  image?: string // For image blocks
  caption?: string // Optional caption for images
  items?: string[]
}

export interface BlogPost {
  title: string
  slug: string
  excerpt: string
  image: string
  date: string
  tags?: string[]
  content: BlogContentBlock[]
}

// Example blog post data
export const blogPosts: BlogPost[] = [
  {
    title: 'My First Dives in Koh Tao',
    slug: 'first-dives-koh-tao',
    excerpt:
      'Sharing my first diving experiences in Koh Tao and what made them special.',
    image: '/images/scuba-intro.webp',
    date: '2026-02-17',
    tags: ['diving', 'Koh Tao'],
    content: [
      {
        type: 'paragraph',
        value:
          'Sharing my first diving experiences in Koh Tao and what made them so special.',
      },

      {
        type: 'paragraph',
        value:
          'My first dives there were honestly a surprise. I hadn’t been diving for almost two years. The last time I went underwater was in Vancouver at Whytecliff Park — a place that was challenging, but also very valuable for building solid diving fundamentals.',
      },

      {
        type: 'paragraph',
        value:
          'Cold-water diving in Vancouver is a completely different experience. The entry itself can be demanding, since some dive centers prepare equipment in the parking lot, meaning you carry full gear down to the water. It’s physically tough, but it teaches patience, discipline, and respect for the environment.',
      },

      {
        type: 'paragraph',
        value:
          'Because it’s Canada, diving usually means wearing a dry suit almost all year round. Even though it can feel heavy, especially in summer, it makes you appreciate warm-water diving even more later.',
      },

      {
        type: 'paragraph',
        value:
          'So when I arrived in Koh Tao, where the water temperature is usually around 23–25°C at its lowest, it felt like heaven.',
      },

      {
        type: 'paragraph',
        value:
          'I’m one of those people who hates wearing too many layers, so switching from a dry suit to just shorts and a rashguard felt incredibly freeing.',
      },

      {
        type: 'heading',
        value: 'Visibility & Conditions in Koh Tao',
        level: 2,
      },

      {
        type: 'paragraph',
        value:
          'Visibility in Koh Tao can be very diverse. On some days and at certain dive sites it can drop to around 2 meters — sometimes even worse — but this usually happens during the off-season and not every day.',
      },

      {
        type: 'paragraph',
        value:
          'The non-diving season is roughly November to December. During this time it’s monsoon season, which brings heavy rainfall, strong northeast winds, and rougher seas.',
      },

      {
        type: 'paragraph',
        value:
          'I experienced dives in those low-visibility conditions, but it’s important to mention that this is not the norm. Visibility can increase to 10 meters or more depending on the weather.',
      },

      {
        type: 'heading',
        value: 'Is It Worth Diving in Bad Conditions?',
        level: 2,
      },

      {
        type: 'paragraph',
        value:
          'You might ask — is it still worth diving there even if the visibility isn’t perfect, especially for beginners? My answer is YES — absolutely.',
      },

      {
        type: 'paragraph',
        value:
          'My very first dive was in Latvia in spring, when the water was about 15°C, and I saw only one fish during the entire dive. Compared to that, even “bad” conditions in Koh Tao feel like an adventure.',
      },

      {
        type: 'quote',
        value:
          'Life is an unexpected journey — it’s always better to try than to just dream.',
      },

      {
        type: 'heading',
        value: 'When Koh Tao Truly Shines',
        level: 2,
      },

      {
        type: 'paragraph',
        value:
          'I arrived in Koh Tao at the beginning of September and went for a fun dive. After cold water and limited visibility in Canada, I felt like a happy kid again.',
      },

      {
        type: 'paragraph',
        value:
          'Visibility was around 15–20 meters or more, the water temperature was about 27°C, and there were fish everywhere. The underwater world felt alive.',
      },

      {
        type: 'paragraph',
        value:
          'I even got lucky enough to see a sea turtle — something that’s actually quite rare for me — and it made the experience unforgettable.',
      },

      {
        type: 'paragraph',
        value:
          'The island is full of dive sites suitable for every level of experience. Dive centers offer a huge variety — whale sharks, large schools of fish, wreck dives, and rich coral life.',
      },

      {
        type: 'paragraph',
        value:
          'Seeing all of this in warm water and good conditions is honestly breathtaking.',
      },

      {
        type: 'heading',
        value: 'Should You Go?',
        level: 2,
      },

      {
        type: 'paragraph',
        value:
          'Yes — absolutely go. Koh Tao is truly a place meant to be LokaWondered.',
      },

      {
        type: 'paragraph',
        value:
          'Which season should you choose? Honestly, both. Starting in the off-season gives you perspective and helps you appreciate good conditions even more when the season becomes perfect.',
      },

      {
        type: 'paragraph',
        value:
          'Koh Tao is one of those places that reminds you why we fall in love with diving in the first place.',
      },
    ],
  },
  {
    title: 'Bans diving resort',
    slug: 'bans-diving-resort',
    excerpt:
      'Why Should You Do a Diving Course at Ban’s Diving Resort in Koh Tao?',
    image: '/images/bans.webp',
    date: '2026-02-18',
    tags: ['diving', 'Koh Tao'],
    content: [
      {
        type: 'paragraph',
        value:
          'Why Should You Do a Diving Course at Ban’s Diving Resort in Koh Tao?',
      },
      {
        type: 'paragraph',
        value: `When I first started diving with Ban’s Diving Resort, I was honestly shocked — in a good way.
      Without exaggeration, I had never seen so many people doing courses or working at one dive center.
      And trust me, I’ve seen more than a few dive centers in my life.`,
      },
      {
        type: 'heading',
        value: 'First Impression: The Scale',
        level: 2,
      },
      {
        type: 'paragraph',
        value: `Walking into Ban’s felt completely different from most places. 
        There were students everywhere — preparing gear, studying theory, 
        heading out for dives — and instructors constantly guiding new divers.`,
      },
      {
        type: 'paragraph',
        value: `Someone once told me that Ban’s is considered one of the biggest dive centers
         in the world when it comes to the number of instructors working there.`,
      },
      {
        type: 'paragraph',
        value: `Of course, I had to ask.
        “How many instructors do you actually have?"`,
      },
      {
        type: 'paragraph',
        value: `Funny enough, 
        even one of the instructors working there didn’t know the exact number. 
        He said around 70 — although later I understood that this probably included divemasters as well. 
        And honestly, that number sounds realistic when you see the operation in action.`,
      },
      {
        type: 'heading',
        value: 'But Why So Many Instructors?',
        level: 2,
      },
      {
        type: 'paragraph',
        value: `At first, the number feels almost crazy. 
        But then it starts to make sense.
        Ban’s has multiple international teams, including:`,
      },
      {
        type: 'list',
        items: [
          'German team',

          'English-speaking team',

          'Hebrew team',

          'Korean team',

          'Chinese team',

          'Japanese team',

          'French team',

          'Russian team',
        ],
      },
      {
        type: 'paragraph',
        value: `If you’re planning to do a diving course in Koh Tao and you’re 
        worried about finding an instructor who can teach in your own language
         — there’s a very high chance you’ll find one at Ban’s.`,
      },
      {
        type: 'heading',
        value: 'Is It Too Busy?',
        level: 2,
      },
      {
        type: 'paragraph',
        value: `You might think: “If there are so many instructors and students, 
        isn’t it chaotic?”. That’s exactly what I wondered at first too.`,
      },
      {
        type: 'paragraph',
        value: `Surprisingly, it doesn’t feel like a mess. 
        The center runs with clear structure and organization. 
        Groups are separated, schedules are planned carefully, 
        and everyone seems to know their role.
        Yes — it’s busy. But it’s controlled busy.`,
      },
      {
        type: 'heading',
        value: 'The Real Advantage',
        level: 2,
      },
      {
        type: 'paragraph',
        value: `The biggest advantage of such a large dive center is flexibility.
        Courses run frequently, schedules are adaptable, 
        and you meet divers from all over the world. 
        The energy is motivating — you constantly feel surrounded 
        by people who are excited to learn and improve.
        For new divers, that atmosphere can be very encouraging.`,
      },
      {
        type: 'heading',
        value: 'Final Thoughts',
        level: 2,
      },
      {
        type: 'paragraph',
        value: `Ban’s Diving Resort might not feel like a small family dive shop — 
        and that’s exactly the point.
        It’s a place designed to train large numbers of divers efficiently while 
        offering international support and plenty of options for different 
        languages and schedules.
        If you’re coming to Koh Tao and looking for a dive center that combines experience, 
        scale, and variety - 
        Ban’s is definitely worth considering.`,
      },
    ],
  },

  {
    title: 'Why You Should Try Scuba Diving',
    slug: 'why-try-scuba-diving',
    excerpt:
      'A personal story about how scuba diving can change your perspective on life and why everyone should try it at least once.',
    image: '/images/twins/blog.webp',
    date: '2026-03-16',
    tags: ['scuba diving', 'beginners', 'underwater'],
    content: [
      {
        type: 'paragraph',
        value:
          'Have you ever reached a point in your life where you simply don’t know where to move forward? When your cup of problems feels so full that it’s about to overflow?',
      },

      {
        type: 'paragraph',
        value:
          'Sometimes stress builds up so much that you feel like you might explode, and you end up showing anger to the people you care about — even though that is the last thing you want to do.',
      },

      {
        type: 'paragraph',
        value:
          'I was once in a very similar situation. I felt like I was drowning in my own stress. I didn’t know where to go, what to change, or even how to start moving forward.',
      },

      {
        type: 'paragraph',
        value:
          'One day, after coming home from work, I looked around the apartment where I was living at the time and said to myself: “Nah… this is not what I want.”',
      },

      {
        type: 'paragraph',
        value:
          'Out of curiosity, I opened YouTube and typed something like “best professions in the world.” One of the results that appeared was Scuba Diving Instructor. When I watched a video about scuba diving, it honestly blew my mind.',
      },

      {
        type: 'heading',
        value: 'More Than Just Diving',
        level: 2,
      },

      {
        type: 'paragraph',
        value:
          'Scuba diving is not only about going down to a certain depth, seeing a few fish, and coming back up.',
      },

      {
        type: 'paragraph',
        value:
          'For me, scuba diving became something much more. In a strange way, it feels like a life teacher.',
      },

      {
        type: 'paragraph',
        value:
          'When you are underwater, your mind suddenly becomes very simple. Only a few thoughts really matter.',
      },

      {
        type: 'list',
        items: [
          'How much air do I have left?',
          'Where is my dive buddy?',
          'Oh wow… that’s a cool fish.',
        ],
      },

      {
        type: 'paragraph',
        value:
          'And somehow all the other problems just disappear in an instant.',
      },

      {
        type: 'paragraph',
        value:
          'Down there you start to notice how calm underwater life really is. Everything moves slowly and peacefully. Nothing seems rushed or overwhelmed by life’s problems.',
      },

      {
        type: 'paragraph',
        value:
          'Even if you visit the same dive site many times, every dive feels different.',
      },

      {
        type: 'paragraph',
        value:
          'The underwater world is always in motion. Fish move, currents change, and different creatures appear and disappear.',
      },

      {
        type: 'paragraph',
        value:
          'That means even if you return to the exact same dive site, you might see completely different marine life than the last time.',
      },

      {
        type: 'quote',
        value:
          'Scuba diving is something that is hard to truly understand until you Lokawndr it yourself.',
      },

      {
        type: 'paragraph',
        value:
          'You can watch videos, read blogs, and hear stories — but until you take your first breath underwater, you will not really know what it feels like.',
      },

      {
        type: 'paragraph',
        value: 'But I should warn you about one thing.',
      },

      {
        type: 'paragraph',
        value:
          'If you try scuba diving once, there is a very good chance it will become addictive. Not in a bad way — but in the sense that after your first dive, you will almost certainly want a second one.',
      },

      {
        type: 'heading',
        value: 'What You Should Know Before Trying Scuba Diving',
        level: 2,
      },

      {
        type: 'paragraph',
        value:
          'Many times people have asked me: “Do I need to know how to swim?”',
      },

      {
        type: 'paragraph',
        value: 'The answer might surprise you — not necessarily.',
      },

      {
        type: 'paragraph',
        value:
          'What is actually more important is learning how to stay calm and control your fear underwater.',
      },

      {
        type: 'paragraph',
        value:
          'During my diving experience, I have met many people who did not know how to swim very well. Some of them had never been underwater before, and a few had never even seen the ocean in their life.',
      },

      {
        type: 'paragraph',
        value:
          'Yet they still managed to complete a scuba dive with me. They explored the underwater world, took photos and videos, and experienced something completely new.',
      },

      {
        type: 'paragraph',
        value:
          'For someone who does not know how to swim, the most important thing is trust. Trust your dive guide, listen carefully to the instructions, and take things slowly.',
      },

      {
        type: 'paragraph',
        value:
          'The sooner you relax and feel comfortable underwater, the longer you will be able to truly enjoy the beauty of the underwater world.',
      },
    ],
  },
]
