"use strict";

(function(){
  
  //set up audio nodes and create graph
  let audioCtx = new AudioContext();
  let source = audioCtx.createMediaElementSource(document.querySelector('audio'));
  let gain = audioCtx.createGain();
  let pan = audioCtx.createPanner();
  let analyser = audioCtx.createAnalyser();
  source.connect(gain);
  gain.connect(analyser);
  pan.connect(audioCtx.destination)
  analyser.connect(pan);

  //initialize all varibles and element references
  analyser.fftSize = 2048;
  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  let canvas = document.querySelector('.main-visualizer');
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  let ctx = canvas.getContext("2d");
  let styleSelect = document.querySelector('#style-selector');
  let noiseSelect = document.querySelector('.noise-check');

  let sizeScale = 1, mouseY=0, mouseX=0, vizStyle='bars', fillType='random', panX=canvas.width/2, panY=canvas.height/2, canPan=false, curves=false, noise=false, volume=1;
  let beatsArr = null;

  //set default values
  window.onload = e =>{
    sizeScale = .30;
    document.querySelector('.size-slider').value = 30;
    document.querySelector(".noise-check").checked = false;
    document.querySelector('.volume-slider').value = 100;
    document.querySelector(".curve-check").checked = false;
    volume = 1;
    noise = false;
    vizStyle = 'bars';
    fillType = 'random';
  }

  //control panning
  canvas.onmousedown = e =>{
    canPan = true;
  }

  document.onmousemove = e => {
    if(canPan){
      panX = e.clientX;
      panY = e.clientY;
    }
  }

  document.onmouseup = e =>{
    canPan = false;
  }

  //functions for UI controls
  document.querySelector('#song-selector').onchange = e => {
    let src = document.querySelector('audio');
    src.src = `audio/${e.target.value}`;
  }

  noiseSelect.onchange = e =>{
    noise = e.target.checked;
  }


  document.querySelector('#color-selector').onchange = e => {
    fillType = e.target.value;
  }

  document.querySelector('.size-slider').onchange = e => {
    sizeScale = e.target.value / 100;
  }

  document.querySelector('.volume-slider').onchange = e => {
    volume = e.target.value / 100;
  }

  document.querySelector('.fileIn').onchange = function() {
    let src = document.querySelector('audio');
    src.src = URL.createObjectURL(this.files[0]);
    //beatsArr = CreatePeaks();
  }

  document.querySelector('#bar-count').onchange = e => {
    analyser.fftSize = e.target.value;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
  }

  document.body.onresize = function(){
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;
  }

  document.querySelector(".curve-check").onchange = e => {
    curves = e.target.checked;
  }

  document.querySelector('.fullscreen-check').onchange = e => {
    let page = document.documentElement;
    if(e.target.checked){
      if (page.requestFullscreen) {
        page.requestFullscreen();
      } else if (page.mozRequestFullScreen) {
        page.mozRequestFullScreen();
      } else if (page.webkitRequestFullscreen) {
        page.webkitRequestFullscreen();
      } else if (page.msRequestFullscreen) {
        page.msRequestFullscreen();
      }
    }
    else{
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  //returns an average value for an array of numbers
  function getAverage(dataLoc=dataArray){
    let total = 0;    
    for(let i = 0; i < bufferLength; i++){
      total += dataLoc[i];
    }
    return total / bufferLength;
  }

  //controls the disappearing UI based on how long the mouse is idle
  let timer;
  onmousemove = e => {
    mouseX = window.mouseX;
    mouseY = window.mouseY;
    //jQuery used to fade UI
    $('#controls').fadeIn();
    $('audio').fadeIn();
    $("body").css('cursor', '');
    clearTimeout(timer);
    timer = setTimeout(mouseStop,2000);
  }

  function mouseStop(e){
    if(window.mouseX == mouseX && window.mouseY == mouseY){
      $("#controls").fadeOut();
      $("audio").fadeOut();
      $("body").css('cursor', 'none');
    }
  }

  //set default values for color and the number of frames
  let color = 'black';
  let drawCount = 0;  

  function draw() {
    
    requestAnimationFrame(draw);

    //adjust the volume
    gain.gain.value = volume;
    
    //pan the audio
    pan.positionX.value = (panX - canvas.width / 2) * .01;
    pan.positionY.value = (panY - canvas.height / 2) * .01;
    pan.positionZ.value = -3;
    pan.rolloffFactor = .5;
    pan.distanceModel = 'exponential';
    pan.coneOuterGain = .5;

    //change audio data based on user selection
    if(styleSelect.value == 'frequency'){
      analyser.getByteFrequencyData(dataArray);
    }
    else{
      analyser.getByteTimeDomainData(dataArray);
    }

    /*if(GetAverage() > 180){
      ctx.fillStyle = "rgb(200,0,0)";
    }
    else{*/
    
    ctx.fillStyle = "rgba(20, 20, 20, .1)"
      //;}
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //adds noise to the background
    if(noiseSelect.checked){
      let imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
      for(let i = 0; i < imgData.data.length; i+=4){
        let ran = Math.random();
        if(ran >= .99){
          imgData.data[i] = 255;
          imgData.data[i + 1] = 255;
          imgData.data[i + 2] = 255;
        }

        
      }
      ctx.putImageData(imgData,0,0);
    }

    ctx.fillStyle = 'rgb(20, 20, 20)';
    let freqArr = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(freqArr);
    
    //draw the audio visualization
    let barWidth = ctx.canvas.width / analyser.fftSize;
    ctx.lineWidth = barWidth;
    ctx.strokeStyle = 'black';
    ctx.save();
    ctx.translate(panX,panY);
    for(let i = 0; i < bufferLength; i++){
      ctx.save();
      let theta = (-i * Math.PI * 2/ bufferLength) - Math.PI /2;
      if(vizStyle == 'bars'){
        if(fillType == 'random'){
          if(drawCount % 60 == 0){
            randomColor();
          }
        }
        else{
          let grad = ctx.createLinearGradient(0,0,0,canvas.width * sizeScale);
          grad.addColorStop(0, 'black');
          grad.addColorStop(.33, 'blue');
          grad.addColorStop(.66, 'green');
          grad.addColorStop(1, 'red');
          color = grad;
        }
        ctx.strokeStyle = color;
        //ctx.translate(GetAverage(freqArr), GetAverage(freqArr));
        ctx.rotate(theta);
        let h = 0;
        if(dataArray[i] != 0){
          h = ((ctx.canvas.height / 2) * sizeScale * getAverage(freqArr)) / dataArray[i];
          /*if(h > ctx.canvas.width / 2){
            h = ctx.canvas.width / 2;
          }   */
        }
        ctx.beginPath();
        ctx.moveTo(0,getAverage(freqArr));
        ctx.lineTo(0,h + getAverage(freqArr));
        ctx.closePath();
        ctx.stroke();
      }
      //used to generate curve instead of bars, currently not working
      else{
        ctx.rotate((-i * Math.PI * 2/ bufferLength) - Math.PI /2);
        if(i != 0){
          ctx.strokeStyle = color;
          ctx.fillStyle = color;
          let ch = (ctx.canvas.height * sizeScale * getAverage(freqArr)) / dataArray[i];
          let ph = (ctx.canvas.height * sizeScale * getAverage(freqArr)) / dataArray[i - 1];
          let pX = Math.cos(-theta) * ch - Math.sin(-theta) * ch;
          let nX = Math.cos(theta) * ch - Math.sin(theta) * ch;
          let nh = (ctx.canvas.height * sizeScale * getAverage(freqArr)) / dataArray[i + 1];
          
          ctx.beginPath();
          ctx.moveTo(pX,ph);
          ctx.quadraticCurveTo(0,ch,nX,nh);
          ctx.closePath();
          ctx.fill();
        }

        
      }

      

      
      ctx.restore();/* 
      if(curves && i % 10 == 0){
        ctx.save();
        ctx.translate(canvas.width,0);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(i/canvas.width,0);
        ctx.quadraticCurveTo((i+5)/canvas.width, getAverage(freqArr), (i+10)/canvas.width,0);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      } */
    }
    ctx.restore();

    function drawBezierCurves(){
      ctx.strokeStyle = 'rgba(255,255,255,.5)';
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      for(let i = 0; i < bufferLength; i++){
        
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.quadraticCurveTo(10, freqArr[i] * sizeScale * 3, 20, 0);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.translate(20,0);
      }
    }

    if(curves){
      ctx.save();
      drawBezierCurves();
      ctx.restore();
      ctx.save();
      ctx.translate(ctx.canvas.width, ctx.canvas.height);
      ctx.rotate(Math.PI);
      drawBezierCurves();
      ctx.restore();
    }
    

    //draw cicle in the center of the visualization, radius changes based on audio data
    ctx.beginPath();
    ctx.arc(panX, panY, (getAverage(freqArr) + canvas.width * .05), 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();

    //ResetColor();

    /*if(invertSelect.checked){
      let imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
      for(let i = 0; i < imgData.data.length; i+=4){
        let red = imgData.data[i],
        green = imgData.data[i + 1],
        blue = imgData.data[i + 2];

        imgData.data[i] = 255 - red;
        imgData.data[i + 1] = 255 - green;
        imgData.data[i + 2] = 255 - blue;
      }
      ctx.putImageData(imgData,0,0);
    }*/
    
    



    drawCount++;
  }
  
  //returns a random rgb color
  function randomColor(){
    let rRed = Math.floor((Math.random()* 1000) % 255);
    let rGreen = Math.floor((Math.random()* 1000) % 255);
    let rBlue = Math.floor((Math.random()* 1000) % 255);
    color = `rgb(${rRed},${rGreen}, ${rBlue})`;
  }

  //used to help fully fade background, lags the visualizer too much
  function resetColor(){
    let imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
    for(let i = 0; i < imgData.data.length; i+=4){
      let red = imgData.data[i],
      green = imgData.data[i + 1],
      blue = imgData.data[i + 2];

      let a = 20 - red,
      b = 20 - green,
      c = 20 - blue;

      if(a > -20 && a < 40 && b > -20 && b < 40 && c > -20 && c < 40){
        imgData[i] = 20;
        imgData[i+1] = 20;
        imgData[i+2] = 20;
        imgData[i+3] = 255;
      }
    }
    ctx.putImageData(imgData,0,0);
  }

  draw(); 
})();