let sortingSpeed = 100; // Initial speed in milliseconds
let sortingStopped = false;

function startSorting() {
    sortingStopped = false;
    sortingSpeed = 100; // Reset speed
    const algorithm = document.getElementById('algorithm').value;
    const array = generateRandomArray();

    fetch('/sort', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ array, algorithm })
    })
    .then(response => response.json())
    .then(data => {
        visualizeSorting(data.steps, algorithm);
    });
}

function speedUpSorting() {
    sortingSpeed = Math.max(10, sortingSpeed / 2); // Double the speed (halve the delay)
}

function stopSorting() {
    sortingStopped = true;
}

function generateRandomArray() {
    const screenWidth = window.innerWidth;
    const barWidth = 20; // Adjust this value as needed
    const barMargin = 10; // Adjust this value as needed
    const totalBarWidth = barWidth + barMargin;
    const numberOfBars = Math.floor(screenWidth / totalBarWidth);

    const min = 10;
    const max = 400;
    return Array.from({ length: numberOfBars }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function visualizeSorting(steps, algorithm) {
    const barContainer = d3.select("#bar-container");
    
    barContainer.selectAll('*').remove();

    const barWidth = 15; // Width of each bar
    const barMargin = 10; // Margin between bars
    const containerHeight = 500; // Height of the bar container

    let index = 0;

    function animateStep() {
        if (sortingStopped) return;

        if (index >= steps.length) {
            showComplexityPopup(algorithm);
            return;
        }

        // Join the data to the bars
        const bars = barContainer.selectAll('div.bar')
            .data(steps[index], (d, i) => i);

        // Enter new bars
        bars.enter()
            .append('div')
            .attr('class', 'bar')
            .style('height', d => `${d}px`)
            .style('width', `${barWidth}px`)
            .style('margin', `0 ${barMargin / 2}px`)
            .style('background-color', 'steelblue');

        // Update existing bars
        bars.style('height', d => `${d}px`);

        // Remove old bars
        bars.exit().remove();

        index++;
        setTimeout(animateStep, sortingSpeed);
    }

    animateStep();
}

function showComplexityPopup(algorithm) {
    const complexities = {
        bubble: {
            time: "O(n^2)",
            space: "O(1)"
        },
        insertion: {
            time: "O(n^2)",
            space: "O(1)"
        },
        merge: {
            time: "O(n log n)",
            space: "O(n)"
        },
        quick: {
            time: "O(n log n)",
            space: "O(log n)"
        }
    };

    const complexity = complexities[algorithm];

    const popupContent = `
        <div class="popup">
            <h2>${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort</h2>
            <p><strong>Time Complexity:</strong> ${complexity.time}</p>
            <p><strong>Space Complexity:</strong> ${complexity.space}</p>
            <button onclick="closePopup()">Close</button>
        </div>
    `;

    const popup = document.createElement('div');
    popup.id = 'popup-container';
    popup.innerHTML = popupContent;
    document.body.appendChild(popup);
}

function closePopup() {
    const popup = document.getElementById('popup-container');
    if (popup) {
        document.body.removeChild(popup);
    }
}
