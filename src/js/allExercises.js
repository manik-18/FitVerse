const cardContainer = document.querySelector('.card-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'your-api',
        'X-RapidAPI-Host': 'your-host-name'
    }
};

let currentPage = 1;
let perPage = 15;
let totalPages = 1;
let exercises = [];

function getExercises() {
    fetch('https://exercisedb.p.rapidapi.com/exercises', options)
        .then(response => response.json())
        .then(data => {
            exercises = data;
            totalPages = Math.ceil(exercises.length / perPage);
            displayExercises();
        })
        .catch(error => console.error(error));
}

function displayExercises() {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const displayExercises = exercises.slice(start, end);

    cardContainer.innerHTML = '';
    displayExercises.forEach(exercise => {
        const card = createExerciseCard(exercise);
        cardContainer.insertAdjacentHTML('beforeend', card);
    });

    updatePageButtons();
}

function createExerciseCard(exercise) {
    return `
          <div class="card">
            <h2>${exercise.name}</h2>
            <p><i>Body Part:</i>&nbsp${exercise.bodyPart}</p>
            <p><i>Equipment:</i>&nbsp${exercise.equipment}</p>
            <p><i>Target:</i>&nbsp${exercise.target}</p>
            <img src="${exercise.gifUrl}" alt="${exercise.name}">
          </div>
        `;
}

function updatePageButtons() {
    if (currentPage === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (currentPage === totalPages) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

prevBtn.addEventListener('click', () => {
    currentPage--;
    displayExercises();
});

nextBtn.addEventListener('click', () => {
    currentPage++;
    displayExercises();
});

getExercises();
