$(function(){

  var body = document.querySelector('body');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var launch = [];
  var boxes = [];
  var targs = [];
  var shots = 15;
  var score = 0;
  var imageSearch = ['greyscale geometry gif'];

  $.ajax({
    url: 'http://api.pixplorer.co.uk/image?word=' +  imageSearch[Math.floor(Math.random()*imageSearch.length)] + '&amount=1&size=l',
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      $('body').css('background-image', 'url("' + res.images[0].imageurl + '")');
      console.log(res.images[0].imageurl );
    }
  });

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  $('p').html('Shots: ' + shots +'  Score: ' + score + 'High Score:' + localStorage.getItem('score'));

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

      ctx.fillStyle = 'rgba(0,255,255,0.75)';
      ctx.fillRect(boxes[i][0], boxes[i][1], boxes[i][2], boxes[i][3]);

    }

  }

  function targets(){

    for (var i = 0; i < 20; i++) {
      var randomtx = Math.floor(Math.random()*window.innerWidth);
      var randomty = Math.floor(Math.random()*(window.innerHeight*0.75-100));

      targs.push([randomtx, randomty]);

      if (targs[i][0] != undefined) {

        ctx.beginPath();
        ctx.arc(targs[i][0], targs[i][1], 10, 0, Math.PI*(2));
        ctx.fillStyle = 'rgba(255,100,100,0.75)';
        ctx.closePath();
        ctx.fill();

      }
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
        console.log('1');
        if ( Math.floor(launchy) >= Math.floor(boxes[0][1]) && Math.floor(launchy) <= Math.floor(boxes[0][1] + boxes[0][3]) ) {
          xv = -xv;
        }
      }

      if ( Math.floor(launchx) == Math.floor(boxes[1][0]) || Math.floor(launchx) == Math.floor(boxes[1][0] + boxes[1][2]) ) {
        console.log('2');
        if ( Math.floor(launchy) >= Math.floor(boxes[1][1]) && Math.floor(launchy) <= Math.floor(boxes[1][1] + boxes[1][3]) ) {
          xv = -xv;
        }
      }

      if ( Math.floor(launchx) == Math.floor(boxes[2][0]) || Math.floor(launchx) == Math.floor(boxes[2][0] + boxes[2][2]) ) {
        console.log('3');
        if ( Math.floor(launchy) >= Math.floor(boxes[2][1]) && Math.floor(launchy) <= Math.floor(boxes[2][1] + boxes[2][3]) ) {
          xv = -xv;
        }
      }

      if ( Math.floor(launchx) == Math.floor(boxes[3][0]) || Math.floor(launchx) == Math.floor(boxes[3][0] + boxes[3][2]) ) {
        console.log('4');
        if ( Math.floor(launchy) >= Math.floor(boxes[3][1]) && Math.floor(launchy) <= Math.floor(boxes[3][1] + boxes[3][3]) ) {
          xv = -xv;
        }
      }

      if ( Math.floor(launchx) == Math.floor(boxes[4][0]) || Math.floor(launchx) == Math.floor(boxes[4][0] + boxes[4][2]) ) {
        console.log('5');
        if ( Math.floor(launchy) >= Math.floor(boxes[4][1]) && Math.floor(launchy) <= Math.floor(boxes[4][1] + boxes[4][3]) ) {
          xv = -xv;
        }
      }

      // target collisions

      // for (var i = 0; i < targs.length; i++) {
      //
      //   if ( launchx >= (targs[i][0]- 10) && launchx <= (targs[i][0] + 10) && launchy >= (targs[i][1]- 10) && launchy <= (targs[i][1] + 10) ) {
      //     targs.splice(i,1);
      //     score += 1;
      //     $('p').html('Shots: ' + shots +'  Score: ' + score);
      //
      //   }
      // }

      if ( (launchx) >= (targs[0][0]- 10) && (launchx) <= (targs[0][0] + 10) ) {
        if ( (launchy) >= (targs[0][1]- 10) && (launchy) <= (targs[0][1] + 10) ) {
          targs.splice(0,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[1][0]- 10) && (launchx) <= (targs[1][0] + 10) ) {
        if ( (launchy) >= (targs[1][1]- 10) && (launchy) <= (targs[1][1] + 10) ) {
          targs.splice(1,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[2][0]- 10) && (launchx) <= (targs[2][0] + 10) ) {
        if ( (launchy) >= (targs[2][1]- 10) && (launchy) <= (targs[2][1] + 10) ) {
          targs.splice(2,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[3][0]- 10) && (launchx) <= (targs[3][0] + 10) ) {
        if ( (launchy) >= (targs[3][1]- 10) && (launchy) <= (targs[3][1] + 10) ) {
          targs.splice(3,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[4][0]- 10) && (launchx) <= (targs[4][0] + 10) ) {
        if ( (launchy) >= (targs[4][1]- 10) && (launchy) <= (targs[4][1] + 10) ) {
          targs.splice(4,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[5][0]- 10) && (launchx) <= (targs[5][0] + 10) ) {
        if ( (launchy) >= (targs[5][1]- 10) && (launchy) <= (targs[5][1] + 10) ) {
          targs.splice(5,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[6][0]- 10) && (launchx) <= (targs[6][0] + 10) ) {
        if ( (launchy) >= (targs[6][1]- 10) && (launchy) <= (targs[6][1] + 10) ) {
          targs.splice(6,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[7][0]- 10) && (launchx) <= (targs[7][0] + 10) ) {
        if ( (launchy) >= (targs[7][1]- 10) && (launchy) <= (targs[7][1] + 10) ) {
          ctx.clearRect(targs[7][0]-10, targs[7][1]-10,20,20);
          targs.splice(7,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[8][0]- 10) && (launchx) <= (targs[8][0] + 10) ) {
        if ( (launchy) >= (targs[8][1]- 10) && (launchy) <= (targs[8][1] + 10) ) {
          targs.splice(8,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[9][0]- 10) && (launchx) <= (targs[9][0] + 10) ) {
        if ( (launchy) >= (targs[9][1]- 10) && (launchy) <= (targs[9][1] + 10) ) {
          targs.splice(9,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[10][0]- 10) && (launchx) <= (targs[10][0] + 10) ) {
        if ( (launchy) >= (targs[10][1]- 10) && (launchy) <= (targs[10][1] + 10) ) {
          targs.splice(10,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[11][0]- 10) && (launchx) <= (targs[11][0] + 10) ) {
        if ( (launchy) >= (targs[11][1]- 10) && (launchy) <= (targs[11][1] + 10) ) {
          targs.splice(11,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[12][0]- 10) && (launchx) <= (targs[12][0] + 10) ) {
        if ( (launchy) >= (targs[12][1]- 10) && (launchy) <= (targs[12][1] + 10) ) {
          targs.splice(12,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[13][0]- 10) && (launchx) <= (targs[13][0] + 10) ) {
        if ( (launchy) >= (targs[13][1]- 10) && (launchy) <= (targs[13][1] + 10) ) {
          targs.splice(13,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[14][0]- 10) && (launchx) <= (targs[14][0] + 10) ) {
        if ( (launchy) >= (targs[14][1]- 10) && (launchy) <= (targs[14][1] + 10) ) {
          targs.splice(14,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[15][0]- 10) && (launchx) <= (targs[15][0] + 10) ) {
        if ( (launchy) >= (targs[15][1]- 10) && (launchy) <= (targs[15][1] + 10) ) {
          targs.splice(15,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[16][0]- 10) && (launchx) <= (targs[16][0] + 10) ) {
        if ( (launchy) >= (targs[16][1]- 10) && (launchy) <= (targs[16][1] + 10) ) {
          targs.splice(16,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[17][0]- 10) && (launchx) <= (targs[17][0] + 10) ) {
        if ( (launchy) >= (targs[17][1]- 10) && (launchy) <= (targs[17][1] + 10) ) {
          targs.splice(17,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[18][0]- 10) && (launchx) <= (targs[18][0] + 10) ) {
        if ( (launchy) >= (targs[18][1]- 10) && (launchy) <= (targs[18][1] + 10) ) {
          targs.splice(18,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
        }
      }

      if ( (launchx) >= (targs[19][0]- 10) && (launchx) <= (targs[19][0] + 10) ) {
        if ( (launchy) >= (targs[19][1]- 10) && (launchy) <= (targs[19][1] + 10) ) {
          targs.splice(19,1);
          score += 1;
          $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));
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

      launchx += (xv/500);
      launchy += (yv/500);
      loopcount += 1;

      if (loopcount > 1000){
        clearInterval(loopTimer);
        launchx = (window.innerWidth/2);
        launchy = (window.innerHeight);
        launch.length = 0;
        localStorage.setItem('score', score);
        console.log(localStorage.getItem('score'));

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
      console.log(score);
      $('p').html('Shots: ' + shots +'  Score: ' + score + 'High score' + localStorage.getItem('score'));    }

    })

  })
