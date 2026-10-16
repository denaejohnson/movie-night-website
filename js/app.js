"use strict";

/* ==========================================================
   MOVIE NIGHT - app.js
   Sections:
   1. Data (array of objects) and constants
   2. Helper functions
   3. Home page
   4. Movies page (filter + search + modal)
   5. Tickets page (form, validation, price calculator, toast)
   6. jQuery features (back-to-top button, live search)
   7. Start-up
   ========================================================== */

/* ---------- 1. DATA ---------- */

// ARRAY of OBJECTS: each object describes one film
// Strings: title, genre, synopsis | Numbers: id, year, rating, duration, price | Booleans: nowShowing
const movies = [
  {
    id: 1, title: "How to kill a Rasta", genre: "Action", year: 2025, rating: 7.8, duration: 118, image: "howto-killarasta.jpg",
    price: 1800, nowShowing: true, showtimes: ["2:00 PM", "5:00 PM", "8:30 PM"],
    synopsis: "A Kingston courier has one night to deliver a mysterious package across the island while a rival crew chases him through every parish."
  },
  {
    id: 2, title: "The Last Lighthouse", genre: "Horror", year: 2024, rating: 7.1, duration: 104,image: "the-last-lighthouse.jpg",
    price: 1800, nowShowing: true, showtimes: ["6:00 PM", "9:00 PM"],
    synopsis: "Three friends spend a weekend at an abandoned lighthouse and discover that the light has been turning itself on every night."
  },
  {
    id: 3, title: "Force Academy", genre: "Sci-Fi", year: 2026, rating: 8.2, duration: 126,image: "force-academy.jpg",
    price: 2000, nowShowing: true, showtimes: ["1:30 PM", "4:30 PM", "7:30 PM"],
    synopsis: "A group of teenagers train to become the first pilots to cross the Kuiper belt, but one of them is hiding a dangerous secret."
  },
  {
    id: 4, title: "Bashment Wedding", genre: "Comedy", year: 2025, rating: 7.4, duration: 98,image: "wedding.jpg",
    price: 1600, nowShowing: true, showtimes: ["3:00 PM", "6:30 PM", "9:00 PM"],
    synopsis: "Two rival families must plan one wedding in seven days, and absolutely everything that can go wrong does."
  },
  {
    id: 5, title: "Determined Likkle Miss", genre: "Drama", year: 2026, rating: 8.5, duration: 132,image: "determined-likkle-miss.jpg",
    price: 1800, nowShowing: true, showtimes: ["2:30 PM", "6:00 PM"],
    synopsis: "A young aspiring sugarcane farmer fights to save her family's land and learns what it really costs to chase a dream."
  },
  {
    id: 6, title: "Captain Coconut", genre: "Family", year: 2025, rating: 6.9, duration: 92,image: "captinc.jpg",
    price: 1400, nowShowing: true, showtimes: ["11:00 AM", "1:00 PM", "3:30 PM"],
    synopsis: "A cheerful parrot and his crew of beach crabs set sail to find the legendary treasure of Treasure Beach."
  },
  {
    id: 7, title: "Hacka Dat", genre: "Sci-Fi", year: 2026, rating: 7.6, duration: 110,image: "hacka-dat.jpg",
    price: 2000, nowShowing: true, showtimes: ["5:30 PM", "8:00 PM"],
    synopsis: "In the year 2150, a street-smart hacker uncovers a plot to switch off the lights of the whole city."
  },
  {
    id: 8, title: "Who Thief the Mango", genre: "Comedy", year: 2024, rating: 7.9, duration: 101,image: "who-theif-the-mango.jpg",
    price: 1600, nowShowing: true, showtimes: ["4:00 PM", "7:00 PM", "9:30 PM"],
    synopsis: "A clumsy crew plans the perfect robbery of the island's most famous mango farm. It does not go to plan as someone from the crew betrays them."
  },
  {
    id: 9, title: "Wah Sweet Nanny Goat", genre: "Horror", year: 2026, rating: 6.8, duration: 107,image: "wah-sweetnannygoat2.jpg",
    price: 1800, nowShowing: false, showtimes: ["7:00 PM"],
    synopsis: "A young girl named Chantel runs away from her family to live with her boyfriend until she realizes that he has many secrets and unfortunate plans for her."
  },
  {
    id: 10, title: "Letters from Port Royal", genre: "Drama", year: 2026, rating: 8.0, duration: 121,image: "letters-from-pr2.jpg",
    price: 1800, nowShowing: false, showtimes: ["3:00 PM", "6:30 PM"],
    synopsis: "A historian finds a bundle of old letters that changes how she sees her family and her country."
  },
  {
    id: 11, title: "Rocket Pups", genre: "Family", year: 2026, rating: 7.2, duration: 88,image: "rockect-puppies2.jpg",
    price: 1400, nowShowing: false, showtimes: ["10:30 AM", "12:30 PM"],
    synopsis: "Five brave puppies build a rocket in the backyard and accidentally launch themselves into space."
  },
  {
    id: 12, title: "Iron Tide", genre: "Action", year: 2026, rating: 7.0, duration: 115,image: "iron-tide2.jpg",
    price: 2000, nowShowing: false, showtimes: ["5:00 PM", "8:00 PM"],
    synopsis: "A retired coast guard captain returns to action when pirates threaten the shipping lanes of the Caribbean."
  }
];

// CONSTANT object holding the ticket pricing rules (all in Jamaican dollars)
const PRICING = {
  vipExtra: 1000,        // extra cost per VIP ticket
  tuesdayDiscount: 0.2,  // 20% off on Tuesdays
  groupSize: 5,          // number of tickets that counts as a group
  groupDiscount: 0.1,    // 10% off for groups
  maxTickets: 10
};

/* ---------- 2. HELPER FUNCTIONS ---------- */

// Turns a number into a price string, e.g. 3600 -> "J$3,600"
function formatPrice(amount) {
  return "J$" + Math.round(amount).toLocaleString("en-US");
}

// Turns minutes into hours and minutes, e.g. 118 -> "1h 58m"
function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours + "h " + mins + "m";
}

// Finds one movie object by its id (returns undefined if not found)
// Returns the picture for a movie. If the movie has no "image" line,
// it uses the purple poster instead.
function getPosterPath(movie) {
  return "images/" + (movie.image || "poster-" + movie.id + ".svg");
}
function findMovieById(id) {
  return movies.find(function (movie) {
    return movie.id === id;
  });
}

// Returns only the movies that are currently showing
function getNowShowing() {
  return movies.filter(function (movie) {
    return movie.nowShowing;
  });
}

// Builds a list of genres with no duplicates
function getUniqueGenres() {
  const genres = [];
  for (const movie of movies) {
    if (!genres.includes(movie.genre)) {
      genres.push(movie.genre);
    }
  }
  return genres;
}

// Returns today's date as YYYY-MM-DD (used for the date input minimum)
function getTodayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return now.getFullYear() + "-" + month + "-" + day;
}

/* ---------- 3. HOME PAGE ---------- */

// Creates the HTML for a featured movie card on the home page
function createFeaturedCard(movie) {
  return `
    <div class="col-12 col-sm-6 col-lg-3">
      <article class="card movie-card h-100">
        <img src="${getPosterPath(movie)}" class="card-img-top" alt="Poster for ${movie.title}">
        <div class="card-body d-flex flex-column">
          <p class="text-warning mb-1">&#9733; ${movie.rating.toFixed(1)}</p>
          <h3 class="h5 card-title">${movie.title}</h3>
          <p class="card-text small text-secondary">${movie.genre} &bull; ${formatDuration(movie.duration)}</p>
          <a href="tickets.html?movie=${movie.id}" class="btn btn-brand mt-auto">Book ${movie.title}</a>
        </div>
      </article>
    </div>`;
}

function initHome() {
  const featuredRow = document.getElementById("featuredMovies");
  if (!featuredRow) {
    return; // this is not the home page
  }

  // Show the four highest rated movies that are now showing
  const topRated = getNowShowing()
    .sort(function (a, b) { return b.rating - a.rating; })
    .slice(0, 4);

  featuredRow.innerHTML = "";
  for (const movie of topRated) {
    featuredRow.insertAdjacentHTML("beforeend", createFeaturedCard(movie));
  }

  // Statistics calculated from the data array
  let ratingTotal = 0;
  for (const movie of movies) {
    ratingTotal += movie.rating;
  }
  const averageRating = ratingTotal / movies.length;

  document.getElementById("statNowShowing").textContent = getNowShowing().length;
  document.getElementById("statGenres").textContent = getUniqueGenres().length;
  document.getElementById("statRating").textContent = averageRating.toFixed(1);
}

/* ---------- 4. MOVIES PAGE ---------- */

// State variables that the filters change
let selectedGenre = "All";
let searchTerm = "";
let nowShowingOnly = false;

// Creates the HTML for a card on the movies page
function createMovieCard(movie) {
  let statusBadge = "";
  if (movie.nowShowing) {
    statusBadge = '<span class="badge bg-success">Now Showing</span>';
  } else {
    statusBadge = '<span class="badge bg-warning text-dark">Coming Soon</span>';
  }

  return `
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
      <article class="card movie-card h-100">
        <img src="${getPosterPath(movie)}" class="card-img-top" alt="Poster for ${movie.title}">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center mb-2">
            ${statusBadge}
            <span class="text-warning">&#9733; ${movie.rating.toFixed(1)}</span>
          </div>
          <h3 class="h5 card-title">${movie.title}</h3>
          <p class="card-text small text-secondary">${movie.genre} &bull; ${movie.year} &bull; ${formatDuration(movie.duration)}</p>
          <button type="button" class="btn btn-outline-brand mt-auto"
                  data-bs-toggle="modal" data-bs-target="#movieModal"
                  data-movie-id="${movie.id}">
            View details for ${movie.title}
          </button>
        </div>
      </article>
    </div>`;
}

// Decides which movies match the current genre, search text and switch
function getFilteredMovies() {
  const term = searchTerm.trim().toLowerCase();

  return movies.filter(function (movie) {
    const genreMatch = selectedGenre === "All" || movie.genre === selectedGenre;
    const searchMatch = movie.title.toLowerCase().includes(term) ||
                        movie.genre.toLowerCase().includes(term);
    const statusMatch = !nowShowingOnly || movie.nowShowing;
    return genreMatch && searchMatch && statusMatch;
  });
}

// Redraws the movie grid using the filtered list
function renderMovies() {
  const grid = document.getElementById("movieGrid");
  const noResults = document.getElementById("noResults");
  const resultsCount = document.getElementById("resultsCount");
  const filtered = getFilteredMovies();

  grid.innerHTML = "";
  for (const movie of filtered) {
    grid.insertAdjacentHTML("beforeend", createMovieCard(movie));
  }

  // Show or hide the "no results" message
  if (filtered.length === 0) {
    noResults.classList.remove("d-none");
  } else {
    noResults.classList.add("d-none");
  }

  // Message read out by screen readers (aria-live region)
  resultsCount.textContent = "Showing " + filtered.length + " of " + movies.length + " movies";
}

// Builds the genre buttons from the data and adds a click listener to each
function buildGenreButtons() {
  const container = document.getElementById("genreFilters");
  const genres = ["All", ...getUniqueGenres()];

  for (const genre of genres) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = genre;
    button.dataset.genre = genre;
    button.className = genre === "All" ? "btn btn-brand" : "btn btn-outline-light";
    button.setAttribute("aria-pressed", genre === "All" ? "true" : "false");

    button.addEventListener("click", function () {
      selectedGenre = genre;

      // Update which button looks active
      const allButtons = container.querySelectorAll("button");
      for (const b of allButtons) {
        const isActive = b.dataset.genre === selectedGenre;
        b.classList.toggle("btn-brand", isActive);
        b.classList.toggle("btn-outline-light", !isActive);
        b.setAttribute("aria-pressed", isActive ? "true" : "false");
      }
      renderMovies();
    });

    container.appendChild(button);
  }
}

// Fills the Bootstrap modal with the details of the clicked movie
function setupMovieModal() {
  const modalElement = document.getElementById("movieModal");

  // Bootstrap fires "show.bs.modal" just before the modal opens.
  // event.relatedTarget is the button that was clicked.
  modalElement.addEventListener("show.bs.modal", function (event) {
    const id = Number(event.relatedTarget.getAttribute("data-movie-id"));
    const movie = findMovieById(id);
    if (!movie) {
      return;
    }

    document.getElementById("modalTitle").textContent = movie.title;
    document.getElementById("modalSynopsis").textContent = movie.synopsis;
    document.getElementById("modalGenre").textContent = movie.genre;
    document.getElementById("modalDuration").textContent = formatDuration(movie.duration);
    document.getElementById("modalRating").textContent = movie.rating.toFixed(1) + " / 10";
    document.getElementById("modalPrice").textContent = formatPrice(movie.price);

    const poster = document.getElementById("modalPoster");
    poster.src = getPosterPath(movie);
    poster.alt = "Poster for " + movie.title;

    // Build the list of showtimes with a loop
    const showtimeList = document.getElementById("modalShowtimes");
    showtimeList.innerHTML = "";
    for (const time of movie.showtimes) {
      const item = document.createElement("li");
      item.className = "list-inline-item badge text-bg-secondary";
      item.textContent = time;
      showtimeList.appendChild(item);
    }

    // Condition: only movies that are showing can be booked
    const bookLink = document.getElementById("modalBookLink");
    if (movie.nowShowing) {
      bookLink.classList.remove("d-none");
      bookLink.href = "tickets.html?movie=" + movie.id;
    } else {
      bookLink.classList.add("d-none");
    }
  });
}

function initMovies() {
  const grid = document.getElementById("movieGrid");
  if (!grid) {
    return; // this is not the movies page
  }

  buildGenreButtons();
  setupMovieModal();

  // Event listener for the "now showing only" switch
  document.getElementById("nowShowingSwitch").addEventListener("change", function (event) {
    nowShowingOnly = event.target.checked;
    renderMovies();
  });

  // Event listener for the "reset filters" button in the no-results message
  document.getElementById("resetFilters").addEventListener("click", function () {
    selectedGenre = "All";
    searchTerm = "";
    nowShowingOnly = false;
    document.getElementById("searchInput").value = "";
    document.getElementById("nowShowingSwitch").checked = false;
    const buttons = document.querySelectorAll("#genreFilters button");
    for (const b of buttons) {
      const isAll = b.dataset.genre === "All";
      b.classList.toggle("btn-brand", isAll);
      b.classList.toggle("btn-outline-light", !isAll);
      b.setAttribute("aria-pressed", isAll ? "true" : "false");
    }
    renderMovies();
  });

  renderMovies();
}

/* ---------- 5. TICKETS PAGE ---------- */

// Works out the price. Returns an object with the full breakdown.
function calculateTotal(movie, quantity, seatType, dateString) {
  let unitPrice = movie.price;
  if (seatType === "vip") {
    unitPrice += PRICING.vipExtra;
  }

  const subtotal = unitPrice * quantity;
  let discountRate = 0;
  const discountNotes = [];

  // Tuesday discount (getDay() returns 2 for Tuesday)
  if (dateString) {
    const chosenDate = new Date(dateString + "T00:00:00");
    if (chosenDate.getDay() === 2) {
      discountRate += PRICING.tuesdayDiscount;
      discountNotes.push("Tuesday special (20% off)");
    }
  }

  // Group discount
  if (quantity >= PRICING.groupSize) {
    discountRate += PRICING.groupDiscount;
    discountNotes.push("Group discount (10% off)");
  }

  const discountAmount = subtotal * discountRate;
  return {
    unitPrice: unitPrice,
    subtotal: subtotal,
    discountAmount: discountAmount,
    discountNotes: discountNotes,
    total: subtotal - discountAmount
  };
}

// Adds the red error style and message to a form field
function showError(field, message) {
  field.classList.add("is-invalid");
  field.setAttribute("aria-invalid", "true");
  const feedback = document.getElementById(field.id + "Feedback");
  if (feedback) {
    feedback.textContent = message;
  }
}

// Removes the error style from a form field
function clearError(field) {
  field.classList.remove("is-invalid");
  field.removeAttribute("aria-invalid");
}

// Fills the showtime dropdown for the chosen movie
function populateShowtimes(movieId) {
  const select = document.getElementById("showtime");
  select.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Choose a showtime";
  select.appendChild(placeholder);

  const movie = findMovieById(movieId);
  if (!movie) {
    select.disabled = true;
    return;
  }

  for (const time of movie.showtimes) {
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    select.appendChild(option);
  }
  select.disabled = false;
}

// Reads the current form values and updates the live price summary
function updateSummary() {
  const summary = document.getElementById("summaryText");
  const movie = findMovieById(Number(document.getElementById("movie").value));
  const quantity = Number(document.getElementById("quantity").value);
  const seat = document.querySelector('input[name="seat"]:checked').value;
  const date = document.getElementById("date").value;

  const validQuantity = Number.isInteger(quantity) && quantity >= 1 && quantity <= PRICING.maxTickets;

  if (!movie || !validQuantity) {
    summary.innerHTML = "<p class='mb-0 text-secondary'>Choose a movie and a ticket quantity to see your price.</p>";
    return;
  }

  const result = calculateTotal(movie, quantity, seat, date);
  let html = "<p class='mb-1'>" + quantity + " &times; " + formatPrice(result.unitPrice) +
             " (" + (seat === "vip" ? "VIP" : "Standard") + ")</p>";

  for (const note of result.discountNotes) {
    html += "<p class='mb-1 text-success'>&#10003; " + note + "</p>";
  }
  html += "<p class='h4 text-warning mb-0'>Total: " + formatPrice(result.total) + "</p>";
  summary.innerHTML = html;
}

// Checks every field. Returns true only if the whole form is valid.
function validateBookingForm() {
  const nameField = document.getElementById("fullName");
  const emailField = document.getElementById("email");
  const movieField = document.getElementById("movie");
  const showtimeField = document.getElementById("showtime");
  const dateField = document.getElementById("date");
  const quantityField = document.getElementById("quantity");
  const termsField = document.getElementById("terms");

  let isValid = true;
  let firstInvalid = null;

  function fail(field, message) {
    showError(field, message);
    isValid = false;
    if (!firstInvalid) {
      firstInvalid = field;
    }
  }

  // Name
  clearError(nameField);
  if (nameField.value.trim().length < 2) {
    fail(nameField, "Please enter your full name (at least 2 characters).");
  }

  // Email
  clearError(emailField);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailField.value.trim() === "") {
    fail(emailField, "Email address is required.");
  } else if (!emailPattern.test(emailField.value.trim())) {
    fail(emailField, "Please enter a valid email, for example name@example.com.");
  }

  // Movie
  clearError(movieField);
  if (movieField.value === "") {
    fail(movieField, "Please choose a movie.");
  }

  // Showtime
  clearError(showtimeField);
  if (showtimeField.value === "") {
    fail(showtimeField, "Please choose a showtime.");
  }

  // Date
  clearError(dateField);
  if (dateField.value === "") {
    fail(dateField, "Please choose a date.");
  } else if (dateField.value < getTodayString()) {
    fail(dateField, "The date cannot be in the past.");
  }

  // Quantity
  clearError(quantityField);
  const quantity = Number(quantityField.value);
  if (quantityField.value === "" || !Number.isInteger(quantity)) {
    fail(quantityField, "Enter a whole number of tickets.");
  } else if (quantity < 1 || quantity > PRICING.maxTickets) {
    fail(quantityField, "You can book between 1 and " + PRICING.maxTickets + " tickets.");
  }

  // Terms checkbox
  clearError(termsField);
  if (!termsField.checked) {
    fail(termsField, "You must agree before requesting tickets.");
  }

  if (firstInvalid) {
    firstInvalid.focus(); // keyboard users land on the first problem
  }
  return isValid;
}

// Shows the confirmation card after a successful booking
function showConfirmation(booking) {
  const reference = "MN-" + Math.floor(1000 + Math.random() * 9000);
  const result = calculateTotal(booking.movie, booking.quantity, booking.seat, booking.date);

  document.getElementById("confirmName").textContent = booking.name;
  document.getElementById("confirmEmail").textContent = booking.email;
  document.getElementById("confirmDetails").textContent =
    booking.quantity + " " + (booking.seat === "vip" ? "VIP" : "Standard") + " ticket(s) for " +
    booking.movie.title + " on " + booking.date + " at " + booking.showtime;
  document.getElementById("confirmTotal").textContent = formatPrice(result.total);
  document.getElementById("confirmRef").textContent = reference;

  document.getElementById("bookingCard").classList.add("d-none");
  const confirmation = document.getElementById("confirmationCard");
  confirmation.classList.remove("d-none");
  confirmation.focus();

  // Bootstrap Toast component
  const toastElement = document.getElementById("bookingToast");
  document.getElementById("toastMessage").textContent =
    "Booking " + reference + " received. See you at the movies, " + booking.name.split(" ")[0] + "!";
  bootstrap.Toast.getOrCreateInstance(toastElement).show();
}

function initTickets() {
  const form = document.getElementById("bookingForm");
  if (!form) {
    return; // this is not the tickets page
  }

  const movieSelect = document.getElementById("movie");
  const dateInput = document.getElementById("date");

  // Fill the movie dropdown (only movies that are now showing can be booked)
  for (const movie of getNowShowing()) {
    const option = document.createElement("option");
    option.value = movie.id;
    option.textContent = movie.title + " (" + formatPrice(movie.price) + ")";
    movieSelect.appendChild(option);
  }

  dateInput.min = getTodayString();
  populateShowtimes(null);

  // Pre-select a movie if we arrived from "tickets.html?movie=3"
  const params = new URLSearchParams(window.location.search);
  const requestedId = Number(params.get("movie"));
  if (requestedId && findMovieById(requestedId) && findMovieById(requestedId).nowShowing) {
    movieSelect.value = requestedId;
    populateShowtimes(requestedId);
  }

  // When the movie changes, rebuild the showtimes
  movieSelect.addEventListener("change", function () {
    populateShowtimes(Number(movieSelect.value));
    updateSummary();
  });

  // Update the price and clear errors whenever the user changes something
  const watchedFields = form.querySelectorAll("input, select");
  for (const field of watchedFields) {
    field.addEventListener("input", function () {
      clearError(field);
      updateSummary();
    });
    field.addEventListener("change", function () {
      clearError(field);
      updateSummary();
    });
  }

  // Form submit handler
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    if (!validateBookingForm()) {
      return;
    }

    // Read the values with JavaScript and store them in an object
    const booking = {
      name: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      movie: findMovieById(Number(movieSelect.value)),
      showtime: document.getElementById("showtime").value,
      date: dateInput.value,
      quantity: Number(document.getElementById("quantity").value),
      seat: document.querySelector('input[name="seat"]:checked').value
    };

    showConfirmation(booking);
  });

  // "Book another" button on the confirmation card
  document.getElementById("bookAnother").addEventListener("click", function () {
    form.reset();
    populateShowtimes(null);
    updateSummary();
    document.getElementById("confirmationCard").classList.add("d-none");
    document.getElementById("bookingCard").classList.remove("d-none");
    document.getElementById("fullName").focus();
  });

  updateSummary();
}

/* ---------- 6. JQUERY FEATURES ---------- */

function initJQuery() {
  // jQuery feature 1 (all pages): back-to-top button.
  // Fades in after scrolling 300px and smoothly scrolls to the top when clicked.
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      $("#backToTop").fadeIn(200);
    } else {
      $("#backToTop").fadeOut(200);
    }
  });

  $("#backToTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  // jQuery feature 2 (movies page): live search box.
  // Every key press updates the search text and redraws the grid.
  $("#searchInput").on("input", function () {
    searchTerm = $(this).val();
    renderMovies();
  });
}

/* ---------- 7. START-UP ---------- */

// Run the code for whichever page is open once the HTML has loaded
document.addEventListener("DOMContentLoaded", function () {
  initHome();
  initMovies();
  initTickets();
  initJQuery();
});