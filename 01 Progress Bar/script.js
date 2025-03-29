const nextBtn = document.getElementById("btn-next");
const steps = document.querySelectorAll(".step");
const progressBar = document.querySelector(".progress-bar");
const previousBtn = document.getElementById("btn-previous");
const content = document.querySelector(".content");

let currentIndex = 0;
let totalSteps = steps.length;

nextBtn.addEventListener("click", () => {
  console.log("update current index", currentIndex++);
  updateSteps();
});

previousBtn.addEventListener("click", () => {
  console.log("update current index", currentIndex--);
  updateSteps();
});

function updateSteps() {
  const percentage = (currentIndex / (totalSteps - 1)) * 100;
  progressBar.style.setProperty("--progress-width", `${percentage}%`);

  steps.forEach((step, index) => {
    step.classList.remove("active", "completed");

    if (index < currentIndex) {
      step.classList.add("completed");
    } else if (currentIndex === index) {
      step.classList.add("active");
    }
  });

  content.innerHTML = `
  <h2>Step ${currentIndex + 1} Content</h2>
  <p>This is the content for step ${currentIndex + 1} of the progress bar.</p>
  `;

  previousBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex + 1 === totalSteps;
}
