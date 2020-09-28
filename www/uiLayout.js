// See wiki for more details: https://github.com/jinjagit/myUI/wiki

import { uiElements } from './uiElements'

const uiLayout = (() => {
  const initialLayout = () => {
    // Left sidebar
    let parent = document.getElementById("left-ui-container");

    uiElements.addTitle("Modular_UI", "Procedurally_Generated", parent, true);
    uiElements.addButtonRow(parent, [
      ["readme", "action", 50],
      ["wiki", "action", 50]
    ]);
    uiElements.addSlider("parameter_A", parent);
    uiElements.addSlider("parameter_B", parent);
    uiElements.addSlider("parameter_C", parent, 3, 1, 5, 1);
    uiElements.addButtonRow(parent, [
      ["toggle_A", "toggle", 40, true],
      ["toggle_B", "toggle", 60, false]
    ]);
    uiElements.addButtonRow(parent, [
      ["toggle_C", "toggle", 33, true],
      ["toggle_D", "toggle", 34, false],
      ["toggle_E", "toggle", 33, true]
    ]);
    uiElements.addButtonRow(parent, [
      ["action_A", "action", 50],
      ["action_B", "action", 50]
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
      ["get_parameter_values", "action", 100]
    ]);
    uiElements.addScrollText(
      "params",
      parent,
      ["<br />"],
      6
    );

    // Right sidebar
    parent = document.getElementById("right-ui-container");

    uiElements.addTitle("Simon Tharby", "2020", parent);
    uiElements.addText("section_A", parent, ["Section A"], true);
    uiElements.addSlider("parameter_D", parent);
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
