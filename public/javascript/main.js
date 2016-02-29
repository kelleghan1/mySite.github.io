$(function(){

  var body = document.querySelector('body');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var launchx = (window.innerWidth/2);
  var launchy = (window.innerHeight);
  var launch = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  $(window).resize(function (){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

  });



  function obstacles(){

    

  }

  function projectile(xpos,ypos){
    var xv = (xpos-launchx);
    var yv = (ypos-launchy);
    var loopcount = 0;
    launch.push(1);

    var loopTimer = setInterval(function(xpos ,ypos){

      console.log(loopcount);

      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      ctx.beginPath();
      ctx.arc(launchx, launchy, 10, 0, Math.PI*(2));
      ctx.fillStyle = 'white';
      ctx.closePath();
      ctx.fill();
      //
      launchx += (xv/100);
      launchy += (yv/100);
      loopcount += 1;

      if (loopcount > 500){
        clearInterval(loopTimer);
        launchx = (window.innerWidth/2);
        launchy = (window.innerHeight)

      }

    }, 5);

  }

  $(canvas).on('click', function(e){
    var xpos = e.pageX;
    var ypos = e.pageY;
    launchx = (window.innerWidth/2);
    launchy = (window.innerHeight)
    console.log(launch.length);

    projectile(xpos,ypos);

  })

})
