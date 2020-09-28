// See wiki for more details: https://github.com/jinjagit/myUI/wiki

import { uiElements } from './uiElements'

const uiLayout = (() => {
  const initialLayout = () => {
    // Left sidebar
    let parent = document.getElementById("left-ui-container");

    uiElements.addTitle("Thread_1", "ms elapsed display", parent, true);
    uiElements.addButtonRow(parent, [
      ["start_1", "action", 50],
      ["stop_1", "action", 50]
    ]);
    uiElements.addText(
      "actions",
      parent,
      ["Last 3 actions:",
        "<br />",
        "<br />",
        "<br />",
        "<br />"]
    );
    uiElements.addButtonRow(parent, [
      ["reset_1", "action", 100]
    ]);

    // Right sidebar
    parent = document.getElementById("right-ui-container");

    uiElements.addTitle("Thread_2", "long computation", parent);
    uiElements.addButtonRow(parent, [
      ["start_2", "action", 50],
      ["stop_2", "action", 50]
    ]);

    uiElements.addSlider("64_bit_sine_iterations", parent, 50000000, 100000, 100000000, 100000);
    uiElements.addSlider("parameter_E", parent);
    uiElements.addText(
      "example_text_box",
      parent,
      ["This is a text box.",
        "<br />",
        "It will grow to fit the text provided."]
    );
    uiElements.addText("section_A", parent, ["Section B"], true);
    uiElements.addButtonRow(parent, [
      ["toggle_F", "toggle", 33, false],
      ["toggle_G", "toggle", 34, false],
      ["toggle_H", "toggle", 33, true]
    ]);
    uiElements.addScrollText(
      "scroll_A",
      parent,
      ["This is a scrollable text box.",
        "<br />",
        "It has a fixed height and is useful when a variable quantity of text may be output to the text box.",
        "Each paragraph is given an id value and thus can be styled &/or updated individually."],
      4
    );
    uiElements.addButtonRow(parent, [
      ["action_C", "action", 50],
      ["action_D", "action", 50]
    ]);

    // Other UI div(s) - they don't have to be sidebars!
  };

  return { initialLayout };
})();

export { uiLayout }
