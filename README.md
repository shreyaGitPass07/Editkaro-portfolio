# [editkaro.in] — The Edit Room 🎬

> A cinematic dark-themed video editing portfolio website built as part of an internship assignment at **Vault of Codes**.

---

## ⚠️ Disclaimer

This is a **demo portfolio** created for educational purposes as part of a web development assignment. All videos embedded in this site are sourced from **YouTube** and are used as placeholder content only. They do **not** represent actual work produced by Editkaro.in.

---

## 📌 About the Project

This project is a fully responsive, single-page portfolio website for **Editkaro.in**, a fictional social media marketing and video editing agency. The site showcases various categories of video editing work through an interactive, filterable video gallery with a cinematic dark aesthetic.

Built with pure **HTML, CSS, and vanilla JavaScript** — no frameworks or libraries.

---

## ✨ Features

- **Cinematic Dark Theme** — Electric Violet + Amber accent palette with film grain and scanline overlays
- **Filterable Video Gallery** — Browse work by category: Short-Form, Long-Form, Gaming, Football, eCommerce Ads, Documentary, Color Grading, Anime, and Ads
- **Lightbox Video Player** — Click any card to watch the video in an embedded YouTube lightbox
- **Animated Stats Counter** — Numbers animate into view on scroll
- **Scroll Reveal Animations** — Cards fade and slide in with staggered delays using Intersection Observer
- **Hero Parallax Effect** — Subtle parallax on scroll for depth
- **3D Card Tilt on Hover** — Perspective tilt effect on desktop (hover devices only)
- **Sticky Navbar** — Frosted glass effect with scroll-triggered shadow
- **Responsive Mobile Menu** — Hamburger menu with animated X transition
- **Draggable Filter Bar** — Horizontal drag-to-scroll on mobile
- **Dismissible Disclaimer Banner** — Amber-styled notice with smooth close animation
- **Smooth Anchor Scrolling** — All nav links scroll smoothly with navbar offset

---

## 🗂️ File Structure

```
editkaro-portfolio/
├── index.html      # Main HTML structure
├── style.css       # All styles (tokens, layout, components, animations, responsive)
└── script.js       # All interactivity (filter, lightbox, scroll reveal, parallax, etc.)
```

---

## 🎨 Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0c` | Page background |
| `--accent` | `#8b5cf6` | Electric Violet — primary accent |
| `--amber` | `#f59e0b` | Amber — secondary accent |
| `--font-display` | Bebas Neue | Headings |
| `--font-body` | Inter | Body text |
| `--font-mono` | Space Mono | Labels, tags, code-style elements |

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `> 1024px` | 3-column video grid |
| `≤ 1024px` | 2-column video grid |
| `≤ 768px` | Single column, hamburger menu |
| `≤ 480px` | Stacked CTA buttons, compact navbar |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, Animations, Intersection Observer API
- **Vanilla JavaScript** — No frameworks
- **Google Fonts** — Bebas Neue, Inter, Space Mono
- **YouTube IFrame API** — Embedded video playback

