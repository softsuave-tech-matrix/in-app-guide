const appGuide = require("in-app-guide");
require("in-app-guide/src/style.css");

const tourData = [
  {
    target: "element1",
    title: "Step 1: Introduction",
    description: "Welcome to our website! This is the first step of the tour.",
    position: "bottom-center",
  },
  {
    target: "element2",
    title: "Step 2: Feature One",
    description: "This is Feature One. Let us show you how it works.",
    position: "top-right",
  },
  {
    target: "element3",
    title: "Step 3: Feature Two",
    description: "Now, let's explore Feature Two.",
    position: "top-right",
  },
  {
    target: "element4",
    title: "Step 4: Feature Three",
    description: "Finally, let's explore Feature Three.",
    position: "top-right",
  },
  {
    target: "element5",
    title: "Step 5: Conclusion",
    description: "Thank you for taking the tour!",
    position: "top-center",
  },
];

if (typeof window !== "undefined" && appGuide) {
  appGuide.initializeTourData(tourData, true);
  const app = document.getElementById("app")
  app.innerHTML += appGuide.tourElement;
}
