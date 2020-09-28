// See wiki for more details: https://github.com/jinjagit/myUI/wiki

import { params } from './params'
import { uiActions } from './uiActions'

const uiElements = (() => {
  let backgroundColor = "hsl(229, 15%, 7%)";
  let foregroundHoverColor = "hsl(229, 25%, 35%)";
  let fontColor = "hsl(46, 40%, 88%)";
  let greyFontColor = "hsl(46, 5%, 48%)";

  const limitValue = (num, min = 0.0, max = 100.0) => {
    return Math.min(Math.max(num, min), max)
  };

  // Create a slider and its behaviour.
  const addSlider = (name, parent, initial_value = 50.0, min = 0.0, max = 100.0, step = 0.01) => {
    // sliderTopDiv
    let sliderDiv = document.createElement('div');
    sliderDiv.classList.add('sliderDiv');

    let sliderTopDiv = document.createElement('div');
    sliderTopDiv.classList.add('sliderTopDiv');
    sliderDiv.appendChild(sliderTopDiv);

    let sliderText = document.createElement('p');
    sliderText.classList.add('sliderText');
    sliderText.innerHTML = `${name.replace(/_/g, " ")}:`;
    sliderTopDiv.appendChild(sliderText);

    let sliderInput = document.createElement('input');
    sliderInput.classList.add('sliderField');
    sliderInput.type = "number";
    sliderInput.min = min;
    sliderInput.max = max;
    sliderInput.step = step;
    sliderTopDiv.appendChild(sliderInput);

    // sliderContainer
    let sliderContainer = document.createElement('div');
    sliderContainer.classList.add('sliderContainer');
    sliderDiv.appendChild(sliderContainer);

    let verticalCenter = document.createElement('div');
    verticalCenter.classList.add('vertical-center');
    sliderContainer.appendChild(verticalCenter);

    let slider = document.createElement('input');
    slider.classList.add('slider');
    slider.id = name;
    slider.type = "range";
    slider.min = min;
    slider.max = max;
    slider.step = step;
    verticalCenter.appendChild(slider);

    // Set slider and slider input to initial value
    slider.value = initial_value;
    sliderInput.value = initial_value;

    // Add current id (k) and slider value (v) to uiParams hashmap
    params.setUiParam(slider.id, slider.value);

    // Add behaviour
    
    // Update the slider input box value (each time you drag the slider handle)
    slider.oninput = function() {
      sliderInput.value = this.value;
    }
    
    // Set the slider value on mouseup (and call an action as desired)
    slider.onmouseup = function() {
      sliderInput.value = this.value;
      params.setUiParam(slider.id, slider.value);
    }
    
    // Set the slider value when hit return && slider input box in focus (and call an action as desired)
    sliderInput.onkeyup = function(e) {
      let keyUp = `${e.key}`;
  
      if (keyUp == "Enter") {
        sliderInput.value = +limitValue(this.value, min, max).toFixed(2);
        slider.value = this.value;
        params.setUiParam(slider.id, slider.value);
      }
    }

    parent.appendChild(sliderDiv);
  };

  // Create a row of buttons, and their behaviours.
  const addButtonRow = (parent, buttons) => {
    let buttonRow = document.createElement('div');
    buttonRow.classList.add('button-row');

    let num = buttons.length;
    let totalGaps = ((num - 1) * 8) + 5; // gaps between buttons + 1st margin-left

    for (let i = 0; i < num; i++) {
      let buttonW = `${(parent.offsetWidth - totalGaps) * buttons[i][2] / 100.0}px`;
      let button = null;
      
      if (buttons[i][1] == "toggle") {
        button = addToggle(buttons[i][0], buttonW, buttons[i][3]);
      } else { // add action button
        button = addAction(buttons[i][0], buttonW);
      }

      buttonRow.appendChild(button);
      if (i > 0) { button.style.marginLeft = "8px"; }
    }

    parent.appendChild(buttonRow);
  };

  const buttonStyling = (name, width) => {
    let button = document.createElement('div');
    button.classList.add('button');
    button.id = name;
    button.style.width = width;

    let buttonText = document.createElement('p');
    buttonText.classList.add('button-text');
    buttonText.innerHTML = `${name.replace(/_/g, " ")}`;
    button.appendChild(buttonText);

    return button;
  };

  const addToggle = (name, width, state) => {
    let button = buttonStyling(name, width);

    if (state == false) { button.style.color = greyFontColor; }

    // Add current id (k) and toggle value (v) to uiParams hashmap
    params.setUiParam(button.id, state);

    // Set the toggle value on mouseup
    button.onmouseup = function() {
      if (params.getUiParam(this.id) == false) {
        params.setUiParam(this.id, true);
        this.style.color = fontColor;
      } else {
        params.setUiParam(this.id, false);
        this.style.color = greyFontColor;
      }
    }

    return button;
  };

  const addAction = (name, width) => {
    let button = buttonStyling(name, width);

    // Call an action as desired by passing button id to uiActions.action()
    button.onmouseup = function() {
      uiActions.action(this.id);
    }

    return button;
  };

  // Create a title box, and related behaviours (if desired).
  const addTitle = (title, strapline, parent, hasAction = false, fontSize = 35) => {
    let titleBox = document.createElement('div');
    titleBox.id = title;
    titleBox.classList.add('title-box');

    if (hasAction == true) {
      titleBox.onmouseover = function() {
        this.style.backgroundColor = foregroundHoverColor;
      }
      titleBox.onmouseout = function() {
        this.style.backgroundColor = backgroundColor;
      }
      titleBox.onmouseup = function() {
        uiActions.action(this.id);
      }
    }

    let titleText = document.createElement('h1');
    titleText.classList.add('title-text');
    titleText.id = `${title}-text`;
    titleText.style.fontSize = `${fontSize}px`;
    titleText.innerHTML = `${title.replace(/_/g, " ")}`;
    titleBox.appendChild(titleText);

    let straplineText = document.createElement('p');
    straplineText.classList.add('strapline-text');
    straplineText.id = strapline;
    straplineText.innerHTML = `${strapline.replace(/_/g, " ")}`;
    titleBox.appendChild(straplineText);

    parent.appendChild(titleBox);
  };

  // Create a text box.
  const addText = (name, parent, paragraphs, centered) => {
    let textBox = document.createElement('div');
    textBox.id = name;
    textBox.classList.add('text-box');

    if (centered == true) {
      textBox.style.textAlign = "center";
    }

    for (let i = 0; i < paragraphs.length; i++) {
      let paragraph = document.createElement('p');
      paragraph.id = `${name}_${i}`;
      paragraph.innerHTML = `${paragraphs[i]}`;
      textBox.appendChild(paragraph);
    }

    parent.appendChild(textBox);
  };

  // Create a scrollable text box.
  const addScrollText = (name, parent, paragraphs = [], lines = 1) => {
    let scrollBox = document.createElement('div');
    scrollBox.classList.add('scroll-box');
    scrollBox.classList.add('scroll');
    scrollBox.id = name;
    scrollBox.style.height = `${((lines - 1) * 24) + 20}px`;

    for (let i = 0; i < paragraphs.length; i++) {
      let paragraph = document.createElement('p');
      paragraph.id = `${name}_${i}`;
      paragraph.innerHTML = `${paragraphs[i]}`;
      scrollBox.appendChild(paragraph);
    }

    parent.appendChild(scrollBox);
  };

  return { addSlider, addButtonRow, addTitle, addText, addScrollText };
})();

export { uiElements }
