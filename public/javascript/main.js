$(function(){

  var body = document.querySelector('body');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var launchx = (window.innerWidth/2);
  var launchy = (window.innerHeight);
  var launch = [];

  var ball = {
    

  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  $(window).resize(function (){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

  });

  function obstacles(){

    for (var i = 0; i < 5; i++) {
      var randomx = Math.random()*window.innerWidth;
      var randomy = Math.random()*(window.innerHeight*0.75-100);
      var randomw = Math.random()*(window.innerWidth*0.2+50);
      var randomh = Math.random()*(window.innerHeight*0.2+50);

      ctx.fillStyle = 'rgba(0,255,255,0.5)';
      ctx.fillRect(randomx,randomy,randomw, randomh);

    }

  }

  obstacles();

  function projectile(xpos,ypos){
    var xv = (xpos-launchx);
    var yv = (ypos-launchy);
    var loopcount = 0;
    launch.push(1);

    var loopTimer = setInterval(function(xpos ,ypos){

      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      ctx.beginPath();
      ctx.arc(launchx, launchy, 10, 0, Math.PI*(2));
      ctx.fillStyle = 'white';
      ctx.closePath();
      ctx.fill();

      launchx += (xv/100);
      launchy += (yv/100);
      loopcount += 1;

      if (loopcount > 500){
        clearInterval(loopTimer);
        launchx = (window.innerWidth/2);
        launchy = (window.innerHeight);
        launch.length = 0;

      }

    }, 5);

  }

  $(canvas).on('click', function(e){
    var xpos = e.pageX;
    var ypos = e.pageY;

    console.log(launch.length);

    if (launch.length == 0){
      launchx = (window.innerWidth/2);
      launchy = (window.innerHeight)
      projectile(xpos,ypos);
    }

  })

})
