// adapted from Siddharth Naithani's original file, 2020
// https://github.com/sn99/wasm-template-rust/blob/master/src/lib.rs

use wasm_bindgen::prelude::*;
use wasm_timer::Instant;

mod utils;

// NOTE: wasm-timer might panic on Mac OSX. Cannot find alternative.
// std::time stuff, whether or not via wasm-timer, fail as 'unreachable'
// Only used for benchmarking, so not otherwise mission-critical.

#[wasm_bindgen]
pub fn sine_series_f32(n: i32) -> f32 {
    let mut counter = 1;
    let stop = n + 1;
    let mut result: f32 = 0.0;

    while counter != stop {
        result = result + (counter as f32).sin();
        counter += 1;
    }

    result
}

#[wasm_bindgen]
pub fn sine_series_f64(n: i32) -> f64 {
    let mut counter = 1;
    let stop = n + 1;
    let mut result: f64 = 0.0;

    while counter != stop {
        result = result + (counter as f64).sin();
        counter += 1;
    }

    result
}

// https://rustwasm.github.io/docs/wasm-bindgen/reference/types/boxed-number-slices.html

#[wasm_bindgen]
pub fn take_boxed_number_slice_by_value(x: Box<[f64]>) {}

// returns an array (containing 0..42) to JS
#[wasm_bindgen]
pub fn return_boxed_number_slice() -> Box<[u32]> {
    (0..42).collect::<Vec<u32>>().into_boxed_slice()
}

#[wasm_bindgen]
pub fn take_option_boxed_number_slice(x: Option<Box<[u8]>>) {}

#[wasm_bindgen]
pub fn return_option_boxed_number_slice() -> Option<Box<[i32]>> {
    None
}

// Example function that receives array from JS, and returns a mutated copy:
#[wasm_bindgen]
pub fn add_one_to_each(x: Box<[u8]>) -> Box<[u8]> {
    let mut vec = Vec::new();
    
    for element in x.iter() {
        vec.push(element + 1);
    }

    let boxed: Box<[u8]> = vec.into_boxed_slice();
    
    boxed
}

// Benchmark summing an array:
#[wasm_bindgen]
pub fn sum_u32() -> Box<[u64]> {
    let v: Vec<u32> = (1..100000001).collect();

    let start = Instant::now();
    
    let sum: u64 = v.iter().map(|x| *x as u64).sum();

    let now = Instant::now();
    let elapsed: u64 = now.duration_since(start).as_millis() as u64;

    let results: Vec<u64> = vec![sum, elapsed];
    let boxed: Box<[u64]> = results.into_boxed_slice();
    
    boxed
}
