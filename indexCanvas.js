import {drawRect,drawCircle,drawTri} from './js/utilities.js';
import {bgInit,drawBg} from './js/starfield.js';

export function init(){
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.onresize = e => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    let frameCount = 0;

    bgInit(canvas,ctx);

    //set frame rate, example found at: http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
    let fps = 30;
    let currTime;
    let prevTime = Date.now();
    let interval = 1000/fps;
    let delta = 0;

    //draw();
    let loop = setInterval(draw,interval);
    function draw(){
        //requestAnimationFrame(draw);

        currTime = Date.now();
        delta = currTime - prevTime;

        if(delta > interval){
            //ctx.globalAlpha = 1;
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0,canvas.width, canvas.height);
            //gradually brightens screen
            /*if(frameCount <= 2000){
                /*ctx.fillStyle = `rgb(${frameCount/2},${frameCount/2},${frameCount/2})`;
                ctx.fillRect(0,0,canvas.width, canvas.height);
                ctx.globalAlpha = 1 / (frameCount+1 / 2000);
            }*/
            drawBg();
    
    
            frameCount++;
        }
        
    }
}