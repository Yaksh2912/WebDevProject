document.addEventListener("DOMContentLoaded", function () {
    const seats = document.querySelectorAll('.seat');
    const selectedSeatsDiv = document.getElementById('selected-seats');
    const tableCapacityDiv = document.getElementById('table-capacity');
    const confirmButton = document.getElementById('confirm-selection');

    if (!seats.length) {
        console.error("No seats found! Ensure your HTML is rendering correctly.");
        return;
    }

    let selectedSeat = null;

    seats.forEach(seat => {
        console.log("Attaching event listener to:", seat);
        seat.addEventListener('click', function () {
            // Deselect previously selected seat
            if (selectedSeat) {
                selectedSeat.classList.remove('selected');
            }

            // Select the new seat
            selectedSeat = this;
            selectedSeat.classList.add('selected');

            // Update selected seat and capacity display
            const seatNumber = selectedSeat.dataset.seat;
            const capacity = selectedSeat.dataset.capacity;
            selectedSeatsDiv.textContent = `Selected Table: ${seatNumber}`;
            tableCapacityDiv.textContent = `Capacity: ${capacity} People`;

            // Enable the confirm button
            confirmButton.disabled = false;

            // Store selected table details in localStorage
            localStorage.setItem('selectedTable', JSON.stringify({ seatNumber, capacity }));
        });
    });

    confirmButton.addEventListener('click', function () {
        console.log("Redirecting to reservation portal...");
        window.location.href = "/portal"; // Adjust to your server route
    });
});
