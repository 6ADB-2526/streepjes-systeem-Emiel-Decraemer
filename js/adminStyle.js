// Data opslag (simpele demo)
let currentStudent = null;
let counters = {}; // { studentNaam: { streepjes: 3, minpunten: 0 } }

// Elementen pakken
const studentList = document.querySelectorAll("#studentList .student");
const currentStudentEl = document.getElementById("currentStudent");
const counterEl = document.getElementById("counter");
const minpuntCounterEl = document.getElementById("minpuntCounter");
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");

// Modal
const modal = document.getElementById("reasonModal");
const reasonInput = document.getElementById("reasonInput");
const confirmBtn = document.getElementById("confirmBtn");

let pendingAction = null; // opslaan of admin + of – klikte

// Functie: student selecteren
studentList.forEach(li => {
  li.addEventListener("click", () => {
    currentStudent = li.textContent;

    // Als student nog niet in counters staat, maak aan
    if (!counters[currentStudent]) {
      counters[currentStudent] = { streepjes: 3, minpunten: 0 };
    }

    renderStudent();
  });
});

// Functie: student data tonen
function renderStudent() {
  if (!currentStudent) return;

  const data = counters[currentStudent];
  currentStudentEl.textContent = currentStudent;
  counterEl.textContent = data.streepjes;
  minpuntCounterEl.textContent = data.minpunten;
}

// Functie: actie uitvoeren (na bevestiging)
function applyAction(type, reason) {
  const data = counters[currentStudent];
  if (!data) return;

  if (type === "plus") {
    data.streepjes++;
  } else if (type === "minus") {
    data.streepjes--;
    if (data.streepjes < 0) {
      data.streepjes = 0;
      data.minpunten++; // elke keer als streepjes 0 bereikt → +1 minpunt
      data.streepjes = 3; // reset streepjes
    }
  }

  console.log(`Reden voor ${type}: ${reason}`);
  renderStudent();
}

// Functie: modal openen
function openModal(actionType) {
  pendingAction = actionType;
  reasonInput.value = "";
  modal.style.display = "flex";
}

// Functie: modal sluiten
function closeModal() {
  modal.style.display = "none";
  pendingAction = null;
}

// Buttons +/–
plusBtn.addEventListener("click", () => {
  if (currentStudent) openModal("plus");
});
minusBtn.addEventListener("click", () => {
  if (currentStudent) openModal("minus");
});

// Confirm in modal
confirmBtn.addEventListener("click", () => {
  if (pendingAction && currentStudent) {
    const reason = reasonInput.value.trim();
    applyAction(pendingAction, reason || "Geen reden opgegeven");
    closeModal();
  }
});

// Klik buiten modal sluit deze ook
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Init
renderStudent();