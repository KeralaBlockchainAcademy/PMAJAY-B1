const story = [
    {
        text: "You wake up in a forest. You can go left or right.",
        choices: [
            { text: "Go left", next: 1 },
            { text: "Go right", next: 2 }
        ]
    },
    {
        text: "You encounter a bear. Do you fight or run?",
        choices: [
            { text: "Fight", next: 3 },
            { text: "Run", next: 4 }
        ]
    },
    {
        text: "You find a river. Do you swim across or follow it?",
        choices: [
            { text: "Swim across", next: 5 },
            { text: "Follow the river", next: 6 }
        ]
    },
    { text: "You fight the bear and win. You are a hero!", choices: [] },
    { text: "You run away safely. You live another day.", choices: [] },
    { text: "You swim across and find a village. You are safe.", choices: [] },
    { text: "You follow the river and find a hidden treasure. You are rich!", choices: [] }
];

let currentStep = 0;

function displayStory() {
    const storyContainer = document.getElementById('story-container');
    const step = story[currentStep];
    storyContainer.innerHTML = `
        <p>${step.text}</p>
        ${step.choices.map((choice, index) => `
            <button onclick="choose(${choice.next})">${choice.text}</button>
        `).join('')}
    `;
    document.getElementById('restart-btn').style.display = step.choices.length ? 'none' : 'block';
}

function choose(nextStep) {
    currentStep = nextStep;
    displayStory();
}

document.getElementById('restart-btn').addEventListener('click', () => {
    currentStep = 0;
    displayStory();
});

displayStory();
