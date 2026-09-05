
How it works (implementation notes)
- script.js defines:
  - `randomHexColor()` — returns a random `#RRGGBB` hex string.
  - `generatePalette()` — creates 5 random colors and inserts `.color-box` elements into `.palette-container`.
  - Copy handling — event delegation on `.palette-container` detects clicks on color blocks or copy icons and uses `navigator.clipboard.writeText()` to copy the hex value. A small UI feedback replaces the copy icon with a check for one second.
- Styling is implemented in `style.css` — grid layout for palette boxes, hover effects, and responsive adjustments for smaller screens.
- Markup in `index.html` includes a sample initial palette; `Generate` replaces the palette with new colors.

How to run
- Easiest (no server):
  1. Clone the repo:
     git clone https://github.com/shivansh-ojha09/ColorPalettGenerator.git
  2. Open `index.html` in your browser.

- With a simple local server (recommended for some browser clipboard behaviors):
  - Python 3:
    python -m http.server 8000
    then open http://localhost:8000
  - Or use the "Live Server" extension in VS Code.

Usage
- Click "Generate palette" to generate 5 new colors.
- Click any color block or the copy icon to copy its HEX value.
- After copying, the copy icon will briefly change to a check and turn green.

Extending this project (ideas)
- Allow choosing palette size (3–10 colors).
- Save favorites to localStorage or export palettes as JSON/CSS.
- Add color harmony generation (complementary, triadic, analogous).
- Add keyboard accessibility and ARIA attributes for improved usability.
- Add contrast checking and suggestions for accessible text colors on each swatch.

Accessibility notes
- Current implementation relies on mouse/touch events; consider adding keyboard focus and enter/space handling for copy actions.
- Add ARIA labels for the copy buttons and ensure the color containers are focusable.

Tests & CI
- There are no automated tests or CI pipelines yet. A simple next step is to add a GitHub Actions workflow that lints JS/CSS and runs static checks.

Contributing
- Contributions are welcome — open an issue or submit a pull request.
- Suggested workflow:
  1. Fork the repo.
  2. Create a feature branch:
  3. Make changes and test locally.
  4. Open a pull request describing your change.

Suggested license
- MIT License is recommended for permissive use. To apply it, add an appropriate `LICENSE` file.

Acknowledgements
- Icons from Font Awesome (CDN link included in `index.html`).
- Designed and implemented as a small learning/utility project.

Contact
- Author: shivansh-ojha09
- GitHub: https://github.com/shivansh-ojha09/ColorPalettGenerator
