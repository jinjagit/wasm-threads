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
  
Note: this process uses Travis CI to deploy to GitHub Pages.  
