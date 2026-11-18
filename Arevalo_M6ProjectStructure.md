# M6 project structure

## Before

- `Arevalo_portfolio3.html` had the page content, header, navigation, work cards, and services in one file.
- `Arevalo_Style2.css` was separate, but several selectors did not match the HTML classes. Some of those rules were unused.
- The navigation pointed to sections that were missing or had different IDs.
- There was no separate JavaScript file for the settings feature.

## After

- `index.html` contains the page structure and text.
- `css/styles.css` contains the page layout, colors, responsive rules, and dark theme.
- `js/settings.js` reads the saved JSON before the page is displayed and handles storage errors.
- `js/app.js` handles the theme button, visitor greeting, last-visit text, and demo contact form.
- `README.md` explains what the page does.

## Why I changed it

I separated the files by role so it is easier to find and update the HTML, styles, and behavior. I also fixed the navigation targets, removed the old selectors that were not used, and gave the settings feature one key for its JSON object. The contact form does not save what a visitor types.