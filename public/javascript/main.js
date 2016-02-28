$(document).ready(function(){

  var body = document.querySelector('body');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  console.log(window.innerHeight);

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;



  $(window).resize(function (){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

  });

  function projectile(x,y){
    console.log('hello');
    console.log(x);
    console.log(y);
    console.log(window.innerWidth);
    console.log(canvas.width);

    // for(i=0; i < 600; i++){

    // ctx.clearRect(0,0,600,600);
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI*(2));
    ctx.fillStyle = 'black';
    ctx.closePath();
    ctx.fill();

    // }

  }

  $(canvas).on('click', function(e){
    var x = e.pageX;
    var y = e.pageY;

    projectile(x,y);



  })





})
