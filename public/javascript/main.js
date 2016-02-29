$(document).ready(function(){

  var body = document.querySelector('body');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var launchx = (window.innerWidth/2);
  var launchy = (window.innerHeight);
  var launch = true;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  $(window).resize(function (){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

  });

  function projectile(xpos,ypos){
    var xv = (launchx/-xpos);
    var yv = (launchy/ypos);
    var loopcount = 0;
    launch = false;

    var loopTimer = setInterval(function(xpos ,ypos){

      console.log(loopcount);

      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      ctx.beginPath();
      ctx.arc(launchx, launchy, 10, 0, Math.PI*(2));
      ctx.fillStyle = 'black';
      ctx.closePath();
      ctx.fill();

      launchx += xv;
      launchy -= yv;
      loopcount += 1;

      if (loopcount > 500){
        clearInterval(loopTimer);
        launchx = (window.innerWidth/2);
        launchy = (window.innerHeight)
        launch = true;
        
      }

    }, 5);

  }

  $(canvas).on('click', function(e){
    var xpos = e.pageX;
    var ypos = e.pageY;

    if (launch = true){

      projectile(xpos,ypos);

    }

  })

})
