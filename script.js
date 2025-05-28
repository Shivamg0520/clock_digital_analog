document.addEventListener('DOMContentLoaded', () => {
    // Get elements for analog clock hands
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');

    // Get element for digital clock
    const digitalClock = document.getElementById('digitalClock');

    function updateClock() {
        const now = new Date(); // Get current date and time

        // --- Digital Clock Logic ---
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Format digital time with leading zeros (e.g., 09:05:01)
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        digitalClock.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

        // --- Analog Clock Logic ---
        // Calculate degrees for each hand
        // Total degrees in a circle = 360
        // Seconds: 360 degrees / 60 seconds = 6 degrees per second
        // Minutes: 360 degrees / 60 minutes = 6 degrees per minute
        // Hours: 360 degrees / 12 hours = 30 degrees per hour
        // Also account for minute contribution to hour hand, and second contribution to minute hand

        const secondsDegrees = (seconds * 6) + 90; // +90 because CSS transform: rotate(0deg) points right (3 o'clock)
        const minutesDegrees = (minutes * 6) + (seconds * 0.1) + 90; // Each second moves minute hand by 0.1 degree
        const hoursDegrees = (hours % 12 * 30) + (minutes * 0.5) + 90; // Each minute moves hour hand by 0.5 degree

        // Apply rotation using CSS transform
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }

    // Update clock every second
    setInterval(updateClock, 1000);

    // Call updateClock immediately to set initial time
    updateClock();
});