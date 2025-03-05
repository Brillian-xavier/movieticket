// Store user details and navigate to home page
document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("userForm");
    if (userForm) {
        userForm.addEventListener("submit", function (event) {
            event.preventDefault();
            localStorage.setItem("name", document.getElementById("name").value);
            localStorage.setItem("phone", document.getElementById("phone").value);
            localStorage.setItem("email", document.getElementById("email").value);
            localStorage.setItem("dob", document.getElementById("dob").value);
            window.location.href = "home.html";
        });
    }
});

// Store selected movie and navigate to seat selection page
function selectMovie(movieName) {
    localStorage.setItem("selectedMovie", movieName);
    window.location.href = "seatselection.html";
}

// Populate theater list based on location
document.addEventListener("DOMContentLoaded", function () {
    const locationSelect = document.getElementById("location");
    const theaterList = document.getElementById("theater-list");

    if (locationSelect) {
        locationSelect.addEventListener("change", function () {
            const location = locationSelect.value;
            const theaters = {
                "Pattambi": ["Pattambi Cinema", "Mall Theater"],
                "Cherpulassery": ["Cherpulassery Movie House", "Grand Screen"],
                "Palakkad": ["Palakkad Multiplex", "Town Hall Theater"],
                "Shoranur": ["Shoranur Cineplex", "Metro Movies"]
            };

            // Clear previous list
            theaterList.innerHTML = "";
            if (theaters[location]) {
                theaters[location].forEach(theater => {
                    const button = document.createElement("button");
                    button.textContent = theater;
                    button.classList.add("theater-button");
                    button.onclick = () => selectTheater(button, theater);
                    theaterList.appendChild(button);
                });
            }
        });
    }
});

// Store selected theater and highlight it
function selectTheater(button, theaterName) {
    document.querySelectorAll(".theater-button").forEach(btn => btn.classList.remove("selected-theater"));
    button.classList.add("selected-theater");
    localStorage.setItem("selectedTheater", theaterName);
}

// Seat selection logic
document.addEventListener("DOMContentLoaded", function () {
    const seatsContainer = document.querySelector(".seats-container");

    if (seatsContainer) {
        for (let i = 1; i <= 50; i++) {
            let seat = document.createElement("div");
            seat.classList.add("seat");
            seat.textContent = i;
            seat.onclick = function () {
                this.classList.toggle("selected");
            };
            seatsContainer.appendChild(seat);
        }
    }
});

// Proceed to payment
function proceedToPayment() {
    let selectedSeats = Array.from(document.querySelectorAll(".seat.selected"))
        .map(seat => seat.textContent);

    if (!localStorage.getItem("selectedTheater")) {
        alert("Please select a theater before proceeding!");
        return;
    }

    if (selectedSeats.length === 0) {
        alert("Please select at least one seat.");
        return;
    }

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem("totalPrice", selectedSeats.length * 150);
    window.location.href = "payment.html";
}

// Show total price on payment page
document.addEventListener("DOMContentLoaded", function () {
    const totalPrice = document.getElementById("totalPrice");
    if (totalPrice) {
        totalPrice.textContent = `₹${localStorage.getItem("totalPrice") || "0"}`;
    }
});

// Confirm booking and navigate to confirmation page
function confirmBooking() {
    window.location.href = "conformation.html";
}

// Display confirmation details
document.addEventListener("DOMContentLoaded", function () {
    const confirmedMovie = document.getElementById("confirmedMovie");
    const confirmedTheater = document.getElementById("confirmedTheater");
    const confirmedSeats = document.getElementById("confirmedSeats");

    if (confirmedMovie) confirmedMovie.textContent = localStorage.getItem("selectedMovie") || "N/A";
    if (confirmedTheater) confirmedTheater.textContent = localStorage.getItem("selectedTheater") || "N/A";
    if (confirmedSeats) confirmedSeats.textContent = JSON.parse(localStorage.getItem("selectedSeats") || "[]").join(", ");
});
