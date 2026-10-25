# Nagendra Portfolio V6 — Prism Glass

A responsive Java Full Stack Developer portfolio with a colourful glassmorphism design. The default theme is deep midnight glass with aqua, orchid, and rose highlights; a warm, airy frosted-glass light theme is available using the theme toggle.

## Features
- Frosted-glass cards with translucency, backdrop blur, luminous edges, and soft colour blooms
- Iridescent gradient headings and aqua/lilac/rose accent palette
- Profile image, GitHub and LinkedIn links, LeetCode profile card
- Automatic public repository discovery through the GitHub API
- Project search, filters, sort/view controls, and interactive project detail dialogs
- Live GitHub profile signals and graceful fallbacks
- Keyboard command palette (Ctrl/⌘ + K), quick project search (`/`), mobile navigation
- Responsive layout, reduced-motion support, theme persistence
- Contact form that opens a prepared email draft; it does not send or save messages itself

## Run locally
1. Extract the ZIP.
2. Open this folder in Visual Studio Code.
3. Start `index.html` with Live Server, or serve the folder with any static web server.
4. Keep an internet connection enabled for GitHub statistics, Google Fonts, Font Awesome, and the third-party LeetCode card.

## Publish on GitHub Pages
Copy the folder contents into the root of `nagendra5b9/nagendras.github.io` (after backing up the existing repository), commit, and push to the branch configured in Settings → Pages. The existing resume is linked from the existing raw GitHub file URL.

## Theme architecture
- `style.css`: layout and component base styles
- `glass-theme.css`: V6 color system and frosted-glass overrides
- `script.js`: interactive behaviour and GitHub repository loading
- `assets/favicon.svg`: Prism Glass favicon

The project library automatically shows new public repositories after refresh. It cannot show private repositories through this public site, and the website has not been pushed or deployed by this package creation.
