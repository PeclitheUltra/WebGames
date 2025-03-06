import { Vector3 } from "three";

export class Wheel
{
    get object3D() { return this.#wheel3D; } 
    #radius;
    #arrowsInside = [];
    #wheel3D;
    #rotationSpeed;
    #elasticity = 50;
    #drag = 3;
    #anchorPosition;
    #velocity = new Vector3(0, 0, 0);

    constructor(wheel3D, rotationSpeed, radius)
    {
        this.#wheel3D = wheel3D;
        this.#rotationSpeed = rotationSpeed;
        this.#radius = radius;
        this.#anchorPosition = wheel3D.position.clone();
    }

    stickArrow(arrow)
    {
        this.#arrowsInside.push(arrow);
        this.#velocity.add(new Vector3(0, 1, 0));
    }

    getCanStick()
    {
        return true;
    }

    getPosition()
    {
        return this.#wheel3D.position;
    }

    update(deltaTime)
    {
        this.#wheel3D.rotateZ(this.#rotationSpeed * deltaTime);

        let elasticForce = this.#anchorPosition.clone();
        elasticForce.sub(this.#wheel3D.position);
        elasticForce.multiplyScalar(deltaTime * this.#elasticity);
        this.#velocity.add(elasticForce);

        let dragForce = this.#velocity.clone();
        dragForce.negate();
        dragForce.multiplyScalar(this.#drag * deltaTime);

        this.#velocity.add(dragForce);

        let movementVector = this.#velocity.clone();
        this.#wheel3D.position.add(movementVector.multiplyScalar(deltaTime));
    }
}