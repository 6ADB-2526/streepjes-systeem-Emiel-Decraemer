// Voor demo: student info en counters
let minpunten = 0;
let streepjes = 3;

// Elementen selecteren
const minpuntenEl = document.getElementById("minpuntenCounter");
const streepjesContainer = document.getElementById("streepjesContainer");
const currentStudentEl = document.getElementById("currentStudent");

// Voorbeeld: set current student (kan later dynamisch komen van backend)
currentStudentEl.textContent = "";

// Functie om streepjes opnieuw te tekenen
function renderStreepjes() {
  streepjesContainer.innerHTML = "";
  for (let i = 0; i < streepjes; i++) {
    const span = document.createElement("span");
    span.classList.add("streepje");
    span.textContent = "|";
    streepjesContainer.appendChild(span);
  }
}

// Functie om minpunten bij te werken
function updateMinpunten(value) {
  minpunten += value;
  if (minpunten < 0) minpunten = 0;
  minpuntenEl.textContent = minpunten;
}

// Demo: automatisch na 2 sec minpunt toevoegen
setTimeout(() => {
  updateMinpunten(1);
  streepjes--; // één streepje eraf
  renderStreepjes();
}, 2000);

// Init
renderStreepjes();