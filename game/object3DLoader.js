import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export class Object3DLoader
{
    #loadedModels = [];

    async getModel(path)
    {
        if(this.#loadedModels[path] != undefined)
        {
            return this.#loadedModels[path].clone();
        }
        let model = await this.getLoadModelPromise(path);
        this.#loadedModels[path] = model;
        return model.clone();
    }

    async getLoadModelPromise(path)
    {
        return new Promise((resolve, reject) =>
            {
                loader.load(path, function (gltf) 
                {
                    resolve(gltf.scene);
                }, undefined, function (error) 
                {
                    console.error(error);
                    reject(error);
                });
            });
    }
}

export const ModelPaths =
{
    Wheel: 'assets/models/wheel.glb',
    Arrow: 'assets/models/arrow.glb'
}