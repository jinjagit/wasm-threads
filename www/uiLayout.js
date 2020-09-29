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
      ["Output:",
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

    uiElements.addSlider("f64_sine_iterations", parent, 50000000, 100000, 100000000, 100000);
    uiElements.addText(
      "example_text_box",
      parent,
      ["Output:",
        "<br />",
        "<br />",
        "<br />",
        "<br />"]
    );

    // Other UI div(s) - they don't have to be sidebars!
  };

  return { initialLayout };
})();

export { uiLayout }
