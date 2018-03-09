// Initial welcome page. Delete the following line to remove it.
'use strict';
const sharp = require('sharp');
import { remote } from 'electron';
const styles = document.createElement('style');
styles.innerText = `@import url(https://unpkg.com/spectre.css/dist/spectre.min.css);.empty{display:flex;flex-direction:column;justify-content:center;height:100vh;position:relative}.footer{bottom:0;font-size:13px;left:50%;opacity:.9;position:absolute;transform:translateX(-50%);width:100%}`;
const vueScript = document.createElement('script');
vueScript.setAttribute('type', 'text/javascript'), vueScript.setAttribute('src', 'https://unpkg.com/vue'), vueScript.onload = init, document.head.appendChild(vueScript), document.head.appendChild(styles);

function init() {
  Vue.config.devtools = false, Vue.config.productionTip = false, new Vue({
    data: {
      versions: {
        electron: process.versions.electron,
        electronWebpack: require('electron-webpack/package.json').version
      }
    },
    methods: {
      open(b) {
        require('electron').shell.openExternal(b)
      },
      doTiles() {
      /*  const inputImgPath = remote.dialog.showOpenDialog({
          message: "Select input img...",
          properties: ['openFile'],
        });*/
        /*const sharpDir = remote.dialog.showOpenDialog({
          message: "Select output dir...",
          properties: ['openDirectory', 'createDirectory'],
        });*/
        let arrayOfPromises = [];
        const sharpDir="/Users/bianco/here";
        const inputImgPath = "/Users/bianco/Data/colorChecker/1/tiff/img_00001.tif";
        //console.log(inputImgPath);
        for (var i = 0; i < 10; i++) {
          arrayOfPromises.push(sharp(inputImgPath)
              .background({
                r: 0,
                g: 0,
                b: 0
              })
              .extend({
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
              })
              .jpeg()
              .tile({
                size: 512,
                layout: 'google'
              })
              .toFile(sharpDir)
          );

        }
        Promise.all(arrayOfPromises).then(info => {console.log(info);}).catch(info => {console.log(info);})

      }
    },
    template: `<div><div class=empty><p class="empty-title h5">Welcome to your new project!<p class=empty-subtitle>Get started now and take advantage of the great documentation at hand.<div class=empty-action><button @click="open('https://webpack.electron.build')"class="btn btn-primary">Documentation</button> <button @click="doTiles()"class="btn btn-primary">Sharp</button><button @click="open('https://electron.atom.io/docs/')"class="btn btn-primary">Electron</button><br><ul class=breadcrumb><li class=breadcrumb-item>electron-webpack v{{ versions.electronWebpack }}</li><li class=breadcrumb-item>electron v{{ versions.electron }}</li></ul></div><p class=footer>This intitial landing page can be easily removed from <code>src/renderer/index.js</code>.</p></div></div>`
  }).$mount('#app')
}
