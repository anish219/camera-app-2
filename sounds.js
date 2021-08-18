var sounds = {
  "move left" : {
    url : "sounds/Move left.m4a"
  },
  "move right" : {
    url : "sounds/Move right.m4a"
  },
  "move up" : {
    url : "sounds/Move up.m4a"
  },
  "move down" : {
    url : "sounds/Move down.m4a"
  },
  "move away" : {
    url : "sounds/Move away.m4a"
  },
  "move closer" : {
    url : "sounds/Move closer.m4a"
  },
  "turn left" : {
    url : "sounds/Turn left.m4a"
  },
  "turn right" : {
    url : "sounds/Turn right.m4a"
  },
  "raise chin" : {
    url : "sounds/Raise chin.m4a"
  },
  "lower chin" : {
    url : "sounds/Lower chin.m4a"
  },
  "ready" : {
    url : "sounds/Ready.m4a"
  },


};

var AudioContext = window.AudioContext // Default
    || window.webkitAudioContext; // Safari and old versions of Chrome


var soundContext = new AudioContext();

function load_sound(name){
    var sound = sounds[name];
    
    var url = sound.url;
    var buffer = sound.buffer;

    var request = new XMLHttpRequest();
    
    request.onerror = function () {
	console.log("** An error occurred loading the sound");
    };
    request.onload = function() {
	soundContext.decodeAudioData(request.response, function(newBuffer) {
	    sound.buffer = newBuffer;
	});

    }

    request.open('GET', url, true);
    request.responseType = 'arraybuffer';


  request.send();
}

for(var key in sounds) {
  load_sound(key);
}

function play_sound(name, options){
  var sound = sounds[name];
  var soundVolume = sounds[name].volume || 1;

  var buffer = sound.buffer;
  if(buffer){
    var source = soundContext.createBufferSource();
    source.buffer = buffer;

    var volume = soundContext.createGain();

    if(options) {
      if(options.volume) {
        volume.gain.value = soundVolume * options.volume;
      }
    } else {
      volume.gain.value = soundVolume;
    }

    volume.connect(soundContext.destination);
    source.connect(volume);
    source.start(0);
  }
}
