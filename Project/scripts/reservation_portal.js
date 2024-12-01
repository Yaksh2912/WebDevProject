async function submitReservation() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const messageDiv = document.getElementById('message');

    // Get selected table details from localStorage
    const tableDetails = JSON.parse(localStorage.getItem('selectedTable'));

    if (!tableDetails) {
        messageDiv.textContent = 'No table selected. Please go back and choose a table.';
        return;
    }

    if (!date || !time) {
        messageDiv.textContent = 'Please fill in all fields.';
        return;
    }

    // Prepare data to send to the backend
    const reservationData = {
        tableNumber: tableDetails.seatNumber,
        capacity: tableDetails.capacity,
        date,
        time,
    };

    try {
        const response = await fetch('/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });

        const result = await response.json();

        if (response.ok) {
            messageDiv.textContent = result.message || 'Reservation successful!';
            // Optionally clear localStorage and reset form
            localStorage.removeItem('selectedTable');
        } else {
            messageDiv.textContent = result.message || 'Reservation failed. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = 'An error occurred. Please try again.';
    }
}

function goBack() {
    if (document.referrer) {
        window.history.back(); // Go back to the previous page if available
    } else {
        window.location.href = '/'; // Redirect to the default page
    }
}
