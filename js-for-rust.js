export function logme(n) {
  console.log("JS function called from Rust!!");
  document.getElementById("actions_0").innerHTML = "This text was set from Rust!";
  document.getElementById("actions_2").innerHTML = `${n}`;
}

// export function printme() {
//   return "Rust!";
// }