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


  
Note: this process uses Travis CI to deploy to GitHub Pages.  
