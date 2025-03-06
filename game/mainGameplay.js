import { ModelPaths, Object3DLoader } from "./object3DLoader";
import { Wheel } from "./wheel";
import { Arrow } from "./arrow";

export class Gameplay
{
    #scene;
    #wheel;
    #activeArrow;
    #objectLoader = new Object3DLoader();

    constructor(scene)
    {
        this.#scene = scene;
    }

    async prepareGameplay()
    {
        await this.createWheel();
        await this.createArrow();
    }
    
    update(deltaTime)
    {
        if(this.#activeArrow)
        {
            this.#activeArrow.update(deltaTime);
            if(this.#activeArrow.getPosition().distanceTo(this.#wheel.getPosition()) < 0.5)
            {
                let vectorFromWheelToArrow = this.#activeArrow.getPosition().sub(this.#wheel.getPosition());
                vectorFromWheelToArrow.normalize();
                vectorFromWheelToArrow.multiplyScalar(0.5);
                let arrowNewPosition = vectorFromWheelToArrow.add(this.#wheel.getPosition());
                this.#activeArrow.setPosition(arrowNewPosition.x, arrowNewPosition.y, arrowNewPosition.z);
                if(this.#wheel.getCanStick())
                {
                    this.#activeArrow.stick(this.#wheel.object3D);
                    this.#wheel.stickArrow(this.#activeArrow);
                }
                else
                {
                    //push away
                }
                this.#activeArrow = undefined;
            }
        }
        if(this.#wheel)
            this.#wheel.update(deltaTime);
    }

    async launchArrow()
    {
        if(!this.#activeArrow)
            return;
        else
        {
            this.#activeArrow.launch();
            await new Promise(r => setTimeout(r, 500));
            this.createArrow();
        }
    }

    async createWheel()
    {
        let wheel = await this.#objectLoader.getModel(ModelPaths.Wheel);
        wheel.position.set(0, 0, 0.1);
        this.#wheel = new Wheel(wheel, 3, 1);
        this.#scene.add(wheel);
    }

    async createArrow()
    {
        let arrow = await this.#objectLoader.getModel(ModelPaths.Arrow);
        arrow.position.set(0, -1.5, 0);
        this.#activeArrow = new Arrow(arrow, 10);
        this.#scene.add(arrow);
    }
}