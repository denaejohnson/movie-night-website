# 🎬 Movie Night

A responsive movie discovery and ticket-request website with a black and purple theme, built for **Dynamic Websites and Applications**, VTDI School of Applied Technology.

- **Student:** Denae Johnson
- **Student ID:** 2401010460
- **Lecturer:** Trevoir Williams
- **Concept:** Movie Night (approved concept from the assignment list)
- **GitHub repository:** https://github.com/denaejohnson/movie-night-website

---

## 1. Project Concept and Planning

**Purpose:** Help movie lovers find a film they will enjoy and request tickets without calling or visiting the cinema.

**Target audience:** Teenagers, young adults and families in Jamaica who want a quick, mobile-friendly way to browse films and plan a night out.

**Why this concept:** Movie nights are a common social activity, so the content is easy to understand and the site naturally needs the features the assignment asks for: lists of items (movies), categories (genres), details (modal) and a form (ticket request).

### Page plan

| Page | File | Purpose |
| --- | --- | --- |
| Home / landing | `index.html` | Introduces the cinema, carousel of announcements, statistics, top rated films, how it works, FAQ |
| Content / exploration | `movies.html` | Browse all films, filter by genre, search, view details in a modal |
| Interaction | `tickets.html` | Ticket request form with validation, live price calculator and confirmation |

### Design decisions

1. **Black and purple theme.** I chose a black background with purple accents (buttons, borders, headings and highlights) so the movie photos stand out and the site feels like a cinema. .
2. **Readable text.** I chose white text on black and purple backgrounds, and I chose the carousel text, arrows and indicators so that they are clear against the banners and easy to read.
3. **Cleaner header.** I  used a text shadow so the words stay readable while bringing attention and emphasis to the header.
4. **Real photos.** I used photos from Unsplash that match the mood of each film, and each movie has its own picture along with a short description of each film.
5. **Local flavour.** I named the films and wrote several descriptions with a Jamaican style, for example *Bashment Wedding*, *Hacka Dat* and *Determined Likkle Miss*, so the site feels like it belongs to its audience.

---

## 2. Features

- Responsive Bootstrap navigation that collapses into a menu on small screens
- Auto-playing hero carousel with purple banners
- Statistics on the home page calculated from the data
- Top-rated films selected by JavaScript (filter, sort and slice)
- Genre filter buttons created from the data, plus a "now showing" switch and a live search box
- Movie details modal filled with JavaScript for the clicked film (picture, story, length, rating, price, showtimes)
- Ticket form with full validation, a live price calculator (VIP seats, Tuesday discount, group discount) and a confirmation card with a toast message
- "Book" links pass the film to the ticket page (`tickets.html?movie=3`) so the form is pre-filled
- Back-to-top button (jQuery)
- Each film has its own photo through an `image` property; a film without one falls back to a generated purple poster

---

## 3. Technologies Used

HTML5, CSS3, Bootstrap 5.3.3 (CSS and JS bundle via CDN), JavaScript (ES6), jQuery 3.7.1 (CDN), Git and GitHub.

### Bootstrap JavaScript components used

| Component | Where | What it does |
| --- | --- | --- |
| **Carousel** | `index.html` | Rotating announcements with previous/next controls and indicators |
| **Accordion (Collapse)** | `index.html` | FAQ section that opens one answer at a time |
| **Modal** | `movies.html` | Shows film details; JavaScript fills it using the `show.bs.modal` event |
| **Toast** | `tickets.html` | Success message shown by JavaScript after a valid booking |
| **Collapse (navbar toggler)** | all pages | Opens and closes the mobile menu |

### Other Bootstrap features

Containers, grid (`row`, `col-*`), cards, buttons, form controls, switches, badges, alerts, spacing and display utilities, responsive breakpoints.

### Custom CSS

`css/styles.css` overrides Bootstrap's look with CSS variables for the purple palette (`--mn-purple`, `--mn-purple-light`, `--mn-purple-dark`), custom `.btn-brand` and `.btn-outline-brand` buttons, black card and form styles, and fixes for the carousel in dark mode.

---

## 4. JavaScript Concepts (where to find them in `js/app.js`)

| Concept | Where it is used |
| --- | --- |
| **Variables** (`const`, `let`) | `const movies` and `const PRICING` never change; `let selectedGenre`, `let searchTerm` and `let nowShowingOnly` change as the user filters |
| **Data types** | Strings (title, genre, image), numbers (price, rating, quantity), booleans (`nowShowing`, `isValid`) |
| **Arrays** | `movies` holds every film; `showtimes` is an array inside each film; `discountNotes` collects discount messages |
| **Objects** | Each film is an object with related properties; `PRICING` and the `booking` object are also objects |
| **Conditions** | `if / else` in `getFilteredMovies`, `calculateTotal`, `validateBookingForm`, `getPosterPath` (picture fallback) and the modal (hide the booking link for coming soon films) |
| **Functions** | `formatPrice`, `formatDuration`, `findMovieById`, `getPosterPath`, `getNowShowing`, `createMovieCard`, `renderMovies`, `calculateTotal`, `validateBookingForm`, and more |
| **Iteration** | `for...of` loops build cards, genre buttons, showtime options and the average rating; `filter`, `find` and `sort` array methods |
| **DOM selection** | `getElementById`, `querySelector`, `querySelectorAll` |
| **DOM modification** | `textContent`, `innerHTML`, `insertAdjacentHTML`, `classList.add/remove/toggle`, `setAttribute`, `createElement`, and setting an image's `src` and `alt` |
| **Events** | `click` (genre buttons, reset, book another), `change` (switch, movie select), `input` (form fields), `submit` (booking form), `show.bs.modal` (modal) |

---

## 5. Forms and Validation

The ticket form (`tickets.html`) uses text, email, select, date, number, radio and checkbox controls, each with a `<label>`. It is submitted through a JavaScript `submit` handler (`event.preventDefault()`), and the values are read with JavaScript.

| Field | Rule |
| --- | --- |
| Full name | At least 2 characters |
| Email | Required and must match an email pattern |
| Movie | Must be selected |
| Showtime | Must be selected (options depend on the movie) |
| Date | Required and cannot be in the past |
| Tickets | Whole number from 1 to 10 |
| Terms | Must be ticked |

- **Feedback when invalid:** a red border and a message under the field (Bootstrap `is-invalid` and `invalid-feedback`); focus moves to the first problem.
- **Feedback when valid:** a confirmation card with a booking reference, and a Bootstrap toast.
- **Price rules:** VIP seats add J$1,000 per ticket, Tuesdays are 20% off, and 5 or more tickets get 10% off. The discounts add together.

---

## 6. jQuery

jQuery is loaded from the official CDN **before** `app.js`.

1. **Back-to-top button (all pages):** `$(window).on("scroll", ...)` checks `scrollTop()`, then `fadeIn()` or `fadeOut()` shows or hides the button. Clicking it runs `$("html, body").animate({ scrollTop: 0 }, 500)`.
2. **Live search (movies page):** `$("#searchInput").on("input", ...)` reads the typed text with `.val()` and redraws the movie grid.

---

## 7. Accessibility and Responsive Design

- "Skip to main content" link
- Semantic elements: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`
- Logical heading order (one `h1` per page, then `h2`, `h3`)
- `alt` text on every image
- Every form control has a label; errors use `aria-invalid`; results and price use `aria-live`
- Visible gold focus outline for keyboard users; all controls are real buttons or links
- Good colour contrast: white text on black, and light purple text on black
- Responsive layout built with the Bootstrap grid and breakpoints so the pages adapt to phone, tablet and desktop screens

---

## 8. Project Structure

```
movie-night-website/
├── index.html
├── movies.html
├── tickets.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── images/
    ├── hero-1.svg, hero-2.svg, hero-3.svg   (purple carousel banners)
    ├── poster-1.svg ... poster-12.svg       (fallback purple posters)
    ├── howto-killarasta.jpg
    ├── the-last-lighthouse.jpg
    ├── force-academy.jpg
    ├── wedding.jpg
    ├── determined-likkle-miss.jpg
    ├── captinc.jpg
    ├── hacka-dat.jpg
    ├── who-theif-the-mango.jpg
    ├── wah-sweetnannygoat2.jpg
    ├── letters-from-pr2.jpg
    ├── rockect-puppies2.jpg
    └── iron-tide2.jpg
```

## 9. How to Run

1. Download or clone the repository.
2. Open `index.html` in a web browser (an internet connection is needed to load Bootstrap and jQuery from their CDNs).

---

## 10. My Customisations and Contribution

- Choosing the black and purple colour scheme and writing the CSS, the Bootstrap button classes and the banner images to match. I used my student practical workbook to assist me and along with the tutorials provided to me by my lecturer.
- Fixing problems I found while testing, for example the picture for the movive poster came up on the home page but didn't come movies page, and some of the picture weren't coming up due to the spelling being inccorrect 
- Naming the movies and writing new descriptions for the films, using Jamaican names and culture
- Choosing, downloading, resizing and naming photos from Unsplash for the movies, and connecting them through the `image` property
- Fixing the details popup so it shows the same picture as the movie card
- Correcting spelling mistakes in the film titles and descriptions
- Writing the README and credits
- Testing the pages and features in the browser and saving my work to GitHub in separate commits 

---

## 11. AI Use Disclosure

I used an AI assistant (Claude by Anthropic) while building this project to assit me. It helped me to create the first version of the HTML, CSS and JavaScript from the assignment instructions and rubric, and it explained how the code works. I then customised the site as described in section 10, tested it in my browser, and asked the AI for help when something did not work and i couldn't figure out how to fix it, such as the carousel text colour and the details popup image. I reviewed the code and I can explain how its main parts work, including the form validation, `renderMovies`, `calculateTotal` and the jQuery features.

---

## 12. Credits

- [Bootstrap](https://getbootstrap.com/) for the layout and components
- [jQuery](https://jquery.com/)
- Movie photos (the `.jpg` files in the `images` folder) are from [Unsplash](https://unsplash.com/) and are used under the [Unsplash License](https://unsplash.com/license).
- The carousel banners and fallback posters are original SVG graphics created for this project.
- All film titles and descriptions are fictional.