import * as wasm from "wasm-threads";
import { uiLayout } from './uiLayout'

function main() {
  uiLayout.initialLayout();
  
  let test = wasm.test_me();
  console.log(test);
}

main();