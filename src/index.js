let tourData;
let startOnLoad = false;
let currentStep = 0;
let exportObject;

const tourElement = `
  <div class="tour-overlay" id="overlay">
    <div id="step-tooltip" class="tour-tooltip">
      <div id="arrow-container">
        <div id="tool-arrow"></div>
      </div>
      <h2 id="step-title">Step Title</h2>
      <p id="step-desc">Step Description</p>
      <div id="step-progress">
        <div id="progress-completed"></div>
      </div>
      <button id="next-step">Next</button>
      <button id="prev-step">Previous</button>
      <button id="end-tour">End Tour</button>
    </div>
  </div>
`;

function toolTipStyles(position) {
  const positionMap = {
    "bottom-center": "translate(-5%, 90%)",
    "top-right": "translate(102%, -10%)",
    "top-left": "translate(-105%, -10%)",
    "bottom-right": "translate(100%, 100%)",
    "bottom-left": "translate(-100%, 100%)",
    "top-center": "translate(-5%, -104%)",
    "left-center": "translate(-100%, 0)",
    "right-center": "translate(100%, 0)",
  };

  return {
    transform: positionMap[position] || "translate(0, 100%)",
  };
}

function arrowStyles(position) {
  const positionMap = {
    "bottom-center": {
      top: "-10px",
      left: "50%",
      transform: "translateX(-50%) rotate(0deg)",
    },
    "top-right": {
      top: "50%",
      left: "-5px",
      transform: "translateX(-50%) rotate(270deg)",
    },
    "top-left": {
      top: "50%",
      left: "100%",
      transform: "translateY(50%) rotate(90deg)",
    },
    "bottom-right": {
      top: "-20px",
      left: "50%",
      transform: "translateX(-50%) rotate(180deg)",
    },
    "bottom-left": {
      top: "-20px",
      left: "50%",
      transform: "translateX(-50%) rotate(180deg)",
    },
    "top-center": {
      top: "100%",
      left: "50%",
      transform: "translateX(-50%) rotate(180deg)",
    },
    "left-center": {
      top: "50%",
      left: "100%",
      transform: "translateY(-50%) rotate(180deg)",
    },
    "right-center": {
      top: "50%",
      left: "-20px",
      transform: "translateY(-50%) rotate(180deg)",
    },
  };

  return positionMap[position] || positionMap["bottom-center"];
}

function updateButtonDisplay(step) {
  const prevStepButton = document.getElementById("prev-step");
  const nextStepButton = document.getElementById("next-step");
  const endTourButton = document.getElementById("end-tour");

  if (step === 0) {
    prevStepButton.style.display = "none";
    endTourButton.style.display = "none";
  } else {
    prevStepButton.style.display = "inline-block";
  }

  if (step === tourData.length - 1) {
    nextStepButton.style.display = "none";
    endTourButton.style.display = "inline-block";
  } else {
    nextStepButton.style.display = "inline-block";
  }
}

function initializeTourData(userTourData, userStartOnLoad) {
  tourData = userTourData;
  startOnLoad = userStartOnLoad;
}

function showStep(step) {
  const stepData = tourData[step];
  const progressBar = document.getElementById("progress-completed");
  const stepTooltip = document.getElementById("step-tooltip");
  
  if (!stepData || !stepTooltip) return;

  stepTooltip.style.transition =
    "opacity 0.3s, transform 0.3s, width 0.3s, height 0.3s";
  stepTooltip.style.opacity = 0;

  const completedSteps = step + 1;
  const totalSteps = tourData.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  progressBar.style.width = `${progressPercentage}%`;

  setTimeout(() => {
    stepTooltip.style.display = "none";
    stepTooltip.style.transition = "none";
    if (currentStep < tourData.length) {
      const prevStep = tourData[currentStep];
      const prevTargetElement = document.getElementById(prevStep.target);
      prevTargetElement.classList.remove("highlighted");
    }

    const targetElement = document.getElementById(stepData.target);
    targetElement.classList.add("highlighted");

    document.getElementById("step-title").textContent = stepData.title;
    document.getElementById("step-desc").textContent = stepData.description;

    // Render the target onto the overlay
    const overlay = document.getElementById("overlay");

    // Position the target element on the overlay exactly where it is on the page
    const targetRect = targetElement.getBoundingClientRect();
    const { transform: tooltipTransform } = toolTipStyles(stepData.position);

    stepTooltip.style.top = targetRect.top + "px";
    stepTooltip.style.left = targetRect.left + "px";
    stepTooltip.style.transform = tooltipTransform;
    stepTooltip.style.padding = "10px";

    const arrow = document.getElementById("tool-arrow");
    const { left, top, transform } = arrowStyles(stepData.position);
    arrow.style.left = left;
    arrow.style.top = top;
    arrow.style.transform = transform;

    stepTooltip.style.opacity = 1;
    stepTooltip.style.display = "block";

    overlay.style.display = "flex";

    currentStep = step;
  }, 300);

  updateButtonDisplay(step);
}

function handleTourButtonClick(event) {
   const target = event.target;

  if (target.id === "next-step") {
    showStep(currentStep + 1);
  } else if (target.id === "prev-step") {
    showStep(currentStep - 1);
  } else if (target.id === "start-tour") {
    showStep(currentStep);
  } else if (target.id === "end-tour") {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
    currentStep = 0;

    // Remove the highlighted class from all elements
    const highlightedElements = document.querySelectorAll(".highlighted");
    highlightedElements.forEach((element) => {
      element.classList.remove("highlighted");
    });
  }
}

// Check if running in a browser environment before adding the event listener
if (typeof window !== 'undefined') {
  // Add event listener to a parent element (e.g., document body)
  document.body.addEventListener("click", handleTourButtonClick);

  // Starting page onload if the "startOnLoad" is true
  function startOnMount() {
    window.onload = function () {
      if (startOnLoad) {
        showStep(currentStep);
      }
    };
  }

  exportObject = {
    startOnMount,
    initializeTourData,
    startOnLoad,
    tourElement,
    showStep,
  };
} else {
  exportObject = {
    initializeTourData,
    startOnLoad,
    tourElement,
    showStep,
  };
}

module.exports = exportObject;
