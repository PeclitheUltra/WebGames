export class Arrow
{
    state;
    object3D;
    speed;

    constructor(object3D, speed)
    {
        this.object3D = object3D
        this.speed = speed;
        this.state = ArrowStates.Idle;
    }

    launch()
    {
        if(this.state != ArrowStates.Idle)
        {
            console.error("cant launch arrow that is not idle");
            return;
        }

        this.state = ArrowStates.Flying;
    }

    update(deltaTime)
    {
        if(this.state == ArrowStates.Flying)
            this.object3D.translateY(this.speed * deltaTime);
    }

    getPosition()
    {
        return this.object3D.position;
    }

    setPosition(x, y, z)
    {
        this.object3D.position.set(x, y, z);
    }

    stick(wheel)
    {
        wheel.attach(this.object3D);
        this.state = ArrowStates.Stuck;
    }

    dispose()
    {
        this.state = ArrowStates.Dispose;
    }
}

export const ArrowStates = 
{
    Idle : 'Idle',
    Flying : 'Flying',
    Stuck : 'Stuck',
    Disposed : 'Disposed'
}