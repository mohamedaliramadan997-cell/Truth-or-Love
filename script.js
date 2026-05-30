/* ═══════════════════════════════════════════════════════════
   TRUTH OR LOVE — Game Engine  (18+ couples game)
   One Phone + Two Phones (Firebase) · Three Intensity Levels
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
  catch(e) { console.warn('Firebase init:', e); }
}

/* ═══════════════════════════════════════════════════════════
   CONTENT — level: 1 (Sparks) · 2 (Flame) · 3 (Inferno)
   Higher levels include lower level content in the pool.
   ═══════════════════════════════════════════════════════════ */

const TRUTHS = [

  /* ─── LEVEL 1 — Sparks ─────────────────────────────────
     Romantic attraction, physical preferences, flirty tension  */
  { text:"What part of your body do you love being touched the most?", cat:"Attraction", lv:1 },
  { text:"What kind of kiss is your absolute favorite — slow and tender, or deep and urgent?", cat:"Attraction", lv:1 },
  { text:"What's the most attractive physical feature you notice about me first?", cat:"Attraction", lv:1 },
  { text:"What physical feature of mine do you find quietly irresistible?", cat:"Attraction", lv:1 },
  { text:"Where on your body are you most sensitive to a gentle touch?", cat:"Attraction", lv:1 },
  { text:"What does being physically close to me feel like?", cat:"Attraction", lv:1 },
  { text:"If I could kiss you anywhere right now, where would you want it?", cat:"Attraction", lv:1 },
  { text:"What's your love language when it comes to physical affection?", cat:"Attraction", lv:1 },
  { text:"What type of massage do you enjoy most — relaxing or more sensual?", cat:"Attraction", lv:1 },
  { text:"What's something I do physically that makes you weak?", cat:"Attraction", lv:1 },
  { text:"What part of my body do you love looking at most?", cat:"Attraction", lv:1 },
  { text:"When I look into your eyes for a long moment, what does it do to you?", cat:"Attraction", lv:1 },
  { text:"What does your ideal cuddle session with me look like in detail?", cat:"Attraction", lv:1 },
  { text:"What small physical gesture of mine makes you feel most desired?", cat:"Attraction", lv:1 },
  { text:"What outfit of mine do you find most attractive and why?", cat:"Attraction", lv:1 },
  { text:"How do you feel in your body when I first touch you after time apart?", cat:"Attraction", lv:1 },
  { text:"What was the moment in our relationship when you first felt genuine physical attraction to me?", cat:"Attraction", lv:1 },
  { text:"Describe the most romantic scene you could imagine us in right now.", cat:"Romance", lv:1 },
  { text:"What song would be the perfect soundtrack to a romantic evening between us?", cat:"Romance", lv:1 },
  { text:"What's your preferred way to be kissed goodnight?", cat:"Romance", lv:1 },
  { text:"If we were slow dancing right now, how close would you want to be?", cat:"Romance", lv:1 },
  { text:"What's the most romantic thing I've ever done for you?", cat:"Romance", lv:1 },
  { text:"What kind of physical intimacy feels the most connecting to you?", cat:"Romance", lv:1 },
  { text:"What does the perfect first kiss between us look and feel like to you?", cat:"Romance", lv:1 },
  { text:"What touch from me always sends a shiver down your spine?", cat:"Romance", lv:1 },
  { text:"What's a body part you wish I paid more attention to?", cat:"Romance", lv:1 },
  { text:"What's something about your body you'd love me to admire more?", cat:"Romance", lv:1 },
  { text:"What does physical closeness with me do to your mood?", cat:"Romance", lv:1 },
  { text:"What moment in our physical relationship made you feel most seen and wanted?", cat:"Romance", lv:1 },
  { text:"What's the first physical detail you remember noticing about me?", cat:"Romance", lv:1 },

  /* ─── LEVEL 2 — Flame ──────────────────────────────────
     Deeper desires, intimate preferences, what they want  */
  { text:"What's a physical fantasy you've had about us that you haven't shared yet?", cat:"Desire", lv:2 },
  { text:"Where on your body do you most love being kissed, and why?", cat:"Desire", lv:2 },
  { text:"What do you find most physically arousing about me?", cat:"Desire", lv:2 },
  { text:"If you could choose exactly how I would touch you right now, what would it be?", cat:"Desire", lv:2 },
  { text:"What's the part of making out with me that you love the most?", cat:"Desire", lv:2 },
  { text:"What does desire actually feel like in your body — describe it?", cat:"Desire", lv:2 },
  { text:"What intimate act do you think creates the deepest connection between us?", cat:"Desire", lv:2 },
  { text:"What's the most sensual thing I've ever done to you?", cat:"Desire", lv:2 },
  { text:"Where do you want my hands when we're kissing?", cat:"Desire", lv:2 },
  { text:"What's a part of my body you can't stop thinking about touching?", cat:"Desire", lv:2 },
  { text:"If I were giving you a massage right now, where would you want me to start?", cat:"Desire", lv:2 },
  { text:"What do you think about in the moments just before we kiss?", cat:"Desire", lv:2 },
  { text:"What's something about our physical connection that has surprised you?", cat:"Desire", lv:2 },
  { text:"When we're intimate, what do you need more of?", cat:"Desire", lv:2 },
  { text:"What's one thing you'd love me to do differently when we're being intimate?", cat:"Desire", lv:2 },
  { text:"What does your ideal foreplay look like — in complete detail?", cat:"Desire", lv:2 },
  { text:"What's the most vulnerable you've ever felt physically with me?", cat:"Desire", lv:2 },
  { text:"What does your body need from me that you rarely ask for?", cat:"Desire", lv:2 },
  { text:"What's a piece of clothing or look you'd love to see me in?", cat:"Desire", lv:2 },
  { text:"What scent or sensation of mine do you find most attractive?", cat:"Desire", lv:2 },
  { text:"How do you feel in your body when we're physically close and things start to heat up?", cat:"Desire", lv:2 },
  { text:"What's something physical I do that drives you absolutely crazy?", cat:"Desire", lv:2 },
  { text:"What's something you've always wanted to do with me but haven't suggested?", cat:"Desire", lv:2 },
  { text:"What intimate position or setting with me do you think about most?", cat:"Desire", lv:2 },
  { text:"What do you love most about how we feel together physically?", cat:"Desire", lv:2 },
  { text:"If you had complete freedom to tell me what to do for one hour, what would you say?", cat:"Desire", lv:2 },
  { text:"When we're close and the tension is building, what goes through your mind?", cat:"Desire", lv:2 },
  { text:"What physical boundary are you comfortable pushing further with me?", cat:"Desire", lv:2 },
  { text:"What's the most you've ever wanted me in a single moment — what triggered it?", cat:"Desire", lv:2 },
  { text:"Describe in full detail what an ideal intimate evening with me would look and feel like.", cat:"Desire", lv:2 },

  /* ─── LEVEL 3 — Inferno ────────────────────────────────
     Deepest desires, sexual preferences, bold honesty     */
  { text:"What's your deepest physical desire involving me that you've been holding back?", cat:"Deepest Desires", lv:3 },
  { text:"What do you want me to do to you that I haven't fully done yet?", cat:"Deepest Desires", lv:3 },
  { text:"What's your biggest physical turn-on that you've never said out loud before?", cat:"Deepest Desires", lv:3 },
  { text:"What does the most satisfying physical experience between us look like to you?", cat:"Deepest Desires", lv:3 },
  { text:"What's a sexual preference of yours I might not know about?", cat:"Deepest Desires", lv:3 },
  { text:"What do you hold back saying or doing during intimacy that you wish you wouldn't?", cat:"Deepest Desires", lv:3 },
  { text:"What fantasy have you played out in your mind more than once that involves me?", cat:"Deepest Desires", lv:3 },
  { text:"What part of your body do you most want me to worship — and how?", cat:"Deepest Desires", lv:3 },
  { text:"If you had complete control of everything between us tonight, what would happen?", cat:"Deepest Desires", lv:3 },
  { text:"What do you want me to whisper to you when we're being intimate?", cat:"Deepest Desires", lv:3 },
  { text:"What's the most explicitly you've thought about me — describe the moment?", cat:"Deepest Desires", lv:3 },
  { text:"What does your body need in intimacy that you rarely feel comfortable asking for?", cat:"Deepest Desires", lv:3 },
  { text:"What would make our physical connection feel more like exactly what you've always wanted?", cat:"Deepest Desires", lv:3 },
  { text:"What turns you on about me that you think would surprise me to hear?", cat:"Deepest Desires", lv:3 },
  { text:"What do you want from me physically that no one has ever fully given you?", cat:"Deepest Desires", lv:3 },
  { text:"What's a specific intimate act you want to experience with me that we haven't yet?", cat:"Deepest Desires", lv:3 },
  { text:"What's the dirtiest thought you've had about me this week?", cat:"Deepest Desires", lv:3 },
  { text:"If we could be somewhere completely private right now with no limits, what would you want to happen?", cat:"Deepest Desires", lv:3 },
  { text:"What do you want to know about what I like — something you've been curious but afraid to ask?", cat:"Deepest Desires", lv:3 },
  { text:"What does being completely desired by me feel like to you — what do you need to feel that?", cat:"Deepest Desires", lv:3 },
  { text:"What sexual fantasy have you wanted to tell me but couldn't find the moment?", cat:"Deepest Desires", lv:3 },
  { text:"What's one thing about how we are physically that you want to completely let go of all inhibition around?", cat:"Deepest Desires", lv:3 },
  { text:"What do you want me to do with complete confidence and no holding back?", cat:"Deepest Desires", lv:3 },
  { text:"What specific thing do you want to feel with me that you've always craved?", cat:"Deepest Desires", lv:3 },
  { text:"Tell me the one physical experience you want us to have that you haven't asked for yet.", cat:"Deepest Desires", lv:3 },
  { text:"What do you think about just after we've been intimate that you've never said?", cat:"Deepest Desires", lv:3 },
  { text:"What's the bravest, most honest thing you could tell me right now about what you want from our physical relationship?", cat:"Deepest Desires", lv:3 },
  { text:"What does the absolute best version of our intimate life together look like to you?", cat:"Deepest Desires", lv:3 },
  { text:"What's a desire of yours that you've always told yourself you'd never admit?", cat:"Deepest Desires", lv:3 },
  { text:"What would it feel like to be completely uninhibited with me — and what would you do?", cat:"Deepest Desires", lv:3 },
];

const LOVES = [

  /* ─── LEVEL 1 — Sparks ─────────────────────────────────
     Kissing, dancing, gentle touch, romantic gestures    */
  { text:"Kiss your partner softly on the lips — hold it for 20 full seconds. No rushing.", cat:"Kiss", lv:1 },
  { text:"Slow dance together for one complete song, bodies as close as possible.", cat:"Dance", lv:1 },
  { text:"Run your fingers slowly through your partner's hair for a full minute.", cat:"Touch", lv:1 },
  { text:"Look into your partner's eyes without looking away for 60 seconds.", cat:"Connection", lv:1 },
  { text:"Give your partner a 3-minute shoulder and neck massage.", cat:"Massage", lv:1 },
  { text:"Trace your fingertip slowly along your partner's jawline and collarbone.", cat:"Touch", lv:1 },
  { text:"Hold your partner from behind and whisper three things you find beautiful about them.", cat:"Connection", lv:1 },
  { text:"Kiss your partner once on each cheek, once on the forehead, then once on the lips — linger on each.", cat:"Kiss", lv:1 },
  { text:"Sit face to face, foreheads touching, breathe together for one full minute.", cat:"Connection", lv:1 },
  { text:"Give your partner a slow, deliberate kiss on the back of their hand.", cat:"Kiss", lv:1 },
  { text:"Run your hands slowly down your partner's arms while holding their gaze.", cat:"Touch", lv:1 },
  { text:"Lean in as if you're about to kiss your partner — stop one inch away — hold for 10 seconds. Then close the gap.", cat:"Kiss", lv:1 },
  { text:"Kiss your partner softly on the neck, just once — and then stay still.", cat:"Kiss", lv:1 },
  { text:"Hold your partner's face gently in both hands and study every detail for 30 seconds.", cat:"Connection", lv:1 },
  { text:"Give your partner a tight, slow hug for 90 seconds. Tell them one thing you love about them while holding them.", cat:"Connection", lv:1 },
  { text:"Lightly kiss your partner's fingertips, one by one.", cat:"Kiss", lv:1 },
  { text:"Sit with your partner in your lap or between your legs for 5 minutes — no agenda, just warmth.", cat:"Connection", lv:1 },
  { text:"Give your partner a 2-minute scalp massage.", cat:"Massage", lv:1 },
  { text:"Nuzzle your face into your partner's neck for 30 seconds — just breathe them in.", cat:"Touch", lv:1 },
  { text:"Kiss your partner on the shoulder, then the neck, then just below the ear.", cat:"Kiss", lv:1 },
  { text:"Put on your partner's favorite song and slow dance even if it has a fast tempo.", cat:"Dance", lv:1 },
  { text:"Gently trace your fingers along your partner's back for one full minute.", cat:"Touch", lv:1 },
  { text:"Lean into your partner's ear and tell them slowly what you love most about their body.", cat:"Connection", lv:1 },
  { text:"Give your partner a long, lingering kiss as if you won't see each other for a week.", cat:"Kiss", lv:1 },
  { text:"Ask your partner to close their eyes, then kiss them somewhere sweet and unexpected.", cat:"Kiss", lv:1 },
  { text:"Wrap your arms around your partner from behind and sway gently together for one song.", cat:"Dance", lv:1 },
  { text:"Look your partner in the eyes and describe their body using only beautiful, specific words.", cat:"Connection", lv:1 },
  { text:"Hold your partner's hand and trace the lines of their palm slowly with your fingertip.", cat:"Touch", lv:1 },
  { text:"Describe slowly and in detail what you want to do with your partner later tonight.", cat:"Connection", lv:1 },
  { text:"Dance with your partner with your forehead resting on theirs — eyes closed, no words.", cat:"Dance", lv:1 },

  /* ─── LEVEL 2 — Flame ──────────────────────────────────
     Making out, sensual massage, intimate touch, bold     */
  { text:"Make out with your partner passionately for 2 full minutes — no stopping.", cat:"Making Out", lv:2 },
  { text:"Give your partner a full back massage for 5 minutes — use your hands properly, take your time.", cat:"Massage", lv:2 },
  { text:"Kiss your partner everywhere on their neck and collarbone for one uninterrupted minute.", cat:"Kiss", lv:2 },
  { text:"Straddle your partner and hold eye contact for 30 seconds before kissing them.", cat:"Intimacy", lv:2 },
  { text:"Whisper the most intimate thing you've been wanting to say directly into their ear.", cat:"Connection", lv:2 },
  { text:"Kiss your partner starting from their forehead and work slowly all the way down to their collar.", cat:"Kiss", lv:2 },
  { text:"Ask your partner to lie down and give them a slow 5-minute massage — wherever they want.", cat:"Massage", lv:2 },
  { text:"Make out for 3 minutes — hands allowed anywhere.", cat:"Making Out", lv:2 },
  { text:"Press your body fully against your partner's and stay completely still for one minute — just feel.", cat:"Intimacy", lv:2 },
  { text:"Kiss your way slowly across your partner's shoulders and down their spine.", cat:"Kiss", lv:2 },
  { text:"Give your partner a 5-minute foot and calf massage while maintaining full eye contact.", cat:"Massage", lv:2 },
  { text:"Sit in your partner's lap facing them — no kissing for 2 minutes — just look at each other and touch.", cat:"Intimacy", lv:2 },
  { text:"Have your partner lie down; kiss a slow trail from their neck to their waist over their clothing.", cat:"Kiss", lv:2 },
  { text:"Massage your partner's chest and stomach slowly for 3 minutes.", cat:"Massage", lv:2 },
  { text:"Give your partner a 1-minute passionate kiss while your hands are in their hair.", cat:"Making Out", lv:2 },
  { text:"Pull your partner close by the waist and kiss them deeply for 90 seconds without breaking.", cat:"Making Out", lv:2 },
  { text:"Ask your partner what their favorite physical feeling is — then do exactly that for one minute.", cat:"Intimacy", lv:2 },
  { text:"Kiss your partner so slowly they lose track of time — make it last at least 3 minutes.", cat:"Making Out", lv:2 },
  { text:"Give your partner a sensual inner arm and wrist massage while whispering what you want.", cat:"Massage", lv:2 },
  { text:"Get close enough to feel your partner's breath — don't kiss — hold for 30 seconds. Then kiss.", cat:"Kiss", lv:2 },
  { text:"Have your partner lie on their stomach; give their full back a slow 7-minute massage.", cat:"Massage", lv:2 },
  { text:"Take turns — 30 seconds kissing however you want, alternating for 5 rounds each.", cat:"Making Out", lv:2 },
  { text:"Stand behind your partner, hands on their shoulders, and kiss the back of their neck slowly.", cat:"Kiss", lv:2 },
  { text:"Make out while one person is sitting and the other is standing over them — 2 minutes.", cat:"Making Out", lv:2 },
  { text:"Tell your partner exactly how they make you feel physically — say it all out loud while you hold them.", cat:"Connection", lv:2 },
  { text:"Give your partner a full head-to-toe body massage — take as long as you both want.", cat:"Massage", lv:2 },
  { text:"Lie together in complete silence for 3 minutes — touch whatever feels natural.", cat:"Intimacy", lv:2 },
  { text:"Describe to your partner in complete detail what their body does to you — hold nothing back.", cat:"Connection", lv:2 },
  { text:"Have a full make-out session where one partner is completely in control — 3 minutes.", cat:"Making Out", lv:2 },
  { text:"Kiss your partner passionately against a wall for 2 minutes — one of you pins the other.", cat:"Making Out", lv:2 },

  /* ─── LEVEL 3 — Inferno ────────────────────────────────
     Bold, deeply intimate, fully expressive desires       */
  { text:"Tell your partner explicitly, in full detail, exactly what you want them to do to you right now.", cat:"Bold", lv:3 },
  { text:"Make out with your partner for as long as you both possibly can — start the timer now.", cat:"Making Out", lv:3 },
  { text:"Spend 5 minutes kissing only the parts of your partner's body they ask you to.", cat:"Intimacy", lv:3 },
  { text:"Let your partner take complete control — you can only respond, never initiate — for 5 minutes.", cat:"Intimacy", lv:3 },
  { text:"Tell your partner every specific thing you want to do to them tonight — say all of it, hold nothing back.", cat:"Bold", lv:3 },
  { text:"Spend 10 minutes focused entirely on giving your partner physical pleasure — no reciprocation until done.", cat:"Intimacy", lv:3 },
  { text:"Ask your partner to show you exactly how they want to be kissed — then mirror it perfectly for 3 minutes.", cat:"Making Out", lv:3 },
  { text:"Tell your partner the one physical act you've been wanting most — then ask if they want to do it now.", cat:"Bold", lv:3 },
  { text:"Have your partner take control of everything for the next 10 minutes — you say yes to everything.", cat:"Intimacy", lv:3 },
  { text:"Ask your partner what their body needs most right now — and give it to them completely.", cat:"Intimacy", lv:3 },
  { text:"Kiss your partner for one full minute in the way you know drives them most completely crazy.", cat:"Making Out", lv:3 },
  { text:"Give your partner the most attentive, deeply focused intimate massage of their life — as long as it takes.", cat:"Massage", lv:3 },
  { text:"Tell your partner every detail of what you want tonight — then have them tell you theirs.", cat:"Bold", lv:3 },
  { text:"Have your partner direct you: they tell you exactly what to do, step by step — you follow every instruction.", cat:"Intimacy", lv:3 },
  { text:"Take turns — each person shows the other exactly what they want done to them. No holding back, no embarrassment.", cat:"Bold", lv:3 },
  { text:"Give your partner complete freedom to do whatever they want to you for 5 minutes — no hesitation.", cat:"Intimacy", lv:3 },
  { text:"Spend 10 minutes focused entirely on your partner's neck, ears, and the back of their neck.", cat:"Kiss", lv:3 },
  { text:"Make out as passionately as you ever have — no time limit, stop only when you both decide to.", cat:"Making Out", lv:3 },
  { text:"Whisper to your partner the most explicit version of your fantasy about them — in full detail.", cat:"Bold", lv:3 },
  { text:"Tell your partner everything you've ever wanted to say about their body but held back. Say it all.", cat:"Bold", lv:3 },
  { text:"Ask your partner to describe in explicit detail what they want to feel — then give them exactly that.", cat:"Intimacy", lv:3 },
  { text:"Spend 5 minutes slowly exploring your partner's body using only your lips — go wherever feels right.", cat:"Intimacy", lv:3 },
  { text:"Have a conversation about exactly what each of you wants physically — be completely honest, nothing is off the table.", cat:"Bold", lv:3 },
  { text:"Give your partner an entire body massage — every part — and ask them to guide your hands.", cat:"Massage", lv:3 },
  { text:"Let your partner tell you their deepest physical desire right now — then do your best to fulfill it.", cat:"Bold", lv:3 },
  { text:"Make out while your partner tells you exactly what they want next — and then give them exactly that.", cat:"Making Out", lv:3 },
  { text:"Spend as long as you want focused on the part of your partner's body they say is their most sensitive.", cat:"Intimacy", lv:3 },
  { text:"Both of you: say the one thing you've always wanted your partner to do but never asked for. Then decide together if you want to do it right now.", cat:"Bold", lv:3 },
  { text:"Have your partner lie completely still while you spend 5 minutes doing exactly what you've always wanted to do to them.", cat:"Intimacy", lv:3 },
  { text:"Tell your partner the single most intimate thing you want to feel with them — then make it happen.", cat:"Bold", lv:3 },
];

/* ═══════════════════════════════════════════════════════════
   LEVEL CONFIG
   ═══════════════════════════════════════════════════════════ */
const LEVEL_NAMES = { 1:'🔥 Sparks', 2:'🔥🔥 Flame', 3:'🔥🔥🔥 Inferno' };
const LEVEL_LABELS = { 1:'Sparks', 2:'Flame', 3:'Inferno' };

function getPool(type, level) {
  const all = type==='truth' ? TRUTHS : LOVES;
  return all.filter(c => c.lv <= level);
}

/* ═══════════════════════════════════════════════════════════
   EMOJIS
   ═══════════════════════════════════════════════════════════ */
const P1_EMOJIS = ['🌹','🌸','💖','🦋','🌺','✨','🌙','💎','🌷','🎀'];
const P2_EMOJIS = ['🔥','⚡','🦁','🎯','🌊','🏆','🌑','🛡️','💫','🌿'];

/* ═══════════════════════════════════════════════════════════
   APP STATE
   ═══════════════════════════════════════════════════════════ */
let playMode   = 'local';
let localState = null;
let myRole     = 'p1';
let roomCode   = null;
let roomRef    = null;
let roomSnap   = null;
let timerInt   = null;
let selLevel   = 1;         // chosen in online setup
let localLevel = 1;         // chosen in local setup
let favorites  = [];

const $ = id => document.getElementById(id);

/* ═══════════════════════════════════════════════════════════
   UNIFIED STATE LAYER
   ═══════════════════════════════════════════════════════════ */
function getState() { return playMode==='local' ? localState : roomSnap; }

async function setState(updates) {
  if (playMode==='local') {
    applyUpdates(localState, updates);
    syncGame(localState);
  } else {
    await db.ref('rooms/'+roomCode).update(updates);
  }
}

function applyUpdates(obj, updates) {
  for (const [path, value] of Object.entries(updates)) {
    const parts = path.split('/');
    let t = obj;
    for (let i=0; i<parts.length-1; i++) {
      if (t[parts[i]]==null||typeof t[parts[i]]!=='object') t[parts[i]]={};
      t = t[parts[i]];
    }
    t[parts[parts.length-1]] = value;
  }
}

/* ═══════════════════════════════════════════════════════════
   SCREEN NAV
   ═══════════════════════════════════════════════════════════ */
let cur = 's-landing';
function goTo(id) {
  const prev=document.getElementById(cur);
  if(prev){prev.classList.remove('active');prev.classList.add('exit-left');setTimeout(()=>prev.classList.remove('exit-left'),600);}
  cur=id; document.getElementById(id).classList.add('active'); window.scrollTo(0,0);
}

/* ═══════════════════════════════════════════════════════════
   PARTICLES
   ═══════════════════════════════════════════════════════════ */
function initParticles() {
  const c=$('particles');
  for(let i=0;i<14;i++){
    const p=document.createElement('div');
    p.className='heart-p'; p.textContent=Math.random()>.5?'♥':'✦';
    p.style.left=Math.random()*100+'vw';
    p.style.animationDuration=(16+Math.random()*22)+'s';
    p.style.animationDelay=(Math.random()*20)+'s';
    p.style.fontSize=(8+Math.random()*10)+'px';
    c.appendChild(p);
  }
}

/* ═══════════════════════════════════════════════════════════
   IDENTITY
   ═══════════════════════════════════════════════════════════ */
function saveId()  { localStorage.setItem('tol_role',myRole); localStorage.setItem('tol_room',roomCode); }
function loadId()  { myRole=localStorage.getItem('tol_role')||'p1'; roomCode=localStorage.getItem('tol_room'); }
function clearId() { localStorage.removeItem('tol_role'); localStorage.removeItem('tol_room'); }
function genCode() { return Math.random().toString(36).substr(2,6).toUpperCase(); }
function codeFromURL() { return window.location.hash.slice(1).toUpperCase()||null; }
function setURL(code)  { window.location.hash=code; }

/* ═══════════════════════════════════════════════════════════
   CARD PICKING
   ═══════════════════════════════════════════════════════════ */
function shuffle(a) {
  const b=[...a];
  for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}
  return b;
}
function pickCard(type, level, usedStr) {
  const pool=getPool(type, level);
  const used=usedStr?usedStr.split(',').map(Number).filter(n=>!isNaN(n)):[];
  const avail=pool.reduce((a,_,i)=>{if(!used.includes(i))a.push(i);return a;},[]);
  const final=avail.length>0?avail:pool.map((_,i)=>i);
  const idx=shuffle(final)[0];
  const card=pool[idx];
  const newUsed=(avail.length>0?[...used,idx]:[idx]).join(',');
  return {card,newUsed};
}

/* ═══════════════════════════════════════════════════════════
   LOCAL GAME
   ═══════════════════════════════════════════════════════════ */
function initLocalGame(p1Name, p1Emoji, p2Name, p2Emoji, level) {
  myRole='p1'; playMode='local';
  localState = {
    p1:{name:p1Name,emoji:p1Emoji,ready:true},
    p2:{name:p2Name,emoji:p2Emoji,ready:true},
    game:{phase:'playing',turn:'p1',round:1,cardsPlayed:0,level,card:null,cardPhase:'idle',cardDrawnAt:0,p1Cards:0,p2Cards:0},
    usedT:'',usedL:'',
  };
  $('bar-p1-emoji').textContent=$('mp-p1-emoji').textContent=p1Emoji;
  $('bar-p1-name').textContent =$('mp-p1-name').textContent =p1Name;
  $('bar-p2-emoji').textContent=$('mp-p2-emoji').textContent=p2Emoji;
  $('bar-p2-name').textContent =$('mp-p2-name').textContent =p2Name;
  syncGame(localState);
  goTo('s-game');
}

/* ═══════════════════════════════════════════════════════════
   ONLINE FIREBASE
   ═══════════════════════════════════════════════════════════ */
function makeRoom(name, emoji, level) {
  return {
    p1:{name,emoji,ready:true},
    p2:{name:'',emoji:'',ready:false,joined:false},
    game:{phase:'waiting_p2',turn:'p1',round:1,cardsPlayed:0,level,card:null,cardPhase:'idle',cardDrawnAt:0,p1Cards:0,p2Cards:0},
    usedT:'',usedL:'',createdAt:Date.now(),
  };
}
async function createRoom(name, emoji, level) {
  if(!db){$('config-warn').classList.remove('hidden');return;}
  const code=genCode();
  try {
    await db.ref('rooms/'+code).set(makeRoom(name,emoji,level));
    myRole='p1'; roomCode=code;
    saveId(); setURL(code); attachListener();
    $('share-code').textContent=code;
    goTo('s-waiting');
  } catch(e){alert('Could not create room. Check Firebase config.');console.error(e);}
}
async function joinRoom(code) {
  if(!db){$('config-warn').classList.remove('hidden');return;}
  code=code.toUpperCase().trim();
  if(!code||code.length<4){showJoinErr('Enter a valid code.');return;}
  try {
    const snap=await db.ref('rooms/'+code).get();
    if(!snap.exists()){showJoinErr('Room not found. Check the code.');return;}
    const d=snap.val();
    if(d.p2&&d.p2.joined&&d.p2.connected){showJoinErr('Room is full right now.');return;}
    myRole='p2'; roomCode=code;
    saveId(); setURL(code); attachListener();
    if(d.p2&&d.p2.joined&&d.p2.name){$('share-code').textContent=code;goTo('s-waiting');return;}
    $('setup-role-tag').textContent='Player 2';
    $('setup-role-tag').style.cssText='color:rgba(150,180,255,.9);background:rgba(42,61,139,.12);border-color:rgba(42,61,139,.3)';
    $('setup-avatar').classList.add('p2-style');
    buildEmojiGrid('p2','emoji-grid','setup-emoji');
    $('setup-room-code').textContent=code;
    $('level-section').classList.add('hidden');
    goTo('s-setup');
  } catch(e){showJoinErr('Could not connect. Try again.');console.error(e);}
}
function showJoinErr(msg){
  const el=$('join-err');el.textContent=msg;el.classList.remove('hidden');
  setTimeout(()=>el.classList.add('hidden'),4000);
}
async function submitSetup(name,emoji){
  if(!db||!roomCode||!myRole)return;
  const u={[myRole+'/name']:name,[myRole+'/emoji']:emoji,[myRole+'/ready']:true};
  if(myRole==='p2')u['p2/joined']=true;
  await db.ref('rooms/'+roomCode).update(u);
  if(myRole==='p2'){
    const s=await db.ref('rooms/'+roomCode).get();
    const d=s.val();
    if(d.p1&&d.p1.ready)await db.ref('rooms/'+roomCode+'/game').update({phase:'playing'});
  }
  $('share-code').textContent=roomCode;
  goTo('s-waiting');
}
function attachListener(){
  if(!db||!roomCode)return;
  roomRef=db.ref('rooms/'+roomCode);
  roomRef.on('value',snap=>{if(!snap.exists())return;roomSnap=snap.val();onUpdate(roomSnap);});
  db.ref('.info/connected').on('value',s=>{
    if(s.val()&&roomCode&&myRole){
      const pr=db.ref('rooms/'+roomCode+'/'+myRole+'/connected');
      pr.set(true);pr.onDisconnect().set(false);
    }
  });
}
function onUpdate(data){
  if(!data)return;
  const g=data.game||{};
  if(cur==='s-waiting'){
    const other=myRole==='p1'?'p2':'p1';
    const partner=data[other]||{};
    if(partner.joined||partner.connected){
      $('p-status-text').textContent=(partner.name||'Partner')+' is connected!';
      $('p-dot').classList.add('on');
    }
    if(g.phase==='playing'){initGameUI(data);goTo('s-game');return;}
    if(data.p1&&data.p1.ready&&data.p2&&data.p2.ready&&g.phase!=='playing'&&g.phase!=='ended')
      db.ref('rooms/'+roomCode+'/game').update({phase:'playing'});
    return;
  }
  if(cur==='s-setup'){if(g.phase==='playing'){initGameUI(data);goTo('s-game');}return;}
  if(cur==='s-game')syncGame(data);
  if(g.phase==='ended'&&cur==='s-game'){buildEnd(data);goTo('s-end');}
}

/* ═══════════════════════════════════════════════════════════
   GAME UI
   ═══════════════════════════════════════════════════════════ */
function initGameUI(data){
  const p1=data.p1||{},p2=data.p2||{};
  $('bar-p1-emoji').textContent=$('mp-p1-emoji').textContent=p1.emoji||'🌹';
  $('bar-p1-name').textContent =$('mp-p1-name').textContent =p1.name||'Player 1';
  $('bar-p2-emoji').textContent=$('mp-p2-emoji').textContent=p2.emoji||'🔥';
  $('bar-p2-name').textContent =$('mp-p2-name').textContent =p2.name||'Player 2';
  syncGame(data);
}

function syncGame(data){
  if(!data)return;
  const g=data.game||{};
  const p1=data.p1||{},p2=data.p2||{};
  const mine = playMode==='local' ? true : g.turn===myRole;
  const tp = g.turn==='p1'?p1:p2;

  // Turn strip
  $('turn-strip').className='turn-strip t-'+g.turn;
  $('turn-avi').textContent=tp.emoji||'♥';
  $('turn-label').textContent=mine?'Your turn':'Their turn';
  $('turn-name').textContent=tp.name||(mine?'You':'Them');
  $('level-pill').textContent=LEVEL_NAMES[g.level||1]||'🔥 Sparks';
  $('mp-p1-cards').textContent=g.p1Cards||0;
  $('mp-p2-cards').textContent=g.p2Cards||0;
  $('mp-round').textContent=g.round||1;
  $('mp-level').textContent=LEVEL_LABELS[g.level||1]||'Sparks';

  const cp=g.cardPhase||'idle';
  if(cp==='idle'){
    show('idle-mine',mine);show('idle-theirs',!mine);
    hide('game-card');hide('row-actions');hide('watch-footer');
    stopTimer();
    if(!mine){$('wc-icon').textContent=tp.emoji||'⌛';$('wc-text').textContent=(tp.name||'They')+' is choosing…';}
  } else if(cp==='shown'){
    hide('idle-mine');hide('idle-theirs');
    show('game-card');show('row-actions',mine);
    show('watch-footer',!mine&&playMode==='online');
    renderCard(g.card,g.turn);
    if(g.cardDrawnAt)syncTimer(g.cardDrawnAt);
    if(!mine&&playMode==='online')$('watch-text').textContent='Watching '+(tp.name||'their')+' turn…';
  } else if(cp==='done'){
    hide('idle-mine');hide('idle-theirs');
    show('game-card');hide('row-actions');hide('watch-footer');
    stopTimer();
    if(g.card)renderCard(g.card,g.turn);
  }
}

function renderCard(card,turn){
  if(!card)return;
  const el=$('game-card');
  el.className='game-card '+(card.type==='truth'?'truth-card':'love-card')+' t-'+turn;
  $('gc-type').textContent=card.type==='truth'?'❤️ TRUTH':'🔥 LOVE';
  $('gc-cat').textContent=card.cat||'—';
  $('gc-text').textContent=card.text||'…';
  const s=getState();
  $('gc-num').textContent='#'+(s&&s.game?s.game.cardsPlayed:'?');
  const isFav=favorites.some(f=>f.text===card.text);
  $('fav-btn').textContent=isFav?'♥':'♡';
  $('fav-btn').classList.toggle('fav-active',isFav);
}

function show(id,vis=true){if(vis)$(id).classList.remove('hidden');else $(id).classList.add('hidden');}
function hide(id){$(id).classList.add('hidden');}

function syncTimer(drawnAt){
  stopTimer();
  const fill=$('timer-fill'),num=$('timer-num'),wrap=$('timer-wrap');
  wrap.classList.add('vis');
  const tick=()=>{
    const left=Math.max(0,60-((Date.now()-drawnAt)/1000));
    fill.style.width=(left/60*100)+'%';
    num.textContent=left<=0?'⏰':Math.ceil(left);
    if(left<=15)fill.classList.add('warn');else fill.classList.remove('warn');
  };
  tick();timerInt=setInterval(tick,500);
}
function stopTimer(){clearInterval(timerInt);timerInt=null;$('timer-wrap').classList.remove('vis');}

/* ═══════════════════════════════════════════════════════════
   GAME ACTIONS
   ═══════════════════════════════════════════════════════════ */
async function actionDraw(type){
  const s=getState();if(!s)return;
  const g=s.game||{};
  if(playMode==='online'&&g.turn!==myRole)return;
  if(g.cardPhase!=='idle')return;
  const level=g.level||1;
  const usedKey=type==='truth'?'usedT':'usedL';
  const {card,newUsed}=pickCard(type,level,s[usedKey]||'');
  const cardKey=g.turn==='p1'?'p1Cards':'p2Cards';
  await setState({
    'game/card':       {type,text:card.text,cat:card.cat},
    'game/cardPhase':  'shown',
    'game/cardDrawnAt': Date.now(),
    'game/cardsPlayed': (g.cardsPlayed||0)+1,
    ['game/'+cardKey]:  (g[cardKey]||0)+1,
    [usedKey]: newUsed,
  });
}

async function actionSkipCard(){
  const s=getState();if(!s)return;
  const g=s.game||{};
  if(playMode==='online'&&g.turn!==myRole)return;
  if(g.cardPhase!=='shown')return;
  const type=g.card?g.card.type:'truth';
  const level=g.level||1;
  const usedKey=type==='truth'?'usedT':'usedL';
  const {card,newUsed}=pickCard(type,level,s[usedKey]||'');
  await setState({
    'game/card':       {type,text:card.text,cat:card.cat},
    'game/cardDrawnAt': Date.now(),
    'game/cardsPlayed': (g.cardsPlayed||0)+1,
    [usedKey]: newUsed,
  });
}

async function actionDone(){
  const s=getState();if(!s)return;
  const g=s.game||{};
  if(playMode==='online'&&g.turn!==myRole)return;
  if(g.cardPhase!=='shown')return;
  await setState({'game/cardPhase':'done'});
  setTimeout(()=>advanceTurn(), playMode==='local'?400:1800);
}

async function advanceTurn(){
  const s=getState();if(!s)return;
  const g=s.game||{};
  const next=g.turn==='p1'?'p2':'p1';
  await setState({
    'game/turn':       next,
    'game/card':       null,
    'game/cardPhase':  'idle',
    'game/cardDrawnAt': 0,
    'game/round': g.turn==='p2'?(g.round||1)+1:(g.round||1),
  });
  if(playMode==='local'){
    myRole=next;
    const nextP=next==='p1'?localState.p1:localState.p2;
    $('pass-name').textContent=nextP.name;
    $('pass-emoji').textContent=nextP.emoji;
    $('ov-pass').classList.remove('hidden');
  }
}

async function actionFavorite(){
  const s=getState();if(!s||!s.game||!s.game.card)return;
  const card=s.game.card;
  const i=favorites.findIndex(f=>f.text===card.text);
  if(i>=0){favorites.splice(i,1);$('fav-btn').textContent='♡';$('fav-btn').classList.remove('fav-active');}
  else{favorites.push(card);$('fav-btn').textContent='♥';$('fav-btn').classList.add('fav-active');}
}

async function endSession(){
  if(playMode==='local'){buildEnd(localState);goTo('s-end');}
  else if(db&&roomCode){await db.ref('rooms/'+roomCode+'/game').update({phase:'ended'});}
}

/* ═══════════════════════════════════════════════════════════
   END
   ═══════════════════════════════════════════════════════════ */
function buildEnd(data){
  const g=data.game||{};
  $('stat-cards').textContent=g.cardsPlayed||0;
  $('stat-rounds').textContent=g.round||1;
  $('stat-level').textContent=LEVEL_LABELS[g.level||1]||'Sparks';
  if(favorites.length>0){
    $('fav-summary').classList.remove('hidden');
    $('fav-list').innerHTML=favorites.map(f=>`<div class="fav-item"><strong>${f.type==='truth'?'❤️ TRUTH':'🔥 LOVE'} · ${f.cat}</strong>${f.text}</div>`).join('');
  }
  const c=$('end-confetti');c.innerHTML='';
  const cols=['#c9896a','#8b2a3e','#e8b89a','#2a3d8b','#f2e4d0'];
  for(let i=0;i<50;i++){
    const p=document.createElement('div');p.className='conf-p';
    p.style.left=Math.random()*100+'vw';p.style.background=cols[i%cols.length];
    p.style.animationDuration=(1.5+Math.random()*3)+'s';
    p.style.animationDelay=(Math.random()*2)+'s';
    p.style.transform='rotate('+(Math.random()*360)+'deg)';
    c.appendChild(p);
  }
}

/* ═══════════════════════════════════════════════════════════
   EMOJI & LEVEL GRID BUILDERS
   ═══════════════════════════════════════════════════════════ */
function buildEmojiGrid(role,gridId,displayId){
  const grid=$(gridId),disp=$(displayId);
  const list=role==='p1'?P1_EMOJIS:P2_EMOJIS;
  grid.innerHTML='';disp.textContent=list[0];
  list.forEach((em,i)=>{
    const s=document.createElement('span');
    s.textContent=em;if(i===0)s.classList.add('sel');
    s.addEventListener('click',()=>{
      grid.querySelectorAll('span').forEach(x=>x.classList.remove('sel'));
      s.classList.add('sel');disp.textContent=em;
    });
    grid.appendChild(s);
  });
}

function initLevelGrid(gridId, onChange){
  document.querySelectorAll('#'+gridId+' .level-card').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#'+gridId+' .level-card').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      onChange(parseInt(btn.dataset.level,10));
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   RESET
   ═══════════════════════════════════════════════════════════ */
function resetAll(){
  clearId();favorites=[];localState=null;
  if(roomRef)roomRef.off();
  roomRef=null;roomCode=null;myRole='p1';roomSnap=null;playMode='local';
  window.location.hash='';
  hide('game-card');hide('row-actions');hide('watch-footer');
  show('idle-mine');hide('idle-theirs');
}

/* ═══════════════════════════════════════════════════════════
   EVENT LISTENERS
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded',()=>{
  initParticles();
  buildEmojiGrid('p1','emoji-grid','setup-emoji');
  buildEmojiGrid('p1','lp1-grid','lp1-emoji');
  buildEmojiGrid('p2','lp2-grid','lp2-emoji');

  const uc=codeFromURL();
  if(uc&&uc.length>=4)$('join-input').value=uc;

  // Level grids
  initLevelGrid('local-level-grid',  lv=>{ localLevel=lv; });
  initLevelGrid('online-level-grid', lv=>{ selLevel=lv;   });

  /* Landing */
  $('btn-begin').addEventListener('click',()=>goTo('s-mode'));
  $('btn-back-mode').addEventListener('click',()=>goTo('s-landing'));

  /* Play mode */
  $('btn-local').addEventListener('click',()=>{ playMode='local'; goTo('s-local-setup'); });
  $('btn-online').addEventListener('click',()=>{ playMode='online'; goTo('s-room'); });

  /* Local setup */
  $('btn-back-local').addEventListener('click',()=>goTo('s-mode'));
  $('btn-start-local').addEventListener('click',()=>{
    const n1=$('lp1-name').value.trim()||'Player 1';
    const e1=$('lp1-emoji').textContent;
    const n2=$('lp2-name').value.trim()||'Player 2';
    const e2=$('lp2-emoji').textContent;
    initLocalGame(n1,e1,n2,e2,localLevel);
  });

  /* Online room */
  $('btn-back-room').addEventListener('click',()=>goTo('s-mode'));
  $('btn-create').addEventListener('click',()=>{
    myRole='p1';
    $('setup-role-tag').textContent='Player 1';
    $('level-section').classList.remove('hidden');
    buildEmojiGrid('p1','emoji-grid','setup-emoji');
    $('setup-room-code').textContent='—';
    goTo('s-setup');
  });
  $('btn-join').addEventListener('click',async()=>{
    const code=$('join-input').value.toUpperCase().trim();
    if(!code){$('join-err').textContent='Enter the code first.';$('join-err').classList.remove('hidden');return;}
    await joinRoom(code);
  });
  $('join-input').addEventListener('keydown',e=>{if(e.key==='Enter')$('btn-join').click();});

  /* Online setup */
  $('btn-ready').addEventListener('click',async()=>{
    const name=$('setup-name').value.trim()||(myRole==='p1'?'Player 1':'Player 2');
    const emoji=$('setup-emoji').textContent;
    if(myRole==='p1'&&!roomCode){ await createRoom(name,emoji,selLevel); }
    else { await submitSetup(name,emoji); }
  });

  /* Copy link */
  $('btn-copy').addEventListener('click',()=>{
    const link=window.location.origin+window.location.pathname+'#'+(roomCode||$('share-code').textContent);
    navigator.clipboard.writeText(link).then(()=>{
      const btn=$('btn-copy');btn.classList.add('copied');
      btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      setTimeout(()=>{btn.classList.remove('copied');btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy Link';},2500);
    });
  });

  /* Game */
  $('btn-truth').addEventListener('click',()=>actionDraw('truth'));
  $('btn-love').addEventListener('click', ()=>actionDraw('love'));
  $('btn-skip').addEventListener('click', actionSkipCard);
  $('btn-done').addEventListener('click', actionDone);
  $('fav-btn').addEventListener('click',  actionFavorite);

  /* Pass the phone */
  $('btn-pass-ready').addEventListener('click',()=>{
    $('ov-pass').classList.add('hidden');
    syncGame(localState);
  });

  /* Menu */
  $('btn-menu').addEventListener('click',()=>$('ov-menu').classList.remove('hidden'));
  $('close-menu').addEventListener('click',()=>$('ov-menu').classList.add('hidden'));
  $('ov-menu').addEventListener('click',e=>{if(e.target===$('ov-menu'))$('ov-menu').classList.add('hidden');});
  $('btn-end-session').addEventListener('click',async()=>{ $('ov-menu').classList.add('hidden'); await endSession(); });

  /* End */
  $('btn-again').addEventListener('click',()=>{ resetAll(); goTo('s-mode'); });
  $('btn-home').addEventListener('click', ()=>{ resetAll(); goTo('s-landing'); });

  /* Auto-rejoin */
  loadId();
  if(roomCode&&myRole&&FB_READY){
    playMode='online'; setURL(roomCode); $('share-code').textContent=roomCode;
    attachListener(); goTo('s-waiting');
  } else if(!roomCode){
    const uc2=codeFromURL();
    if(uc2&&FB_READY){ playMode='online'; joinRoom(uc2); }
  }
});
