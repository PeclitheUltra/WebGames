import { initialize as intiializeScene } from './game/initialize';
import { Gameplay } from './game/mainGameplay';

const { scene, renderer, camera } = intiializeScene();

async function start() 
{
    document.addEventListener('mousedown', () => { gameplay.launchArrow() }, false);

    let gameplay = new Gameplay(scene);
    let lastFrameTime = 0;
    let deltaTime = 0;
    gameplay.prepareGameplay();

    function render(currentTime)
    {      
        currentTime *= 0.001;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
        deltaTime = currentTime - lastFrameTime;
        gameplay.update(deltaTime);
        lastFrameTime = currentTime;
    }
    requestAnimationFrame(render);  
}

start();

