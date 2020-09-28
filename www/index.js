import * as wasm from "wasm-threads";

const compareResults = (textElement, tJS, tWasm) => {
  if (tJS < tWasm) {
    textElement.innerHTML = `wasm ran benchmark ${(tWasm / tJS).toFixed(2)} times SLOWER than Javascript`;
    textElement.style.color = "red";
  } else {
    textElement.innerHTML = `wasm ran benchmark ${(tJS / tWasm).toFixed(2)} times faster than Javascript`;
    textElement.style.color = "green";
  }
}

const sineSeries = (n) => {
  let i;
  let result = 0;
  for (i = 1; i < n + 1; i++) {
    result = result + Math.sin(i);
  }
  return result;
}

const createArrayOfInts = (n) => {
  let ary = [];

  for (let i = 1; i < n + 1; i++) {
    ary.push(i);
  }

  return ary;
}

const iterationsBenchmark = () => {
  // Benchmark of 10,000,000 iterations:
  // sin(1) + sin(2) + sin(3) ... + sin(10000000)

  // JS benchmark
  let jsFText = document.getElementById("js-f-text");
  let start = Date.now();
  let result1 = sineSeries(10000000);
  let t1 = Date.now() - start;
  jsFText.innerHTML = `Javascript only (64-bit floats): ${t1} ms, with final result = ${result1}`;

  // wasm f32 benchmark
  let wasmF32Text = document.getElementById("wasm-f32-text");
  start = Date.now();
  let result2 = wasm.sine_series_f32(10000000); // call wasm function
  let t2 = Date.now() - start;
  wasmF32Text.innerHTML = `wasm (32-bit floats) called from JS: ${t2} ms, with final result = ${result2}`;

  // compare results
  let summaryF32Text = document.getElementById("summary-f32-text");
  compareResults(summaryF32Text, t1, t2);

  // wasm f64 benchmark
  let wasmF64Text = document.getElementById("wasm-f64-text");
  start = Date.now();
  let result3 = wasm.sine_series_f64(10000000); // call wasm function
  let t3 = Date.now() - start;
  wasmF64Text.innerHTML = `wasm (64-bit floats) called from JS: ${t3} ms, with final result = ${result3}`;

  // compare results
  let summaryF64Text = document.getElementById("summary-f64-text");
  compareResults(summaryF64Text, t1, t3);
};

const arraySumBenchmark = () => {
  // Benchmark of summing elements of array
  // sum [1..1000000]
  // NOTE: Might panic on OSX due to Rust wasm-timer 'unreachable' error.

  // JS benchmark
  let ary = createArrayOfInts(100000000);

  let jsAryText = document.getElementById("js-ary-text");
  let start = Date.now();

  let sum1 = ary.reduce((x, y) => x + y, 0);
  let t4 = Date.now() - start;
  jsAryText.innerHTML = `Javascript only: ${t4} ms, with final result = ${sum1}`;

  //wasm benchmark
  let wasmAryText = document.getElementById("wasm-ary-text");
  let wasmAryResults = wasm.sum_u32();
  let t5 = Number(wasmAryResults[1]);
  wasmAryText.innerHTML = `wasm called from JS: ${wasmAryResults[1]} ms, with final result = ${wasmAryResults[0]}`;

  // compare results
  let summaryAryText = document.getElementById("summary-ary-text");
  compareResults(summaryAryText, t4, t5);
};

const main = (() => {
  iterationsBenchmark();
  arraySumBenchmark();
})();
