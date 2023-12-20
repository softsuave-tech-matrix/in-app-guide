# In-App Guide

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A walkthrough guide that allows users to interactively explore all the features within your application.

## Installation

To install the `in-app-guide` package, you can use the following npm command:

```bash
npm install in-app-guide
```

## Usage

1. Include the JavaScript code in your project.
2. Set up the HTML elements for your tour steps.
3. Call the `initializeTour` function with the tour data to start the tour.

### vanilla javascript
```javascript
  // Import the in-app-guide module
  const inAppGuide = require('in-app-guide');

  // require guide style.css on top level file
  require("in-app-guide/src/style.css");
  
  // Initialize tour data
  const userTourData = [
    // ... (user-provided tour data similar to the existing structure)
  ];
  
  // ensure that browser environment window is available
  if (typeof window !== "undefined" && inAppGuide) {

    // initialize the tour data for traversing in the window
    inAppGuide.initializeTourData(tourData, true);

    // get any element, in this case an element with id as "app"
    const app = document.getElementById("app")

    // pass on the guide element onto the window as HTML
    app.innerHTML += inAppGuide.tourElement;
  }
  
  
```
### React
```javascript
  import React, { useEffect } from 'react';
  import inAppGuide from 'in-app-guide';
  
  // require guide style.css on top level file
  import "in-app-guide/src/style.css";

  // Initialize tour data
  const userTourData = [
    // ... (user-provided tour data similar to the existing structure)
  ];
  
  inAppGuide.initializeTourData(userTourData);
  
  const App = () => {
    useEffect(() => {
      // Start the tour when the component mounts
      inAppGuide.showStep(inAppGuide.currentStep);
  
      // Cleanup when the component unmounts
      return () => {
        // ... (any cleanup logic)
      };
    }, []);
  
    return (
      <div>
        <div dangerouslySetInnerHTML={inAppGuide.tourElement} />

        {/* Your React app content */}
      </div>
    );
  };
  
  export default App;
```

## Tour Data

The tour data is an array of objects, each representing a step in the tour. Each object has the following properties:

- `target`: The HTML element ID to highlight during the step.
- `title`: Title for the tour step.
- `description`: Description for the tour step.
- `position`: Position of the tooltip relative to the target element.

## Example

```javascript
// Example tour data
const userTourData = [
  {
    target: "element1",
    title: "Step 1: Introduction",
    description: "Welcome to our website! This is the first step of the tour.",
    position: "bottom-center",
  },
  // ... (other tour steps)
];

// Call the initializeTour function with the user-provided data
initializeTour(userTourData);
```

### Demo

For a Working demo copy the [demo](https://github.com/softsuave-tech-matrix/in-app-guide/tree/main/demo) folder and follow the below steps

- Copy the demo folder
- Run `npm install`
- Run `npm run build`
- For serving the app, you can serve it with your custom script or run `npm i -g live-server`
- And `cd` into the folder and run `live-server` and your demo will be running on the `http://localhost:8080`.

## LICENSE
This project is licensed under the MIT License - see the [LICENSE](https://github.com/softsuave-tech-matrix/in-app-guide/blob/main/LICENSE) file for details.
