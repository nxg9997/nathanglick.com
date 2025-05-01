//draws basic rectangles
export function drawRect(ctx,x=10,y=10,height=5,width=5,color='red',stroke='red'){
    ctx.fillStyle = color;
    ctx.strokeStyle = stroke;
    ctx.fillRect(x-(width/2),y-(height/2),width,height);
    ctx.strokeRect(x-(width/2),y-(height/2),width,height);
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

//map a value to a range of values
export function mapVal(val,min,max){
    val *= 100;
    val = Math.round(val);
    val = val % max;
    return val;
}

//actually maps a value from one range to another
export function mapVal2(val,imin,imax,omin,omax){
    let output = omin + ((omax - omin) / (imax - imin)) * (val - imin);
    return output;
}

//draw text onto the canvas
export function drawText(ctx,x=10,y=10,color="red",font="30px Arial",text="memes"){
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text,x,y);
}

//determine if there is a collision between a circle and rectangle
export function CircleRectCollision(circle,rect){
    
    //checks if the circle center is inside the rectangle
    if(circle.center.x < rect.center.x + rect.halfWidth && 
        circle.center.x > rect.center.x - rect.halfWidth && 
        circle.center.y < rect.center.y + rect.halfHeight && 
        circle.center.y > rect.center.y - rect.halfHeight){
        return true;
    }

    //Check for collisions between the circle and rectangle edges
    //AB
    if(lineCircle(rect.center.x-rect.halfWidth,rect.center.y+rect.halfHeight,rect.center.x+rect.halfWidth,rect.center.y+rect.halfHeight,circle.center.x,circle.center.y,circle.radius)){
        return true;
    }
    //BC
    if(lineCircle(rect.center.x+rect.halfWidth,rect.center.y+rect.halfHeight,rect.center.x+rect.halfWidth,rect.center.y-rect.halfHeight,circle.center.x,circle.center.y,circle.radius)){
        return true;
    }
    //CD
    if(lineCircle(rect.center.x+rect.halfWidth,rect.center.y-rect.halfHeight,rect.center.x-rect.halfWidth,rect.center.y-rect.halfHeight,circle.center.x,circle.center.y,circle.radius)){
        return true;
    }
    //DA
    if(lineCircle(rect.center.x-rect.halfWidth,rect.center.y-rect.halfHeight,rect.center.x-rect.halfWidth,rect.center.y+rect.halfHeight,circle.center.x,circle.center.y,circle.radius)){
        return true;
    }

    //if no collision is detected, return false
    return false;
}

  
  //taken from: http://www.jeffreythompson.org/collision-detection/line-circle.php
  // POINT/CIRCLE
  export function pointCircle(px, py, cx, cy, r) {
  
    // get distance between the point and circle's center
    // using the Pythagorean Theorem
    let distX = px - cx;
    let distY = py - cy;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );
  
    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r) {
      return true;
    }
    return false;
  }
  


  // LINE/CIRCLE
export function lineCircle(x1, y1, x2, y2, cx, cy, r) {

    // is either end INSIDE the circle?
    // if so, return true immediately
    let inside1 = pointCircle(x1,y1, cx,cy,r);
    let inside2 = pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2) return true;
  
    // get length of the line
    let distX = x1 - x2;
    let distY = y1 - y2;
    let len = Math.sqrt( (distX*distX) + (distY*distY) );
  
    // get dot product of the line and circle
    let dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);
  
    // find the closest point on the line
    let closestX = x1 + (dot * (x2-x1));
    let closestY = y1 + (dot * (y2-y1));
  
    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    let onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) return false;
  
    
  
    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );
  
    if (distance <= r) {
      return true;
    }
    return false;
  }
  
  // LINE/POINT
  export function linePoint(x1, y1, x2, y2, px, py) {
  
    // get distance from the point to the two ends of the line
    let d1 = dist(px,py, x1,y1);
    let d2 = dist(px,py, x2,y2);
  
    // get the length of the line
    let lineLen = dist(x1,y1, x2,y2);
  
    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    let buffer = 0.1;    // higher # = less accurate
  
    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
      return true;
    }
    return false;
  }

  //returns the distance between two points
  export function dist(x1,y1,x2,y2){
    return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
  }