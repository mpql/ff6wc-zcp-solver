// Define the options for each hand
const hourOptions = [2, 4, 6, 8, 10, 12];
const minuteOptions = [10, 20, 30, 40, 50];  // 'div20' for divisibility
const secondOptions = [10, 20, 30, 40, 50];  // Same for second hand

// Event listener for the "Find Combinations" button
document.getElementById('find-combinations-btn').addEventListener('click', findCombinations);

function findCombinations() {
    const trueHourOption = document.getElementById('hour-select').value === 'hour';
    const trueMinuteOption = document.getElementById('minute-select').value === 'minute';
    const trueSecondOption = document.getElementById('second-select').value === 'second';

    // Get selected false options
    const selectedFalseHours = Array.from(document.querySelectorAll('.false-hour:checked')).map(checkbox => parseInt(checkbox.value));
    const selectedFalseMinutes = Array.from(document.querySelectorAll('.false-minute:checked')).map(checkbox => parseInt(checkbox.value));
    const selectedFalseSeconds = Array.from(document.querySelectorAll('.false-second:checked')).map(checkbox => parseInt(checkbox.value));

    // Generate combinations based on selections
    const remainingCombinations = generateCombinations(trueHourOption, trueMinuteOption, trueSecondOption, selectedFalseHours, selectedFalseMinutes, selectedFalseSeconds);

    // Display combinations
    displayCombinations(remainingCombinations);
}

// Generate all combinations
function generateCombinations(trueHourOption, trueMinuteOption, trueSecondOption, falseHours, falseMinutes, falseSeconds) {
    let combinations = [];

    hourOptions.forEach(h => {
        if ((trueHourOption && !falseHours.includes(h)) || (!trueHourOption && falseHours.includes(h))) return;
        minuteOptions.forEach(m => {
            if ((trueMinuteOption && !falseMinutes.includes(m)) || (!trueMinuteOption && falseMinutes.includes(m))) return;
            secondOptions.forEach(s => {
                if ((trueSecondOption && !falseSeconds.includes(s)) || (!trueSecondOption && falseSeconds.includes(s))) return;
                combinations.push({ hour: h, minute: m, second: s });
            });
        });
    });

    return combinations;
}

// Display remaining combinations
function displayCombinations(combinations) {
    const combinationsList = document.getElementById('combinations');
    combinationsList.innerHTML = ''; // Clear previous combinations

    combinations.forEach(combination => {
        const li = document.createElement('li');
        li.textContent = `Hour: ${combination.hour}, Minute: ${combination.minute}, Second: ${combination.second}`;
        combinationsList.appendChild(li);
    });

    document.getElementById('combinations-list').style.display = 'block';
}

// Check if the user has a saved theme preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.getElementById('dark-mode-toggle').textContent = "🌞 Switch to Light Mode";
} else {
    document.body.classList.remove('dark-mode');
    document.getElementById('dark-mode-toggle').textContent = "🌙 Switch to Dark Mode";
}

// Add event listener to toggle dark mode
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.getElementById('dark-mode-toggle').textContent = "🌙 Switch to Dark Mode";
        localStorage.setItem('darkMode', 'disabled');
    } else {
        document.body.classList.add('dark-mode');
        document.getElementById('dark-mode-toggle').textContent = "🌞 Switch to Light Mode";
        localStorage.setItem('darkMode', 'enabled');
    }
});
