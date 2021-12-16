import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service:esbuild.Service;
const bundler =  async (rawCode: string) => {
    // If its the first time calling service run this code
    if(!service){
        service = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm', // You can load from file
            // wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm' // or npm
        });
    }

    try {
      const result = await service.build({
        entryPoints: ['index.js'],
        bundle: true,
        write:false,
        plugins:[
          unpkgPathPlugin(),
          fetchPlugin(rawCode)
        ],
        define:{
          'process.env.NODE_ENV': '"production"',
          global:"window"
        }
      });

      return { code: result.outputFiles[0].text, err:""};
    } catch (error:any) {
      /// return error
      return { code: "", err:error.message};
    }
    
}

export default bundler;