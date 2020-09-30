# wasm-threads

Proof of concept exercise. Running 2 threads concurrently in WASM (compiled from Rust).  

## Setup

Based on clone of https://github.com/sn99/wasm-template-rust, modified similarly to https://github.com/jinjagit/wasm-2d (but with changes specific to this repo).  

Note to self:  
After adding the following to `webpack.config.sys`...  
```
  ...
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
  ...,
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, '..')
    })
  ...
``` 
I needed to do:
* delete `target` dir  
* `$ wasm-pack build`  
* `$ cd www`  
* `$ npm install`  
* `$ npm run start` now running app @ `localhost:8080` (again)  

Then added in my [Modular UI](https://github.com/jinjagit/Modular_UI) (which was adjusted for this app).  

Note to self:  
Initially, no css files were passed on through Travis deploy.  
I needed to do:  
* Create `dist` dir in `www` dir and remove `dist` from `.gitignore` in `www`  
* Copy css files into new `dist` dir  
* Change css refs in `index.html` to:  
```
<link rel="stylesheet" href="reset.css" media="screen" />
<link rel="stylesheet" href="style.css" media="screen" />
```
* Add duplicate css refs to `index.html`:  
```
<link rel="stylesheet" href="./dist/reset.css" media="screen" />
<link rel="stylesheet" href="./dist/style.css" media="screen" />
```
This is not ideal, as now will have `2 file not found` errors in local and deployed browser console. Must be a better (correct) solution. But this works for now, and means I simply have to delete 2 css file entries from `index.html` on final deploy.  

Might be worth trying to build from my own webpack structure in my [Modular UI](https://github.com/jinjagit/Modular_UI), using this [wasm-pack tutorial](https://rustwasm.github.io/docs/wasm-pack/tutorials/npm-browser-packages/index.html), to see if I can get exatly the setup I want.  
  
Note: this process uses Travis CI to deploy to GitHub Pages.  

## Next steps:  

* Use [this tutorial](https://rustwasm.github.io/docs/wasm-bindgen/examples/import-js.html) to be able to update innerHTML of an element from Rust generated wasm (hopefully). But start with the console log example. DONE  
* Develop running timer (?ms - maybe too much to ask?)  

Not entirely sure what i am trying to do with this repo. Maybe I am trying to run main thread + 1 thread in wasm = can't start/stop main thread, but can show can start 2nd thread (have not worked out how to interupt a thread in Rust yet, but theoretically possible, though maybe not in wasm)