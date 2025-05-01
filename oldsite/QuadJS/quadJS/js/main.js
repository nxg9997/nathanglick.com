import * as util from "./utility.js";
import * as data from "./data.js";

//create a variable to store the quadtree
let quadtree = null;

export function getTree(){
    return quadtree;
}

//initiallize the quadtree program
export function init(){
    //clear the canvas with a solid color
    util.drawRect(data.get().ctx,data.get().canvas.width/2,data.get().canvas.height/2,data.get().canvas.height,data.get().canvas.width,"rgb(100,100,100)");

    //generate a quadtree based on a mouse click position
    onmousedown = e => {
        if(quadtree != null){
            quadtree.burn();
        }
        let circle = {
            center: {
                x:e.clientX,
                y:e.clientY
            },
            radius: 30
        };
        
        quadtree = new Quadtree(circle,{x:data.get().canvas.width/2,y:data.get().canvas.height/2},data.get().canvas.height,data.get().canvas.width);
        draw(circle);
        //console.log(quadtree);
        
    };
}

//draw the quadtree and click location onto the canvas
export function draw(collider){
    
    util.drawRect(data.get().ctx,data.get().canvas.width/2,data.get().canvas.height/2,data.get().canvas.height,data.get().canvas.width,"rgb(100,100,100)");

    if(quadtree != null){
        quadtree.outline();
    }

    util.drawCircle(data.get().ctx,collider.center.x,collider.center.y,collider.radius,"rgba(255,0,0,.5)","rgba(0,0,0,0)");
}

//quadtree class
export class Quadtree{
    constructor(collider,center,height,width){
        this.children = null;
        
        this.halfWidth = width/2;
        this.halfHeight = height/2;
        this.center = {x:center.x,y:center.y};
        this.subdivide(collider);
    }

    //recursively subdivide the quadtree based on a circle collider
    subdivide(collider){
        
        if(util.CircleRectCollision(collider,this.collider()) && (this.halfHeight >= 2 && this.halfWidth >= 2)){
            this.children = [];
            
            this.children.push(new Quadtree(collider,{x:this.center.x - this.halfWidth/2, y:this.center.y - this.halfHeight/2},this.halfHeight,this.halfWidth));
            this.children.push(new Quadtree(collider,{x:this.center.x + this.halfWidth/2, y:this.center.y - this.halfHeight/2},this.halfHeight,this.halfWidth));
            this.children.push(new Quadtree(collider,{x:this.center.x - this.halfWidth/2, y:this.center.y + this.halfHeight/2},this.halfHeight,this.halfWidth));
            this.children.push(new Quadtree(collider,{x:this.center.x + this.halfWidth/2, y:this.center.y + this.halfHeight/2},this.halfHeight,this.halfWidth));
            
        }
    }

    //recursively destroy the quadtree
    burn(){
        for(let i = 0; i < 4; i++){
            if(this.children == null) break;
            if(this.children[i] == null) continue;
            this.children[i].burn();
        }
        this.children = [];
    }

    //returns the rectange collider for the current quadrant
    collider(){
        return {
            center: this.center,
            halfHeight: this.halfHeight,
            halfWidth: this.halfWidth
        };
    }

    //recursively draw the quadtree
    outline(){
        util.drawRect(data.get().ctx,this.center.x,this.center.y,this.halfHeight*2,this.halfWidth*2,"rgba(0,0,0,0)","black");
        for(let i = 0; i < 4; i++){
            if(this.children == null) break;
            if(this.children[i] == null) continue;
            this.children[i].outline();
        }
    }
}