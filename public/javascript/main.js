$(function(){

  var body = document.querySelector('body');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var launch = [];
  var boxes = [];
  var targs = [];
  var tries = 15;



  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  $('p').html('Tries: ' + tries);

  $(window).resize(function (){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

  });

  function obstacles(){

    for (var i = 0; i < 5; i++) {
      var randomx = Math.floor(Math.random()*window.innerWidth);
      var randomy = Math.floor(Math.random()*(window.innerHeight*0.75-100));
      var randomw = Math.floor(Math.random()*(window.innerWidth*0.2+50));
      var randomh = Math.floor(Math.random()*(window.innerHeight*0.2+50));

      boxes.push([randomx, randomy, randomw, randomh]);

      ctx.fillStyle = 'rgba(0,255,255,0.5)';
      ctx.fillRect(boxes[i][0], boxes[i][1], boxes[i][2], boxes[i][3]);

    }

  }

  function targets(){

    for (var i = 0; i < 30; i++) {
      var randomtx = Math.floor(Math.random()*window.innerWidth);
      var randomty = Math.floor(Math.random()*(window.innerHeight*0.75-100));

      targs.push([randomtx, randomty]);

      ctx.beginPath();
      ctx.arc(targs[i][0], targs[i][1], 10, 0, Math.PI*(2));
      ctx.fillStyle = 'rgba(255,100,100,0.5)';
      ctx.closePath();
      ctx.fill();

    }

  }

  obstacles();
  targets();

  function projectile(xpos,ypos){
    var xv = (xpos-launchx);
    var yv = (ypos-launchy);
    var loopcount = 0;
    var speedcount = (1);
    launch.push(1);

    var loopTimer = setInterval(function(xpos, ypos){

      if( launchx <= 0 || launchx >= canvas.width) {
        xv = -xv;
      }

      if( launchy <= 0 || launchy >= canvas.height) {
        yv = -yv;
      }

      // vertical collisions

      if ( Math.floor(launchy) == Math.floor(boxes[0][1]) || Math.floor(launchy) == Math.floor(boxes[0][1] + boxes[0][3]) ) {
        if ( Math.floor(launchx) >= Math.floor(boxes[0][0]) && Math.floor(launchx) <= Math.floor(boxes[0][0] + boxes[0][2]) ) {
          yv = -yv;
        }
      }

      if ( Math.floor(launchy) == Math.floor(boxes[1][1]) || Math.floor(launchy) == Math.floor(boxes[1][1] + boxes[1][3]) ) {
        if ( Math.floor(launchx) >= Math.floor(boxes[1][0]) && Math.floor(launchx) <= Math.floor(boxes[1][0] + boxes[1][2]) ) {
          yv = -yv;
        }
      }

      if ( Math.floor(launchy) == Math.floor(boxes[2][1]) || Math.floor(launchy) == Math.floor(boxes[2][1] + boxes[2][3]) ) {
        if ( Math.floor(launchx) >= Math.floor(boxes[2][0]) && Math.floor(launchx) <= Math.floor(boxes[2][0] + boxes[2][2]) ) {
          yv = -yv;
        }
      }

      if ( Math.floor(launchy) == Math.floor(boxes[3][1]) || Math.floor(launchy) == Math.floor(boxes[3][1] + boxes[3][3]) ) {
        if ( Math.floor(launchx) >= Math.floor(boxes[3][0]) && Math.floor(launchx) <= Math.floor(boxes[3][0] + boxes[3][2]) ) {
          yv = -yv;
        }
      }

      if ( Math.floor(launchy) == Math.floor(boxes[4][1]) || Math.floor(launchy) == Math.floor(boxes[4][1] + boxes[4][3]) ) {
        if ( Math.floor(launchx) >= Math.floor(boxes[4][0]) && Math.floor(launchx) <= Math.floor(boxes[4][0] + boxes[4][2]) ) {
          yv = -yv;
        }
      }

      // horizontal collisions

      if ( Math.floor(launchx) == Math.floor(boxes[0][0]) || Math.floor(launchx) == Math.floor(boxes[0][0] + boxes[0][2]) ) {
        console.log('y');
        if ( Math.floor(launchy) >= Math.floor(boxes[0][1]) && Math.floor(launchy) <= Math.floor(boxes[0][1] + boxes[0][3]) ) {
          xv = -xv;
        }
      }

      if ( Math.floor(launchx) == Math.floor(boxes[1][0]) || Math.floor(launchx) == Math.floor(boxes[1][0] + boxes[1][2]) ) {
        if ( Math.floor(launchy) >= Math.floor(boxes[1][1]) && Math.floor(launchy) <= Math.floor(boxes[1][1] + boxes[1][3]) ) {
          xv = -xv;
        }
      }

      if ( Math.floor(launchx) == Math.floor(boxes[2][0]) || Math.floor(launchx) == Math.floor(boxes[2][0] + boxes[2][2]) ) {
        if ( Math.floor(launchy) >= Math.floor(boxes[2][1]) && Math.floor(launchy) <= Math.floor(boxes[2][1] + boxes[2][3]) ) {
          xv = -xv;
        }
      }

      if ( Math.floor(launchx) == Math.floor(boxes[3][0]) || Math.floor(launchx) == Math.floor(boxes[3][0] + boxes[3][2]) ) {
        if ( Math.floor(launchy) >= Math.floor(boxes[3][1]) && Math.floor(launchy) <= Math.floor(boxes[3][1] + boxes[3][3]) ) {
          xv = -xv;
        }
      }

      if ( Math.floor(launchx) == Math.floor(boxes[4][0]) || Math.floor(launchx) == Math.floor(boxes[4][1] + boxes[4][2]) ) {
        if ( Math.floor(launchy) >= Math.floor(boxes[4][1]) && Math.floor(launchy) <= Math.floor(boxes[4][1] + boxes[4][3]) ) {
          xv = -xv;
        }
      }


      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      obstacles();
      targets();
      ctx.beginPath();
      ctx.arc(launchx, launchy, 5, 0, Math.PI*(2));
      ctx.fillStyle = 'white';
      ctx.closePath();
      ctx.fill();

      launchx += (xv/400);
      launchy += (yv/400);
      loopcount += 1;

      if (loopcount > 1000){
        clearInterval(loopTimer);
        launchx = (window.innerWidth/2);
        launchy = (window.innerHeight);
        launch.length = 0;

      }

    }, 1/800);

  }

  $(canvas).on('click', function(e){
    var xpos = e.pageX;
    var ypos = e.pageY;

    if (launch.length == 0 && tries != 0){
      launchx = (window.innerWidth/2);
      launchy = (window.innerHeight-1)
      projectile(xpos, ypos);
      tries -= 1;
      $('p').html('Tries: ' + tries);



    }

  })

})
