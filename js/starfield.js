import {drawRect,drawCircle,drawLine,drawTri,mapVal} from './utilities.js';

"use strict";
let canvas;
let ctx;
let stars = [];

//initiallize bg module
export function bgInit(cvs, cx){
    canvas = cvs;
    ctx = cx;
    genStars();
}

//draw far plane
export function drawBg(){
    /*ctx.fillStyle = 'red';
    ctx.fillRect(0,0,20,20);*/
    for(let i = 0; i < stars.length; i++){
        stars[i].draw();
        //console.log(stars[i].scale);
    }
}

//create star objects
function genStars(){
    for(let i = 0; i < 50; i++){
        stars.push(new Star(ctx,'rgb(100,100,50)',(Math.random() * 10) + 10,Math.random() * 360,new Victor(0, 0)));
    }
    console.log(stars);
}

//star class
class Star{
    constructor(ctx,color='grey',speed=5,angle=0,pos=null){
        this.color = color;
        this.speed = speed;
        this.angle = angle;
        this.ctx = ctx;
        this.pos = pos;
        this.size = 3;
        this.scale = 1;
        this.alpha = 1;
        this.invisFor = Math.floor(Math.random() * (canvas.height/20));
        this.frameCount = 0;
    }

    draw(){
        //console.log('in draw');
        this.ctx.save();
        this.ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
        this.ctx.rotate(-Math.PI*this.angle/180);
        if(this.frameCount <= this.invisFor){
            this.ctx.globalAlpha = 0;
        }
        else{
            if(this.alpha > .1){
                this.alpha = ( mapVal(this.scale,0,100) / 100)*4;
            }
            else{
                this.alpha = Math.floor(this.alpha)*4;
            }
            this.ctx.globalAlpha = this.alpha / 2;//(1-((this.scale)*100))*2;
        }
        
        //console.log(this.ctx.globalAlpha);
        this.pos.x+=this.scale*this.speed;
        //this.pos.y+=this.scale*this.speed;
        drawLine(this.ctx, this.pos.x, this.pos.y, this.pos.x * this.speed / 4, this.pos.y * this.speed / 4, 'black');
        //drawCircle(this.ctx,this.pos.x,this.pos.y,this.size*Math.pow(this.scale,this.speed/2),this.color,'rgba(0,0,0,0)');
        this.ctx.restore();
        this.scale+=0.01;
        this.frameCount++;
        if(this.size*Math.pow(this.scale,this.speed/2) > 100){
            this.scale = 1;
            this.pos = new Victor(0,0);
            this.alpha = 1;
            this.frameCount = 0;
            let randAng = Math.random() * 360;
            this.angle += randAng;
        }
    }
}