var playerConfigs = [
  {elementId: 'player1', videoId: 'SrR8FEk1GHc', startTime: 12, endTime:21},
  {elementId: 'player2', videoId: 'c_wVwXROKLY', startTime: 10, endTime:12}
];
function onYouTubeIframeAPIReady() {
  playerConfigs.forEach(function(config) {
    createPlayer(config.elementId, config.videoId, config.startTime, config.endTime);
  });
}

function createPlayer(elementId, videoId, startTime, endTime) {
  var player = new YT.Player(elementId, {
    videoId: videoId,
    playerVars: {
      'autoplay': 1,
      'start': startTime,
      'end': endTime
    },
    events: {
      'onReady': function(event) {
        onPlayerReady(event, startTime, endTime);
      },
      'onStateChange': function(event) {
        onPlayerStateChange(player,event, startTime, endTime);
      }
    }
  });
}


function onPlayerReady(event, startTime, endTime) {
  event.target.playVideo(); // Optionally start playing video
}

function onPlayerStateChange(player, event, startTime, endTime) {
  console.log("State Change: ", event.data)
  if (event.data === YT.PlayerState.PLAYING) {
      checkTime(event.target, endTime);
  } else if (event.data === YT.PlayerState.ENDED) {
         player.seekTo(startTime);
        player.playVideo();
    
  }
}
function checkTime(player, endTime) {
  if (player.getCurrentTime() >= endTime) {
      player.pauseVideo();
  } else {
      setTimeout(function() { checkTime(player, endTime); }, 1000);
  }
}

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player1', {

//     videoId: 'SrR8FEk1GHc',
//     playerVars: {
//       'autoplay': 1        // Autoplay the video
//     //   'start': 12,          // Start at 60 seconds
//     //   'end': 21            // End at 120 seconds
//     },
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });

  
// }

// function onPlayerReady(event) {
//    player.seekTo(startTime);
//     player.playVideo();
// }

// function onPlayerStateChange(event) {
 
//     console.log("Player State Changed:", event.data);
//     console.log("YT.PlayerState.ENDED", YT.PlayerState.ENDED);
//     // The video is now playing
//     if (event.data === YT.PlayerState.PLAYING) {
//         checkTime();
     
//     } else if (event.data === YT.PlayerState.PAUSED) {
//         player.seekTo(startTime);
//         player.playVideo();
//     }
  
// }

// function checkTime() {
//     if (player.getCurrentTime() >= endTime) {
    
//         player.pauseVideo();  // Stop the video at the end time

//     } else {
//         // Continue checking if the video hasn't reached the end time
//         setTimeout(checkTime, 1000);
//     }
// }
