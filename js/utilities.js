"use strict";

//draws basic rectangles
export function drawRect(ctx,x=10,y=10,height=5,width=5,color='red',stroke='red'){
    ctx.fillStyle = color;
    ctx.strokeStyle = stroke;
    ctx.fillRect(x-(width/2),y-(height/2),width,height);
}

//draws basic circles
export function drawCircle(ctx,x=10,y=10,radius=5,color='red',stroke='red'){
    ctx.fillStyle = color;
    ctx.strokeStyle = stroke;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.arc(x,y,radius,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

//draws basic triangles
export function drawTri(ctx,x=10,y=10,scaleX=1,scaleY=1,color='red',stroke='red'){
    ctx.fillStyle = color;
    ctx.strokeStyle = stroke;
    ctx.beginPath();
    ctx.moveTo(x-10*scaleX,y+10*scaleY);
    ctx.lineTo(x+10*scaleX,y+10*scaleY);
    ctx.lineTo(x,y-10*scaleY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

export function mapVal(val,min,max){
    val *= 100;
    val = Math.round(val);
    val = val % max;
    return val;
}