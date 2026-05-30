/* ═══════════════════════════════════════════════════════════
   TRUTH OR LOVE — Game Engine
   Real-time multiplayer romantic couples game
   ─────────────────────────────────────────────────────────
   FIREBASE CONFIG — replace all REPLACE_* values with yours
   See SETUP.md for step-by-step instructions
   ═══════════════════════════════════════════════════════════ */
'use strict';

const FIREBASE_CONFIG = {
  apiKey:            "REPLACE_WITH_YOUR_API_KEY",
  authDomain:        "REPLACE_WITH_YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL:       "https://REPLACE_WITH_YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId:         "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket:     "REPLACE_WITH_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "REPLACE_WITH_YOUR_SENDER_ID",
  appId:             "REPLACE_WITH_YOUR_APP_ID"
};

const FB_READY = !FIREBASE_CONFIG.apiKey.includes('REPLACE');
let db = null;
if (FB_READY) {
  try { firebase.initializeApp(FIREBASE_CONFIG); db = firebase.database(); }
  catch(e) { console.warn('Firebase init failed:', e); }
}

/* ═══════════════════════════════════════════════════════════
   CONTENT — mode tags:
   'sweet' | 'flirty' | 'deep' | 'date' | 'distance' | 'all'
   ═══════════════════════════════════════════════════════════ */

const TRUTHS = [
  /* ── Getting to Know You ──────────────────────────────── */
  { text:"What's one dream you've kept quietly to yourself for years — something you've barely admitted even to yourself?", cat:"Getting to Know You", modes:['sweet','deep','all'] },
  { text:"What does your perfect Sunday morning look like in every detail?", cat:"Getting to Know You", modes:['sweet','date','all'] },
  { text:"What's a passion or interest you have that most people don't know about?", cat:"Getting to Know You", modes:['sweet','all'] },
  { text:"What's the earliest memory you have of feeling completely, genuinely happy?", cat:"Getting to Know You", modes:['deep','sweet','all'] },
  { text:"What did your 10-year-old self dream of becoming, and how has that changed?", cat:"Getting to Know You", modes:['sweet','all'] },
  { text:"What's a book, film, or song that genuinely shaped who you are today?", cat:"Getting to Know You", modes:['sweet','deep','all'] },
  { text:"What's the most beautiful place you've ever been, and what made it feel that way?", cat:"Getting to Know You", modes:['sweet','distance','all'] },
  { text:"What quality do you think defines you more than anything else?", cat:"Getting to Know You", modes:['deep','all'] },
  { text:"What's something on your bucket list you've never shared with anyone?", cat:"Getting to Know You", modes:['sweet','distance','all'] },
  { text:"Where in the world do you feel most at home, and why?", cat:"Getting to Know You", modes:['sweet','deep','all'] },
  { text:"What's a belief you hold about love that most people might disagree with?", cat:"Getting to Know You", modes:['deep','all'] },
  { text:"If you could master one skill effortlessly, what would you choose?", cat:"Getting to Know You", modes:['sweet','all'] },
  { text:"What's something you do completely differently from how you were raised?", cat:"Getting to Know You", modes:['deep','all'] },
  { text:"What's the most courageous decision you've ever made?", cat:"Getting to Know You", modes:['deep','all'] },
  { text:"What does a truly meaningful life look like to you?", cat:"Getting to Know You", modes:['deep','all'] },
  { text:"What's something you've been learning about yourself recently?", cat:"Getting to Know You", modes:['deep','all'] },
  { text:"What three values guide almost every decision you make?", cat:"Getting to Know You", modes:['deep','all'] },
  { text:"What's a goal you're quietly working toward right now?", cat:"Getting to Know You", modes:['sweet','all'] },
  { text:"Who in your life has shaped you more than they know?", cat:"Getting to Know You", modes:['deep','all'] },
  { text:"What's something you find deeply beautiful that others might overlook?", cat:"Getting to Know You", modes:['sweet','date','all'] },

  /* ── Relationship Reflection ──────────────────────────── */
  { text:"What's the moment you first thought 'this person is genuinely special'?", cat:"Relationship Reflection", modes:['sweet','flirty','all'] },
  { text:"What's your favorite memory of us together so far?", cat:"Relationship Reflection", modes:['sweet','date','all'] },
  { text:"What's something I do that always makes your day better, even in a small way?", cat:"Relationship Reflection", modes:['sweet','date','all'] },
  { text:"How has being with me changed the way you see yourself?", cat:"Relationship Reflection", modes:['deep','all'] },
  { text:"What's a moment in our relationship that made you feel the most loved?", cat:"Relationship Reflection", modes:['deep','date','all'] },
  { text:"What's something I said that you've thought about more than once since?", cat:"Relationship Reflection", modes:['deep','sweet','all'] },
  { text:"When do you feel most like yourself when you're with me?", cat:"Relationship Reflection", modes:['deep','all'] },
  { text:"What's a challenge we've faced that made us stronger?", cat:"Relationship Reflection", modes:['deep','all'] },
  { text:"What's something about how I love you that surprised you?", cat:"Relationship Reflection", modes:['sweet','deep','all'] },
  { text:"What's your favorite thing we've built together — physical, emotional, or a shared experience?", cat:"Relationship Reflection", modes:['sweet','all'] },
  { text:"What's a time I showed up for you in a way you'll never forget?", cat:"Relationship Reflection", modes:['deep','all'] },
  { text:"How would you describe our relationship to someone who'd never met us?", cat:"Relationship Reflection", modes:['sweet','all'] },
  { text:"What's something you appreciate about me that you don't say often enough?", cat:"Relationship Reflection", modes:['sweet','date','all'] },
  { text:"What do you think is the most unique thing about what we have?", cat:"Relationship Reflection", modes:['sweet','all'] },
  { text:"What's a way our relationship has grown that makes you proud?", cat:"Relationship Reflection", modes:['deep','all'] },

  /* ── Deep Emotional Connection ────────────────────────── */
  { text:"What's your biggest fear and where do you think it actually comes from?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What's something you're still healing from — you don't have to share the details if you don't want to?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"When do you feel most vulnerable with me, and what makes that feel safe or unsafe?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What emotion do you find the hardest to express, and why?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What's something you've never fully told anyone that you sometimes wish you could say?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What does feeling truly loved actually feel like for you — not the idea, but the real feeling?", cat:"Deep Connection", modes:['deep','date','all'] },
  { text:"Is there a part of yourself you've hidden from me that you'd want me to understand someday?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What's the loneliest you've ever felt, and what helped?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What do you need from a partner during your hardest moments that most people don't think to give?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What's something you're afraid I might not understand about you?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What's a moment that changed the way you see yourself forever?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What would you tell your younger self about love?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What's something you've forgiven yourself for that took you a long time to accept?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What does trust mean to you — not the definition, but what it feels like when it's real?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"When do you feel most understood in our relationship?", cat:"Deep Connection", modes:['deep','date','all'] },
  { text:"What's a belief about yourself you've been trying to let go of?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What do you need that you often don't ask for?", cat:"Deep Connection", modes:['deep','all'] },
  { text:"What part of you do you think I haven't fully seen yet?", cat:"Deep Connection", modes:['deep','all'] },

  /* ── Romantic Questions ───────────────────────────────── */
  { text:"What's the most romantic thing I've ever done for you?", cat:"Romantic", modes:['sweet','flirty','date','all'] },
  { text:"What do I do that makes you feel the most desired?", cat:"Romantic", modes:['flirty','date','all'] },
  { text:"What's your love language — and do you feel I speak it naturally?", cat:"Romantic", modes:['deep','sweet','all'] },
  { text:"What's your idea of a perfect romantic evening — in every detail?", cat:"Romantic", modes:['flirty','date','all'] },
  { text:"What song or piece of music makes you think of me?", cat:"Romantic", modes:['sweet','date','all'] },
  { text:"What's a small thing I do that's quietly, unexpectedly romantic to you?", cat:"Romantic", modes:['sweet','date','all'] },
  { text:"What's the most beautiful thing anyone has ever said to you?", cat:"Romantic", modes:['sweet','deep','all'] },
  { text:"What does 'feeling loved' look like day to day for you?", cat:"Romantic", modes:['sweet','deep','all'] },
  { text:"What's a type of intimacy that feels underrated but deeply meaningful to you?", cat:"Romantic", modes:['deep','date','all'] },
  { text:"What's something you've always wanted me to say to you?", cat:"Romantic", modes:['flirty','sweet','all'] },
  { text:"What's your favorite way for me to show affection without words?", cat:"Romantic", modes:['date','sweet','all'] },
  { text:"What's a romantic gesture that means more to you than most people realize?", cat:"Romantic", modes:['sweet','date','all'] },
  { text:"If you could relive one moment between us, which would you choose?", cat:"Romantic", modes:['sweet','date','all'] },
  { text:"What feeling do I give you that no one else ever has?", cat:"Romantic", modes:['flirty','deep','date','all'] },
  { text:"What's something romantic you've always wanted us to do together?", cat:"Romantic", modes:['flirty','date','sweet','all'] },

  /* ── Flirty Questions ─────────────────────────────────── */
  { text:"What was the first thing you noticed about me — and what made you look twice?", cat:"Flirty", modes:['flirty','sweet','all'] },
  { text:"What do you find physically irresistible about me that you don't say enough?", cat:"Flirty", modes:['flirty','date','all'] },
  { text:"What's a moment when I looked so good you had to try not to stare?", cat:"Flirty", modes:['flirty','date','all'] },
  { text:"What's the most attractive thing I do without realizing it?", cat:"Flirty", modes:['flirty','all'] },
  { text:"If you had to describe our chemistry in one word, what would it be?", cat:"Flirty", modes:['flirty','all'] },
  { text:"What's a thought about me you had today that you haven't mentioned yet?", cat:"Flirty", modes:['flirty','date','distance','all'] },
  { text:"What outfit or look of mine has stayed in your memory?", cat:"Flirty", modes:['flirty','all'] },
  { text:"What do you love most about the way we make each other laugh?", cat:"Flirty", modes:['flirty','sweet','all'] },
  { text:"When you think about me during your day, what's usually the first thing that comes to mind?", cat:"Flirty", modes:['flirty','distance','all'] },
  { text:"What's something I do that still gives you butterflies even now?", cat:"Flirty", modes:['flirty','date','all'] },
  { text:"What's the most charming thing about me that you haven't told me directly?", cat:"Flirty", modes:['flirty','sweet','all'] },
  { text:"If you could bottle the feeling you get when we're together, what would you call it?", cat:"Flirty", modes:['flirty','date','all'] },
  { text:"What's something about me that surprised you in the best possible way?", cat:"Flirty", modes:['flirty','sweet','all'] },
  { text:"When was the moment you knew this was more than just attraction?", cat:"Flirty", modes:['flirty','deep','all'] },
  { text:"What's the most flirtatious thing I've ever done that you still think about?", cat:"Flirty", modes:['flirty','date','all'] },
  { text:"What do you think our energy looks like to other people when we're together?", cat:"Flirty", modes:['flirty','sweet','all'] },

  /* ── Future Together ──────────────────────────────────── */
  { text:"Where do you picture us in five years — paint the scene?", cat:"Future Together", modes:['sweet','deep','all'] },
  { text:"What tradition would you most want us to create together?", cat:"Future Together", modes:['sweet','all'] },
  { text:"What's your dream trip for the two of us — where, and what would we do?", cat:"Future Together", modes:['sweet','distance','all'] },
  { text:"What does your vision of 'forever' with me actually look like day to day?", cat:"Future Together", modes:['deep','all'] },
  { text:"What's one thing you want to experience with me that we haven't yet?", cat:"Future Together", modes:['sweet','date','all'] },
  { text:"If we could live anywhere in the world together, where would you choose?", cat:"Future Together", modes:['sweet','distance','all'] },
  { text:"What kind of home would you want us to build — physically and emotionally?", cat:"Future Together", modes:['deep','sweet','all'] },
  { text:"What do you hope people say about us as a couple someday?", cat:"Future Together", modes:['sweet','all'] },
  { text:"What's something you want to give me in this relationship that you haven't yet?", cat:"Future Together", modes:['deep','all'] },
  { text:"What do you think will be the best chapter of our story?", cat:"Future Together", modes:['sweet','all'] },
  { text:"If you could promise me one thing about our future, what would it be?", cat:"Future Together", modes:['deep','date','all'] },
  { text:"What's a shared goal that excites you most when you imagine us achieving it together?", cat:"Future Together", modes:['sweet','all'] },

  /* ── Fun & Unexpected ─────────────────────────────────── */
  { text:"If our relationship were a movie, what genre would it be — and who would play us?", cat:"Fun & Unexpected", modes:['sweet','date','all'] },
  { text:"What fictional couple do you think we're most like, and is that a compliment?", cat:"Fun & Unexpected", modes:['sweet','all'] },
  { text:"What's the funniest thing that's happened between us that still makes you laugh?", cat:"Fun & Unexpected", modes:['sweet','date','all'] },
  { text:"If we had a theme song as a couple, what would it be right now?", cat:"Fun & Unexpected", modes:['sweet','date','all'] },
  { text:"What era in history would you pick for us to live in together?", cat:"Fun & Unexpected", modes:['sweet','all'] },
  { text:"If you could design our perfect day together with unlimited budget, what happens?", cat:"Fun & Unexpected", modes:['flirty','date','sweet','all'] },
  { text:"What ridiculous habit of mine do you secretly find endearing?", cat:"Fun & Unexpected", modes:['sweet','date','all'] },
  { text:"If I were a character in a novel, how would the author describe me?", cat:"Fun & Unexpected", modes:['sweet','flirty','all'] },
  { text:"What would the title of the chapter of our relationship right now be?", cat:"Fun & Unexpected", modes:['sweet','all'] },
  { text:"If you could give our relationship a Michelin star rating, what would it get and why?", cat:"Fun & Unexpected", modes:['sweet','date','all'] },
  { text:"What's the most unexpectedly romantic thing we've done that wasn't planned?", cat:"Fun & Unexpected", modes:['sweet','date','all'] },
  { text:"If our relationship had a smell, what would it be?", cat:"Fun & Unexpected", modes:['flirty','sweet','all'] },
  { text:"What's something about us as a couple that would genuinely surprise people?", cat:"Fun & Unexpected", modes:['sweet','all'] },
];

/* ─────────────────────────────────────────────────────────
   LOVE CHALLENGES
───────────────────────────────────────────────────────── */
const LOVES = [
  /* ── Romantic Challenges ──────────────────────────────── */
  { text:"Share three specific, heartfelt things you adore about your partner — not general, but moments, details, and qualities only you would notice.", cat:"Romantic", modes:['sweet','date','all'] },
  { text:"Describe your perfect date together in detail — what you'd wear, where you'd go, how the evening would end.", cat:"Romantic", modes:['sweet','date','all'] },
  { text:"Recreate the first meaningful conversation you two had, or describe how you'd imagine it in the best possible version.", cat:"Romantic", modes:['sweet','deep','all'] },
  { text:"Write your partner a genuine love note right now — even three sentences. Say something you don't say enough.", cat:"Romantic", modes:['sweet','date','distance','all'] },
  { text:"Tell your partner the story of the moment you knew you were falling for them.", cat:"Romantic", modes:['sweet','deep','date','all'] },
  { text:"Describe what it feels like to be loved by your partner — what it does to you on ordinary days.", cat:"Romantic", modes:['deep','date','all'] },
  { text:"Choose a song that captures how you feel about your partner right now and share it with a one-sentence explanation.", cat:"Romantic", modes:['sweet','distance','date','all'] },
  { text:"Tell your partner what you were thinking about them the last time they weren't with you.", cat:"Romantic", modes:['flirty','distance','date','all'] },
  { text:"Describe the most romantic version of your shared future in the most beautiful terms you can.", cat:"Romantic", modes:['sweet','date','all'] },
  { text:"Write your partner's name and list one irreplaceable quality for each letter.", cat:"Romantic", modes:['sweet','all'] },
  { text:"Tell your partner what you notice first when you see them after time apart.", cat:"Romantic", modes:['flirty','distance','all'] },
  { text:"Describe a tradition you'd like to start with your partner — something just for you two.", cat:"Romantic", modes:['sweet','date','all'] },
  { text:"Read your partner a short poem — recite one you know, or make one up on the spot about them.", cat:"Romantic", modes:['date','sweet','all'] },
  { text:"Tell your partner the specific moment in your day when you thought of them today.", cat:"Romantic", modes:['flirty','sweet','distance','all'] },
  { text:"Describe in detail a moment from your relationship that you've replayed in your mind more than once.", cat:"Romantic", modes:['deep','date','all'] },

  /* ── Flirty Challenges ────────────────────────────────── */
  { text:"Record a 30-second voice note telling your partner exactly what you find irresistible about them right now — no holding back.", cat:"Flirty", modes:['flirty','distance','date','all'] },
  { text:"Give your partner a romantic nickname you've never used before. Explain what inspired it.", cat:"Flirty", modes:['flirty','sweet','all'] },
  { text:"Describe your partner as if you're writing the opening line of a novel where they're the most captivating character.", cat:"Flirty", modes:['flirty','date','all'] },
  { text:"Tell your partner the most attractive non-physical thing about them — something about how they think, move, or speak.", cat:"Flirty", modes:['flirty','date','all'] },
  { text:"Tell your partner what you were thinking the last time you looked at them and thought 'wow'.", cat:"Flirty", modes:['flirty','date','all'] },
  { text:"Send your partner a voice note describing how they make you feel using only metaphors — no literal descriptions.", cat:"Flirty", modes:['flirty','distance','all'] },
  { text:"Tell your partner three things you find genuinely, specifically attractive about them that you've never said this directly.", cat:"Flirty", modes:['flirty','date','all'] },
  { text:"Describe your partner's smile without using the word 'beautiful', 'gorgeous', or 'lovely'.", cat:"Flirty", modes:['flirty','sweet','date','all'] },
  { text:"Write your partner a flirtatious text as if you've just met them and want to make an impression.", cat:"Flirty", modes:['flirty','all'] },
  { text:"Tell your partner what feeling they give you — not what you love about them, but how your body and mind feel when they walk in.", cat:"Flirty", modes:['flirty','date','all'] },
  { text:"Create and share a 'highlight reel' of your partner's best moments — pick three and describe them like a sports commentator.", cat:"Flirty", modes:['flirty','sweet','all'] },
  { text:"Share the photo of your partner on your phone you like the most and explain exactly why.", cat:"Flirty", modes:['flirty','distance','all'] },
  { text:"Tell your partner what you'd say to them if you had to win them over from scratch — your best line.", cat:"Flirty", modes:['flirty','date','all'] },
  { text:"Describe your partner's laugh in detail — what it sounds like, when it happens, and what it does to you.", cat:"Flirty", modes:['flirty','sweet','all'] },
  { text:"Tell your partner what the word 'home' means to you, and then explain how they fit into that definition.", cat:"Flirty", modes:['deep','date','flirty','all'] },

  /* ── Affection Challenges ─────────────────────────────── */
  { text:"Hold your partner's hands in both of yours, look them in the eyes, and say one thing you've been meaning to tell them.", cat:"Affection", modes:['date','deep','all'] },
  { text:"Place your hand on your partner's heart. Stay there in silence for 30 seconds. Then describe what you were thinking.", cat:"Affection", modes:['date','deep','all'] },
  { text:"Give your partner a hug that lasts at least 60 seconds. Just breathe together. No talking.", cat:"Affection", modes:['date','sweet','all'] },
  { text:"Look your partner in the eyes for one full minute without looking away. No laughing. Notice what you feel.", cat:"Affection", modes:['date','deep','all'] },
  { text:"Give your partner a gentle, caring shoulder or head massage for 2 minutes while telling them one thing they've done that you've been grateful for.", cat:"Affection", modes:['date','all'] },
  { text:"Lean your forehead against your partner's forehead. Stay there. Breathe. Notice everything.", cat:"Affection", modes:['date','deep','all'] },
  { text:"Write a brief love note on paper and fold it in whatever way feels right. Leave it somewhere they'll find it later.", cat:"Affection", modes:['date','sweet','all'] },
  { text:"Tell your partner one thing you love about their voice — and then make them say something just so you can listen.", cat:"Affection", modes:['date','flirty','all'] },
  { text:"Sit facing each other. Each person places one hand palm-up. The other places their hand on top. Hold that, eyes closed, for 45 seconds.", cat:"Affection", modes:['date','deep','all'] },
  { text:"Tell your partner specifically and slowly what you love about how they move — how they walk, gesture, exist.", cat:"Affection", modes:['flirty','date','all'] },

  /* ── Long Distance Challenges ─────────────────────────── */
  { text:"Both of you take a selfie right now showing exactly where you are and what you're doing. Send simultaneously.", cat:"Long Distance", modes:['distance','all'] },
  { text:"Record and send a 60-second voice note of you describing your surroundings — what you can see, hear, and smell right now.", cat:"Long Distance", modes:['distance','all'] },
  { text:"Start playing the same song at the same moment and listen in silence together over a call.", cat:"Long Distance", modes:['distance','sweet','all'] },
  { text:"Send your partner a photo of something in your space that reminds you of them. Explain why with a voice note.", cat:"Long Distance", modes:['distance','sweet','all'] },
  { text:"Write your partner a message that describes exactly what you would do if you were together right now — in full detail.", cat:"Long Distance", modes:['distance','flirty','all'] },
  { text:"Both pull out something you have that the other has touched, given you, or that reminds you of them. Share what you chose and why.", cat:"Long Distance", modes:['distance','sweet','all'] },
  { text:"Take a photo of the sky from where you are. Your partner takes a photo from where they are. Compare them.", cat:"Long Distance", modes:['distance','sweet','all'] },
  { text:"Record a voice note reading something — a poem, a quote, a paragraph from something you love — and send it as if reading to them in person.", cat:"Long Distance", modes:['distance','romantic','all'] },
  { text:"Write down the three things you miss most about being physically near your partner. Share them out loud.", cat:"Long Distance", modes:['distance','deep','all'] },
  { text:"Open your photo gallery and find the photo that makes you feel the most connected to your partner. Share it and tell the full story behind it.", cat:"Long Distance", modes:['distance','sweet','all'] },
  { text:"Make your partner a playlist right now — 5 songs that describe you, your relationship, or how you feel today. Share the titles.", cat:"Long Distance", modes:['distance','sweet','all'] },
  { text:"Both cook or order the same meal at the same time and eat 'together' while on a call. Describe every bite.", cat:"Long Distance", modes:['distance','date','all'] },
  { text:"Write your partner a postcard-length message (5 sentences maximum) as if you're sending it from the exact place you are right now.", cat:"Long Distance", modes:['distance','all'] },
  { text:"Watch exactly one minute of the same video together simultaneously. Then each describe the one detail the other might have missed.", cat:"Long Distance", modes:['distance','all'] },
  { text:"Send your partner a voice note of you laughing — not about anything in particular. Just laughing. They must respond with their own.", cat:"Long Distance", modes:['distance','sweet','all'] },

  /* ── Appreciation Challenges ──────────────────────────── */
  { text:"Thank your partner for something specific they did in the last week that you haven't acknowledged yet.", cat:"Appreciation", modes:['sweet','date','deep','all'] },
  { text:"Tell your partner one way they've made you a better person — give a specific example.", cat:"Appreciation", modes:['deep','sweet','all'] },
  { text:"Describe in detail your favorite memory with your partner — where you were, what was said, how you felt.", cat:"Appreciation", modes:['sweet','date','all'] },
  { text:"Name five qualities in your partner that you hope they fully know you see in them.", cat:"Appreciation", modes:['sweet','date','all'] },
  { text:"Tell your partner one thing they do that you took for granted for too long and now genuinely treasure.", cat:"Appreciation", modes:['deep','sweet','all'] },
  { text:"Share a moment when your partner made you feel proud — of them and of being with them.", cat:"Appreciation", modes:['sweet','date','all'] },
  { text:"Tell your partner what life feels different with them in it — give a concrete, specific example.", cat:"Appreciation", modes:['deep','sweet','all'] },
  { text:"Describe something your partner carries that you wish they could see more clearly through your eyes.", cat:"Appreciation", modes:['deep','all'] },
  { text:"Tell your partner the kindest thing they've ever done for you that you still think about.", cat:"Appreciation", modes:['deep','sweet','date','all'] },
  { text:"Write an honest, genuine 'review' of your partner as a person — what you'd tell the world about them.", cat:"Appreciation", modes:['sweet','date','all'] },

  /* ── Connection Challenges ────────────────────────────── */
  { text:"Ask your partner one follow-up question about something they shared earlier in the game — go deeper.", cat:"Connection", modes:['deep','sweet','all'] },
  { text:"Tell your partner something about yourself that you've wanted them to fully understand but haven't found the right words for yet.", cat:"Connection", modes:['deep','all'] },
  { text:"Share a fear or insecurity you've carried for a long time that you haven't fully voiced in this relationship.", cat:"Connection", modes:['deep','all'] },
  { text:"Tell your partner one thing you need from them that you don't ask for enough.", cat:"Connection", modes:['deep','all'] },
  { text:"Describe a moment when you felt the most emotionally connected to your partner. What were the exact conditions?", cat:"Connection", modes:['deep','date','all'] },
  { text:"Share something that made you think of your partner this week — and tell the full story of why.", cat:"Connection", modes:['sweet','distance','all'] },
  { text:"Tell your partner something you've been holding back because you weren't sure how they'd receive it — say it gently and honestly now.", cat:"Connection", modes:['deep','all'] },
  { text:"Tell your partner the version of them that you find most beautiful — not what they look like, but a state of being.", cat:"Connection", modes:['deep','date','all'] },
  { text:"Describe how you feel after your best conversations with your partner — what do they leave you with?", cat:"Connection", modes:['deep','sweet','all'] },
  { text:"Share what you think your partner needs most right now — and ask if you're right.", cat:"Connection", modes:['deep','all'] },

  /* ── Fun & Playful Challenges ─────────────────────────── */
  { text:"Do your best impression of your partner — their most recognizable mannerism, phrase, or expression.", cat:"Fun & Playful", modes:['sweet','date','all'] },
  { text:"Create a fake 'couple award' for you both — something hilariously specific to your relationship.", cat:"Fun & Playful", modes:['sweet','date','all'] },
  { text:"Invent a ridiculous tradition for your relationship that you'd actually want to keep doing every year.", cat:"Fun & Playful", modes:['sweet','all'] },
  { text:"Pitch your relationship as a Netflix series — give it a title, a 30-second synopsis, and which actor plays each of you.", cat:"Fun & Playful", modes:['sweet','all'] },
  { text:"Each person picks 3 emojis that describe your relationship right now. Compare and explain the differences.", cat:"Fun & Playful", modes:['sweet','distance','all'] },
  { text:"Write the most over-the-top, dramatic caption for an imaginary photo of you two right now.", cat:"Fun & Playful", modes:['sweet','date','all'] },
  { text:"Do a 60-second 'press conference' as your partner — answer questions as if you are them, in their exact voice.", cat:"Fun & Playful", modes:['sweet','date','all'] },
  { text:"Narrate your current location and activity as if you're in a romantic film. Your partner must add the next line of dialogue.", cat:"Fun & Playful", modes:['flirty','date','all'] },
  { text:"Create a 'menu' for your ideal night together — starter, main, dessert — but describe emotional experiences, not food.", cat:"Fun & Playful", modes:['flirty','date','all'] },
  { text:"Take a selfie right now that captures exactly how you feel about your partner in this moment. No words needed — just the expression.", cat:"Fun & Playful", modes:['flirty','distance','date','all'] },
];

/* ═══════════════════════════════════════════════════════════
   MODE CONFIGURATION
   ═══════════════════════════════════════════════════════════ */
const MODE_NAMES = {
  random: 'Random', sweet: 'Sweet', flirty: 'Flirty',
  deep: 'Deep Connection', date: 'Date Night', distance: 'Long Distance'
};

function getPool(type, mode) {
  const all = type === 'truth' ? TRUTHS : LOVES;
  if (mode === 'random') return all;
  return all.filter(c => c.modes.includes(mode));
}

/* ═══════════════════════════════════════════════════════════
   EMOJI OPTIONS
   ═══════════════════════════════════════════════════════════ */
const P1_EMOJIS = ['🌹','🌸','💖','🦋','🌺','✨','🌙','💎','🌷','🎀'];
const P2_EMOJIS = ['🔥','⚡','🦁','🎯','🌊','🏆','🌑','🛡️','💫','🌿'];

/* ═══════════════════════════════════════════════════════════
   LOCAL STATE
   ═══════════════════════════════════════════════════════════ */
let myRole    = null;
let roomCode  = null;
let roomRef   = null;
let roomSnap  = null;
let timerInt  = null;
let activeMode = 'random';
let selectedMode = 'random';
let favorites  = [];  // [{type, text, cat}]

/* ── DOM shorthand ── */
const $ = id => document.getElementById(id);

/* ═══════════════════════════════════════════════════════════
   SCREEN NAVIGATION
   ═══════════════════════════════════════════════════════════ */
let cur = 's-landing';
const SCREENS = ['s-landing','s-room','s-setup','s-waiting','s-game','s-end'];

function goTo(id) {
  const prev = document.getElementById(cur);
  if (prev) { prev.classList.remove('active'); prev.classList.add('exit-left'); setTimeout(()=>prev.classList.remove('exit-left'),600); }
  cur = id;
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

/* ═══════════════════════════════════════════════════════════
   PARTICLES
   ═══════════════════════════════════════════════════════════ */
function initParticles() {
  const c = $('particles');
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    p.className = 'heart-p';
    p.textContent = Math.random() > .5 ? '♥' : '✦';
    p.style.left = Math.random()*100 + 'vw';
    p.style.animationDuration = (16 + Math.random()*22) + 's';
    p.style.animationDelay   = (Math.random()*20) + 's';
    p.style.fontSize = (8+Math.random()*10) + 'px';
    p.style.color = Math.random() > .5 ? 'rgba(201,137,106,.2)' : 'rgba(139,42,62,.18)';
    c.appendChild(p);
  }
}

/* ═══════════════════════════════════════════════════════════
   IDENTITY HELPERS
   ═══════════════════════════════════════════════════════════ */
function saveId()  { localStorage.setItem('tol_role',myRole); localStorage.setItem('tol_room',roomCode); }
function loadId()  { myRole=localStorage.getItem('tol_role'); roomCode=localStorage.getItem('tol_room'); }
function clearId() { localStorage.removeItem('tol_role'); localStorage.removeItem('tol_room'); }
function genCode() { return Math.random().toString(36).substr(2,6).toUpperCase(); }
function codeFromURL() { return window.location.hash.slice(1).toUpperCase()||null; }
function setURL(code)  { window.location.hash = code; }

/* ═══════════════════════════════════════════════════════════
   CARD PICKING (no repeats until pool exhausted)
   ═══════════════════════════════════════════════════════════ */
function shuffle(a) {
  const b = [...a];
  for (let i=b.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [b[i],b[j]]=[b[j],b[i]]; }
  return b;
}

function pickCard(type, mode, usedStr) {
  const pool = getPool(type, mode);
  const used = usedStr ? usedStr.split(',').map(Number).filter(n=>!isNaN(n)) : [];
  const avail = pool.reduce((a,_,i)=>{ if(!used.includes(i)) a.push(i); return a; },[]);
  const final = avail.length > 0 ? avail : pool.map((_,i)=>i);
  const idx = shuffle(final)[0];
  const card = pool[idx];
  const newUsed = (avail.length > 0 ? [...used, idx] : [idx]).join(',');
  return { card, newUsed };
}

/* ═══════════════════════════════════════════════════════════
   FIREBASE ROOM OPERATIONS
   ═══════════════════════════════════════════════════════════ */
function makeRoom(name, emoji, mode) {
  return {
    p1: { name, emoji, ready: true },
    p2: { name:'', emoji:'', ready:false, joined:false },
    game: {
      phase: 'waiting_p2',
      turn: 'p1', round: 1, cardsPlayed: 0,
      mode,
      card: null, cardPhase: 'idle', cardDrawnAt: 0,
      p1Cards: 0, p2Cards: 0,
    },
    usedT: '', usedL: '',
    createdAt: Date.now(),
  };
}

async function createRoom(name, emoji, mode) {
  if (!db) { $('config-warn').classList.remove('hidden'); return; }
  const code = genCode();
  try {
    await db.ref('rooms/'+code).set(makeRoom(name,emoji,mode));
    myRole='p1'; roomCode=code;
    saveId(); setURL(code);
    attachListener();
    $('share-code').textContent = code;
    goTo('s-waiting');
  } catch(e) { alert('Could not create room. Check Firebase config.'); console.error(e); }
}

async function joinRoom(code) {
  if (!db) { $('config-warn').classList.remove('hidden'); return; }
  code = code.toUpperCase().trim();
  if (!code||code.length<4) { showJoinErr('Enter a valid code.'); return; }
  try {
    const snap = await db.ref('rooms/'+code).get();
    if (!snap.exists()) { showJoinErr('Room not found. Check the code.'); return; }
    const d = snap.val();
    if (d.p2 && d.p2.joined && d.p2.connected) { showJoinErr('Room is full right now.'); return; }
    myRole='p2'; roomCode=code;
    saveId(); setURL(code);
    attachListener();
    if (d.p2 && d.p2.joined && d.p2.name) {
      $('share-code').textContent = code;
      goTo('s-waiting');
      return;
    }
    // First-time P2 setup
    $('setup-role-tag').textContent = 'Player 2';
    $('setup-role-tag').style.cssText = 'color:rgba(150,180,255,.9);background:rgba(42,61,139,.12);border-color:rgba(42,61,139,.3)';
    $('setup-avatar').classList.add('p2-style');
    buildEmojiGrid('p2');
    $('setup-room-code').textContent = code;
    $('mode-section').classList.add('hidden'); // P2 doesn't pick mode
    goTo('s-setup');
  } catch(e) { showJoinErr('Could not connect. Try again.'); console.error(e); }
}

function showJoinErr(msg) {
  const el=$('join-err'); el.textContent=msg; el.classList.remove('hidden');
  setTimeout(()=>el.classList.add('hidden'),4000);
}

async function submitSetup(name, emoji) {
  if (!db||!roomCode||!myRole) return;
  const u = { [myRole+'/name']:name, [myRole+'/emoji']:emoji, [myRole+'/ready']:true };
  if (myRole==='p2') u['p2/joined']=true;
  await db.ref('rooms/'+roomCode).update(u);
  if (myRole==='p2') {
    const s = await db.ref('rooms/'+roomCode).get();
    const d = s.val();
    if (d.p1&&d.p1.ready) await db.ref('rooms/'+roomCode+'/game').update({phase:'playing'});
  }
  $('share-code').textContent = roomCode;
  goTo('s-waiting');
}

function attachListener() {
  if (!db||!roomCode) return;
  roomRef = db.ref('rooms/'+roomCode);
  roomRef.on('value', snap=>{ if(!snap.exists()) return; roomSnap=snap.val(); onUpdate(roomSnap); });
  db.ref('.info/connected').on('value', s=>{
    if(s.val()&&roomCode&&myRole) {
      const pr = db.ref('rooms/'+roomCode+'/'+myRole+'/connected');
      pr.set(true); pr.onDisconnect().set(false);
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   ROOM UPDATE HANDLER
   ═══════════════════════════════════════════════════════════ */
function onUpdate(data) {
  if (!data) return;
  const g = data.game||{};

  if (cur==='s-waiting') {
    const other = myRole==='p1'?'p2':'p1';
    const partner = data[other]||{};
    if (partner.joined||partner.connected) {
      $('p-status-text').textContent = (partner.name||'Partner')+' is connected!';
      $('p-dot').classList.add('on');
    }
    if (g.phase==='playing') { initGameUI(data); goTo('s-game'); return; }
    if (data.p1&&data.p1.ready&&data.p2&&data.p2.ready&&g.phase!=='playing'&&g.phase!=='ended') {
      db.ref('rooms/'+roomCode+'/game').update({phase:'playing'});
    }
    return;
  }
  if (cur==='s-setup') { if(g.phase==='playing'){initGameUI(data);goTo('s-game');} return; }
  if (cur==='s-game')  { syncGame(data); }
  if (g.phase==='ended'&&cur==='s-game') { buildEnd(data); goTo('s-end'); }
}

/* ═══════════════════════════════════════════════════════════
   GAME UI
   ═══════════════════════════════════════════════════════════ */
function initGameUI(data) {
  const p1=data.p1||{}, p2=data.p2||{};
  $('bar-p1-emoji').textContent=$('mp-p1-emoji').textContent=p1.emoji||'🌹';
  $('bar-p1-name').textContent =$('mp-p1-name').textContent =p1.name ||'Player 1';
  $('bar-p2-emoji').textContent=$('mp-p2-emoji').textContent=p2.emoji||'🔥';
  $('bar-p2-name').textContent =$('mp-p2-name').textContent =p2.name ||'Player 2';
  activeMode = (data.game&&data.game.mode)||'random';
  syncGame(data);
}

function syncGame(data) {
  if (!data) return;
  const g  = data.game||{};
  const p1 = data.p1||{}, p2=data.p2||{};
  const mine = g.turn===myRole;
  const tp   = g.turn==='p1'?p1:p2;

  // Turn strip
  const strip = $('turn-strip');
  strip.className = 'turn-strip t-'+g.turn;
  $('turn-avi').textContent = tp.emoji||'♥';
  $('turn-label').textContent = mine ? 'Your turn' : 'Their turn';
  $('turn-name').textContent  = tp.name||(mine?'You':'Them');
  $('mode-pill').textContent  = MODE_NAMES[g.mode||'random']||'Random';

  // Menu stats
  $('mp-p1-cards').textContent = g.p1Cards||0;
  $('mp-p2-cards').textContent = g.p2Cards||0;
  $('mp-round').textContent    = g.round||1;
  $('mp-mode').textContent     = MODE_NAMES[g.mode||'random']||'Random';

  const cp = g.cardPhase||'idle';

  if (cp==='idle') {
    show('idle-mine', mine); show('idle-theirs', !mine);
    hide('game-card'); hide('row-actions'); hide('watch-footer');
    stopTimer();
    if (!mine) {
      $('wc-icon').textContent = tp.emoji||'⌛';
      $('wc-text').textContent = (tp.name||'They')+' is choosing…';
      $('watch-text').textContent = 'Watching '+(tp.name||'their')+' turn…';
    }
  } else if (cp==='shown') {
    hide('idle-mine'); hide('idle-theirs');
    show('game-card'); hide('watch-footer');
    show('row-actions', mine);
    show('watch-footer', !mine);
    renderCard(g.card, g.turn);
    if (g.cardDrawnAt) syncTimer(g.cardDrawnAt);
    if (!mine) $('watch-text').textContent = 'Watching '+(tp.name||'their')+' turn…';
  } else if (cp==='done') {
    hide('idle-mine'); hide('idle-theirs');
    show('game-card'); hide('row-actions'); hide('watch-footer');
    stopTimer();
    if (g.card) renderCard(g.card, g.turn);
  }
}

function renderCard(card, turn) {
  if (!card) return;
  const el = $('game-card');
  el.className = 'game-card '+(card.type==='truth'?'truth-card':'love-card')+' t-'+turn;
  $('gc-type').textContent = card.type==='truth' ? '❤️ TRUTH' : '🔥 LOVE';
  $('gc-cat').textContent  = card.cat||'—';
  $('gc-text').textContent = card.text||'…';
  $('gc-num').textContent  = '#'+(roomSnap&&roomSnap.game?roomSnap.game.cardsPlayed:'?');
  // Restore fav state
  const isFav = favorites.some(f=>f.text===card.text);
  $('fav-btn').textContent = isFav?'♥':'♡';
  $('fav-btn').classList.toggle('fav-active', isFav);
}

function show(id, vis=true) { if(vis){$(id).classList.remove('hidden');}else{$(id).classList.add('hidden');} }
function hide(id) { $(id).classList.add('hidden'); }

/* ── Timer ── */
function syncTimer(drawnAt) {
  stopTimer();
  const fill = $('timer-fill'), num = $('timer-num');
  const wrap = $('timer-wrap');
  wrap.classList.add('vis');
  const tick = ()=>{
    const left = Math.max(0, 60-((Date.now()-drawnAt)/1000));
    fill.style.width = (left/60*100)+'%';
    num.textContent = left<=0 ? '⏰' : Math.ceil(left);
    if(left<=15) fill.classList.add('warn'); else fill.classList.remove('warn');
  };
  tick(); timerInt=setInterval(tick,500);
}
function stopTimer() {
  clearInterval(timerInt); timerInt=null;
  $('timer-wrap').classList.remove('vis');
}

/* ═══════════════════════════════════════════════════════════
   GAME ACTIONS
   ═══════════════════════════════════════════════════════════ */
async function actionDraw(type) {
  if (!db||!roomCode||!roomSnap) return;
  const g=roomSnap.game||{};
  if (g.turn!==myRole||g.cardPhase!=='idle') return;

  const mode = g.mode||'random';
  const usedKey = type==='truth'?'usedT':'usedL';
  const { card, newUsed } = pickCard(type, mode, roomSnap[usedKey]||'');
  const cardKey = myRole==='p1'?'p1Cards':'p2Cards';

  await db.ref('rooms/'+roomCode).update({
    'game/card':      { type, text:card.text, cat:card.cat },
    'game/cardPhase': 'shown',
    'game/cardDrawnAt': Date.now(),
    'game/cardsPlayed': (g.cardsPlayed||0)+1,
    ['game/'+cardKey]: (g[cardKey.replace('game/','')]||(g.p1Cards||0))+1,
    [usedKey]: newUsed,
  });
}

async function actionSkipCard() {
  // Redraw same type (give partner a fresh card, no penalty)
  if (!db||!roomCode||!roomSnap) return;
  const g=roomSnap.game||{};
  if (g.turn!==myRole||g.cardPhase!=='shown') return;
  const type = g.card ? g.card.type : 'truth';
  const mode = g.mode||'random';
  const usedKey = type==='truth'?'usedT':'usedL';
  const { card, newUsed } = pickCard(type, mode, roomSnap[usedKey]||'');
  await db.ref('rooms/'+roomCode).update({
    'game/card':      { type, text:card.text, cat:card.cat },
    'game/cardDrawnAt': Date.now(),
    'game/cardsPlayed': (g.cardsPlayed||0)+1,
    [usedKey]: newUsed,
  });
}

async function actionDone() {
  if (!db||!roomCode||!roomSnap) return;
  const g=roomSnap.game||{};
  if (g.turn!==myRole||g.cardPhase!=='shown') return;
  await db.ref('rooms/'+roomCode+'/game').update({cardPhase:'done'});
  setTimeout(()=>advanceTurn(), 1800);
}

async function advanceTurn() {
  if (!db||!roomCode||!roomSnap) return;
  const g=roomSnap.game||{};
  const next = g.turn==='p1'?'p2':'p1';
  await db.ref('rooms/'+roomCode).update({
    'game/turn':      next,
    'game/card':      null,
    'game/cardPhase': 'idle',
    'game/cardDrawnAt': 0,
    'game/round': g.turn==='p2'?(g.round||1)+1:(g.round||1),
  });
}

async function actionFavorite() {
  if (!roomSnap||!roomSnap.game||!roomSnap.game.card) return;
  const card = roomSnap.game.card;
  const already = favorites.findIndex(f=>f.text===card.text);
  if (already>=0) {
    favorites.splice(already,1);
    $('fav-btn').textContent='♡'; $('fav-btn').classList.remove('fav-active');
  } else {
    favorites.push(card);
    $('fav-btn').textContent='♥'; $('fav-btn').classList.add('fav-active');
  }
}

async function endSession() {
  if (!db||!roomCode) return;
  await db.ref('rooms/'+roomCode+'/game').update({phase:'ended'});
}

/* ═══════════════════════════════════════════════════════════
   END SCREEN
   ═══════════════════════════════════════════════════════════ */
function buildEnd(data) {
  const g = data.game||{};
  $('stat-cards').textContent  = g.cardsPlayed||0;
  $('stat-rounds').textContent = g.round||1;
  $('stat-mode').textContent   = MODE_NAMES[g.mode||'random']||'Random';
  if (favorites.length>0) {
    $('fav-summary').classList.remove('hidden');
    $('fav-list').innerHTML = favorites.map(f=>
      `<div class="fav-item"><strong>${f.type==='truth'?'❤️ TRUTH':'🔥 LOVE'} · ${f.cat}</strong>${f.text}</div>`
    ).join('');
  }
  launchConfetti();
}

function launchConfetti() {
  const c=$('end-confetti'); c.innerHTML='';
  const cols=['#c9896a','#8b2a3e','#e8b89a','#2a3d8b','#f2e4d0'];
  for (let i=0;i<50;i++) {
    const p=document.createElement('div');
    p.className='conf-p';
    p.style.left=Math.random()*100+'vw';
    p.style.background=cols[i%cols.length];
    p.style.animationDuration=(1.5+Math.random()*3)+'s';
    p.style.animationDelay=(Math.random()*2)+'s';
    p.style.transform='rotate('+(Math.random()*360)+'deg)';
    c.appendChild(p);
  }
}

/* ═══════════════════════════════════════════════════════════
   EMOJI GRID
   ═══════════════════════════════════════════════════════════ */
function buildEmojiGrid(role) {
  const grid=$('emoji-grid'), disp=$('setup-emoji');
  const list=role==='p1'?P1_EMOJIS:P2_EMOJIS;
  grid.innerHTML=''; disp.textContent=list[0];
  list.forEach((em,i)=>{
    const s=document.createElement('span');
    s.textContent=em; if(i===0) s.classList.add('sel');
    s.addEventListener('click',()=>{
      grid.querySelectorAll('span').forEach(x=>x.classList.remove('sel'));
      s.classList.add('sel'); disp.textContent=em;
    });
    grid.appendChild(s);
  });
}

/* ═══════════════════════════════════════════════════════════
   SHARE LINK
   ═══════════════════════════════════════════════════════════ */
function getShareLink(code) { return window.location.origin+window.location.pathname+'#'+code; }

/* ═══════════════════════════════════════════════════════════
   EVENT LISTENERS
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', ()=>{
  initParticles();
  buildEmojiGrid('p1');

  // Pre-fill join code from URL
  const uc = codeFromURL();
  if (uc && uc.length >= 4) $('join-input').value = uc;

  // Mode cards
  document.querySelectorAll('.mode-card').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.mode-card').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      selectedMode=btn.dataset.mode;
    });
  });

  /* Navigation */
  $('btn-begin').addEventListener('click',()=>goTo('s-room'));
  $('btn-back-room').addEventListener('click',()=>goTo('s-landing'));

  /* Create room */
  $('btn-create').addEventListener('click',()=>{
    myRole='p1';
    $('setup-role-tag').textContent='Player 1';
    $('mode-section').classList.remove('hidden');
    buildEmojiGrid('p1');
    $('setup-room-code').textContent='—';
    goTo('s-setup');
  });

  /* Join room */
  $('btn-join').addEventListener('click',async()=>{
    const code=$('join-input').value.toUpperCase().trim();
    if(!code){showJoinErr('Enter the room code first.');return;}
    await joinRoom(code);
  });
  $('join-input').addEventListener('keydown',e=>{ if(e.key==='Enter') $('btn-join').click(); });

  /* Ready button */
  $('btn-ready').addEventListener('click',async()=>{
    const name=$('setup-name').value.trim()||(myRole==='p1'?'Player 1':'Player 2');
    const emoji=$('setup-emoji').textContent;
    if (myRole==='p1'&&!roomCode) {
      await createRoom(name, emoji, selectedMode);
    } else {
      await submitSetup(name, emoji);
    }
  });

  /* Copy link */
  $('btn-copy').addEventListener('click',()=>{
    const link=getShareLink(roomCode||$('share-code').textContent);
    navigator.clipboard.writeText(link).then(()=>{
      const btn=$('btn-copy');
      btn.classList.add('copied');
      btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      setTimeout(()=>{
        btn.classList.remove('copied');
        btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy Link';
      }, 2500);
    });
  });

  /* Game: Truth / Love buttons */
  $('btn-truth').addEventListener('click',()=>actionDraw('truth'));
  $('btn-love').addEventListener('click',()=>actionDraw('love'));

  /* Game: actions */
  $('btn-skip').addEventListener('click', actionSkipCard);
  $('btn-done').addEventListener('click', actionDone);
  $('fav-btn').addEventListener('click',  actionFavorite);

  /* Menu */
  $('btn-menu').addEventListener('click',()=>$('ov-menu').classList.remove('hidden'));
  $('close-menu').addEventListener('click',()=>$('ov-menu').classList.add('hidden'));
  $('ov-menu').addEventListener('click',e=>{ if(e.target===$('ov-menu')) $('ov-menu').classList.add('hidden'); });
  $('btn-end-session').addEventListener('click',async()=>{ $('ov-menu').classList.add('hidden'); await endSession(); });

  /* End screen */
  $('btn-again').addEventListener('click',()=>{
    clearId(); favorites=[];
    if(roomRef) roomRef.off();
    roomRef=null; roomCode=null; myRole=null; roomSnap=null;
    window.location.hash=''; goTo('s-room');
  });
  $('btn-home').addEventListener('click',()=>{
    clearId(); favorites=[];
    if(roomRef) roomRef.off();
    roomRef=null; roomCode=null; myRole=null; roomSnap=null;
    window.location.hash=''; goTo('s-landing');
  });

  /* Auto-rejoin */
  loadId();
  if (roomCode && myRole && FB_READY) {
    setURL(roomCode); $('share-code').textContent=roomCode;
    attachListener(); goTo('s-waiting');
  } else if (!roomCode) {
    const uc2=codeFromURL();
    if (uc2 && FB_READY) joinRoom(uc2);
  }
});
