$(function(){

  var body = document.querySelector('body');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var launch = [];
  var boxes = [];
  var targs = [];
  var shots = 5;
  var score = 0;
  var finalScore = 0;
  var imageSearch = ['greyscale geometric'];

  $.ajax({
    url: 'http://api.pixplorer.co.uk/image?word=' +  imageSearch[Math.floor(Math.random()*imageSearch.length)] + '&amount=1&size=l',
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      $('body').css('background-image', 'url("' + res.images[0].imageurl + '")');
    }
  });

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  $(window).resize(function (){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  });

  $('p').html('Shots: ' + shots +' / Score: ' + score + ' / High Score: ' + localStorage.getItem('finalScore'));

  function obstacles(){

    for (var i = 0; i < 5; i++) {
      var randomx = Math.floor(Math.random()*window.innerWidth);
      var randomy = Math.floor(Math.random()*(window.innerHeight*0.75-100));
      var randomw = Math.floor(Math.random()*(window.innerWidth*0.2+50));
      var randomh = Math.floor(Math.random()*(window.innerHeight*0.2+50));

      boxes.push([randomx, randomy, randomw, randomh]);
      ctx.fillStyle = 'rgba(0,255,255,0.75)';
      ctx.fillRect(boxes[i][0], boxes[i][1], boxes[i][2], boxes[i][3]);
    }
  }

  function targetsGenerate(){
    for (var i = 0; i < 20; i++) {
      var randomtx = Math.floor(Math.random()*window.innerWidth);
      var randomty = Math.floor(Math.random()*(window.innerHeight*0.75-100));
      targs.push([randomtx, randomty]);
    }
  }

  function targetDraw () {
    for (var i = 0; i < targs.length; i++) {
      ctx.beginPath();
      ctx.arc( targs[i][0], targs[i][1], 10, 0, Math.PI*(2) );
      ctx.fillStyle = 'rgba(255,100,100,0.75)';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }

  targetsGenerate();
  targetDraw();
  obstacles();

  function projectile(xpos,ypos){
    var xv = (xpos-launchx);
    var yv = (ypos-launchy);
    var loopcount = 0;
    var speedcount = (1);
    var sconstant = ( Math.sqrt((xv*xv)+(yv*yv)) / Math.sqrt((launchy*launchy)+(launchx*launchx)) )

    launch.push(1);

    var loopTimer = setInterval(function(xpos, ypos) {

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

      if ( Math.floor(launchx) == Math.floor(boxes[4][0]) || Math.floor(launchx) == Math.floor(boxes[4][0] + boxes[4][2]) ) {
        if ( Math.floor(launchy) >= Math.floor(boxes[4][1]) && Math.floor(launchy) <= Math.floor(boxes[4][1] + boxes[4][3]) ) {
          xv = -xv;
        }
      }

      // target collisions

      for (var i = 0; i < targs.length; i++) {

        var collision = (launchx >= (targs[i][0]- 10) && launchx <= (targs[i][0] + 10)) &&
        (launchy >= (targs[i][1]- 10) && launchy <= (targs[i][1] + 10))

        if (collision) {
          targs.splice(i,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  / Score: ' + score + ' / High Score: ' + localStorage.getItem('finalScore'));
        }
      }

      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      obstacles();
      targetDraw();
      ctx.beginPath();
      ctx.arc(launchx, launchy, 5, 0, Math.PI*(2));
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      launchx += (xv/500);
      launchy += (yv/500);
      loopcount += 1;

      if (loopcount > 2000){
        clearInterval(loopTimer);
        launchx = (window.innerWidth/2);
        launchy = (window.innerHeight);
        launch.length = 0;
        scoreLog();
        $('p').html('Shots: ' + shots +'  / Score: ' + score + ' / High Score: ' + localStorage.getItem('finalScore'));
      }
    }, 1/1000);
  }

  $(canvas).on('click', function(e){
    var xpos = e.pageX;
    var ypos = e.pageY;

    if (launch.length == 0 && shots != 0){
      launchx = (window.innerWidth/2);
      launchy = (window.innerHeight-1)
      projectile(xpos, ypos);
      shots -= 1;

      $('p').html('Shots: ' + shots +'  / Score: ' + score + ' / High Score: ' + localStorage.getItem('finalScore'));
    }
  })

  function scoreLog() {

    if (shots == 0) {

      if (score > finalScore) {
        finalScore = score;
        localStorage.setItem('finalScore', finalScore);
      }

      $('p').html('Shots: ' + shots +'  / Score: ' + score + ' / High Score: ' + localStorage.getItem('finalScore'));

      // function playAgain(){
      //   console.log('ask');
      //   return window.prompt('Play Again?');
      // };
      //
      // if (playAgain().toUpperCase() == 'YES') {
      //   ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      //   shots = 5;
      //   score = 0;
      //   launch.length = 0;
      //   boxes.length = 0;
      //   targs.length = 0;
      //   targetsGenerate()
      //   targetDraw();
      //   obstacles();
      //
      //
      // }

    }
  }
})
