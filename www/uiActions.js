// See wiki for more details: https://github.com/jinjagit/myUI/wiki

import * as wasm from "wasm-threads";
import { params } from './params'

const uiActions = (() => {
  let leftSidebar = document.getElementById("left-sidebar");
  let rightSidebar = document.getElementById("right-sidebar");
  let showUI = document.getElementById("show-UI");

  showUI.onmouseup = function() {
    leftSidebar.style.display = "block";
    rightSidebar.style.display = "block";
    printLastAction("UI"); // Dev use only
  }

  // Function action(id): This is where the UI interfaces with the app
  // For example, if this UI was for an app that draws onto a canvas, we could
  // expect an action button to call a draw() function via this function.
  const action = (id) => {
    printLastAction(id);

    if (id == "get_parameter_values") {
        printParams();
    } else if (id == "readme") {
        window.location.href = "https://github.com/jinjagit/Modular_UI/blob/master/README.md"
    } else if (id == "wiki") {
        window.location.href = "https://github.com/jinjagit/Modular_UI/wiki"
    } else if (id = "start_1") {
      let result3 = wasm.sine_series_f64(10000000);
      console.log(result3);
    }
  };


  // DEV ACTIONS - used to print actions & param values during development

  const printLastAction = (id) => {
    document.getElementById(`actions_${4}`).innerHTML = document.getElementById(`actions_${3}`).innerHTML;
    document.getElementById(`actions_${3}`).innerHTML = document.getElementById(`actions_${2}`).innerHTML;
    document.getElementById(`actions_${2}`).innerHTML = `${id}`;
  };

  const printParams = () => {
    let paramsDiv = document.getElementById('params');

    while (paramsDiv.firstChild) {
        paramsDiv.removeChild(paramsDiv.lastChild);
      }

    let parameters = params.getUiParams();

    for (let [key, value] of parameters) {
      let paramText = document.createElement('p');
      paramText.innerHTML = `${key}: ${value}`;
      paramsDiv.appendChild(paramText);
    }
  };

  return { action };
})();

export { uiActions }