import * as main from "./main.js";

let canvas;
let ctx;

//returns the canvas and context data
export function get(){
    return {
        canvas: canvas,
        ctx: ctx
    };
}

//initiallize the canvas and context data
export function init(){
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //if the window is resized, also resize the canvas
    onresize = _ => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        main.init();
    };
}

export function init2(height,width,cnv){
    canvas = cnv;
    ctx = canvas.getContext('2d');

    canvas.height = height;
    canvas.width = width;
}