# ✈ Flight DMI001

**Final boarding call for Elian Dmitri's 1st Birthday.**

This is a web invitation, dressed up as a flight booking site, for the last stop on Dmi's world tour.

You check in, you get the flight details, you get a boarding pass. That's the whole bit.

---

## How it flies (user flow)

1. **Landing** — clouds drift by, the plane's mid-flight, and there's one job here: hit Check In.
2. **Welcome** — a quick greeting, then it auto-navigates you to your flight details while an airplane spinner does the waiting for you.
3. **Flight Details** — the who, what, where, when.
4. **Check-In** — pop in your name and up to 3 +1s.
5. **Boarding Pass** — a real, downloadable boarding pass with your name on it. Screenshot it, flex it, whatever.
6. **The Guest List (admin)** — a quiet backstage dashboard, password-gated, so Dada and Mommy can see who's actually flying in.

---

## Built with

**Design**
- [Figma](https://figma.com) — every page, laid out before a single line of code.
- [Adobe Illustrator](https://www.adobe.com/products/illustrator.html) — every asset on this site.

**Framework & Language**
- [Nuxt 4](https://nuxt.com) — the app itself, pages, and the server routes doing the backend's job.
- [TypeScript](https://www.typescriptlang.org) — catches typos before they catch you.

**Styling & Motion**
- [Tailwind CSS](https://tailwindcss.com) — because my design system needs to be converted to code.
- [GSAP](https://gsap.com) — the clouds, the plane, the split-flap board: anything that moves.

**Backend & Data**
- [Supabase](https://supabase.com) — the database. Keeps track of who's actually coming.

**Hosted on**
- [Vercel](https://vercel.com) — because guests need somewhere to actually open the link.

---

## Getting started

```bash
npm install
npm run dev
```

Then go to `localhost:3000` and pretend you're checking in for a flight, because you are.

You'll need a `.env` with your Supabase project details and an admin password. See `.env.example`.

---

Concept, design, code — all Dada. Built for a one-year-old who will never read this README, but might one day appreciate that his tito overengineered his 1st birthday invitation.

*This one's for you, Lovey!*