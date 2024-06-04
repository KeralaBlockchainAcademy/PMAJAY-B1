let is24HourFormat = true;
let alarmTime = null;
const worldClocks = [];

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (!is24HourFormat) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        document.getElementById('clock').textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
    } else {
        document.getElementById('clock').textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    if (alarmTime && `${pad(hours)}:${pad(minutes)}` === alarmTime) {
        document.getElementById('alarm-sound').play();
        alert("Alarm!");
        alarmTime = null;
    }

    updateWorldClocks();
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function toggleFormat() {
    is24HourFormat = !is24HourFormat;
}

function setColor() {
    const color = prompt("Enter a color:");
    document.getElementById('clock').style.color = color;
}

function setFont() {
    const font = prompt("Enter a font:");
    document.getElementById('clock').style.fontFamily = font;
}

function setAlarm() {
    alarmTime = document.getElementById('alarm-time').value;
}

function addWorldClock() {
    const timeZone = prompt("Enter a time zone (e.g., 'America/New_York'):");
    if (timeZone) {
        worldClocks.push(timeZone);
        displayWorldClocks();
    }
}

function displayWorldClocks() {
    const worldClockContainer = document.getElementById('world-clock-container');
    worldClockContainer.innerHTML = worldClocks.map((timeZone, index) => `
        <div id="world-clock-${index}"></div>
    `).join('');
}

function updateWorldClocks() {
    worldClocks.forEach((timeZone, index) => {
        const now = new Date(new Date().toLocaleString("en-US", { timeZone }));
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        const timeFormat = is24HourFormat ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` :
                                            `${pad(hours % 12 || 12)}:${pad(minutes)}:${pad(seconds)} ${hours >= 12 ? 'PM' : 'AM'}`;
        document.getElementById(`world-clock-${index}`).textContent = `${timeZone}: ${timeFormat}`;
    });
}

setInterval(updateClock, 1000);
updateClock();
