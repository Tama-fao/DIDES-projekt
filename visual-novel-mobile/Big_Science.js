const scenes = {
    start: {
      image: "images/Big-Science.png",
      audio: "audio/big-science/golden-city.mp3",
      choices: [
        { text: "got them", nextScene: "mitten" },
       
      ]
    },

    mitten: {
      audio: "audio/big-science/here-is-a-man.mp3",
      image: "images/Big-Science.png",

      choices: [
        { text: "Don't be a stranger", nextScene: "stranger" },
        { text: "Got places to be, ask for Directions.", nextScene: "directions" }
      ]
    },

    stranger: {
      audio: "audio/big-science/howdy-every-man.mp3",
      image: "images/Big-Science2.png",

      choices: [
        { text: "aye!", nextScene: "aye" },
        { text: "nay!", nextScene: "nay" }
      ]
    },
    directions: {
      audio: "audio/big-science/hey-pal-directions.mp3",
      image: "images/Big-Science2.png",

      choices: [
        { text: "Thank you, bye", nextScene: "Thanks" },
        { text: "Can I hitch a ride?", nextScene: "Ride" }
      ]
    },

      aye: {
        image: "images/Big-Science-background.png",

        audio: "audio/big-science/crazy.mp3",
        choices: [
            { text: "...",  nextScene: "title" },
        ]
      },

      nay: {
        image: "images/Big-Science2.png",

        audio: "/visual%20novel/audio/big-science/mountains.mp3",
        choices: [
          { text: "Totally!", nextScene: "stairs" },
          { text: "What?", nextScene: "stairs" }
        ]
      },

      stairs: {
        image: "images/Big-Science2.png",

        audio: "audio/big-science/stairs.mp3",
        choices: [
          { text: "All about that!", nextScene: "aye" },
          { text: "What?", nextScene: "what" }
        ]
      },

      what: {
        image: "images/Big-Science2.png",

        audio: "audio/big-science/Ooo-coo-coo.mp3",
        choices: [
            { text: "...",  nextScene: "title" },
        ]
      },
   
      Thanks: {
        image: "images/Big-Science2.png",

        audio: "audio/big-science/that-must-be-the-place.mp3",
        choices: [
            { text: "...",  nextScene: "title" },
        ]
      },

      Ride: {
        image: "images/Big-Science2.png",

        audio: "/visual%20novel/audio/big-science/smoke.mp3",

        choices: [
          { text: "No, be silent", nextScene: "silent" },
          { text: "Sure, go ahead.", nextScene: "Sure" }
        ]
      },

      Sure: {
        image: "images/Big-Science2.png",

        audio: "audio/big-science/hey-professor.mp3",
        choices: [
            { text: "Thanks for the ride.", nextScene: "title"  },
        ]
      },

      silent: {
        image: "images/Big-Science2.png",

        audio: "audio/big-science/and-long-cars.mp3",
        choices: [
          { text: "...", nextScene: "nay" },
        ]
      },

      title: {
        image: "images/Big-Science-title.png",
        choices: [
          { text: "...",  nextScene: "link", isLink: true, href: "Phone_5.html"},
        ]
      },

  };
  
  const wiggleScenes = ["stranger", "aye", "nay", "stairs", "what", "Ride", "Sure", "directions"];

  let currentScene = "start";
  let currentAudio = null;
  let backgroundMusic = new Audio("audio/Big-Science-background-music.mp3");
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.3; // Lower volume (30% of normal volume)
  





 

  
  function showScene(sceneKey) {
    const scene = scenes[sceneKey];
    const dialogue = document.getElementById("dialogue");
    const sceneImage = document.getElementById("scene-image");
    const choicesContainer = document.getElementById("choices");
    const personDiv = document.querySelector('.person');
    const manHead = document.getElementById('scene-image-man2');
    const manBody = document.getElementById('scene-image-man1');
    const gameContainer = document.getElementById('game-container');
    const personFullDiv = document.querySelector('.person-full');
    const shapesDiv = document.querySelector('.shapes');




    // Start background music if it's not already playing
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(e => console.log("Background music play failed:", e));
    }
    
    // Pause current scene audio if it exists
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }





// In the showScene function, replace the title scene section with:
if (sceneKey === "title") {
  // Show and animate the big text
  const bigText = document.getElementById('big-text');
  bigText.style.display = 'block';
  bigText.style.animation = 'none';
  void bigText.offsetWidth; // Trigger reflow
  bigText.style.animation = 'floatUp 2s ease-out forwards';
  
  // Remove the game-container's title class if it exists
  gameContainer.classList.remove('scene-title', 'show-choices');
  
  // Add title class
  gameContainer.classList.add('scene-title');
  
  // After animation completes, wait 3 seconds then show choices
  bigText.addEventListener('animationend', () => {
    setTimeout(() => {
      gameContainer.classList.add('show-choices');
    }, 3000); // 3 second delay
  }, { once: true });
} else {
  // Hide big text in all other scenes
  document.getElementById('big-text').style.display = 'none';
}








    // In the showScene function, add this code at the beginning:
const taube = document.querySelector('.taube');
const snowContainer = document.querySelector('.snow-container');
const snowImg = snowContainer.querySelector('img');

// Reset animations
taube.style.display = 'none';
snowContainer.style.display = 'none';
taube.style.animation = 'none';
snowImg.style.animation = 'none';

// In the showScene function:
if (sceneKey === "start") {
  // Show and animate taube first - faster duration (4s instead of 7s)
  taube.style.display = 'block';
  taube.style.animation = 'flyAcross 5s steps(1) forwards 0.5s'; // Faster and starts sooner
  
  // After taube finishes, show snow
  taube.addEventListener('animationend', () => {
    snowContainer.style.display = 'block';
    snowImg.style.animation = 'flySnowAcross 5s steps(1) forwards 0.5s'; // Faster and starts sooner
  }, {once: true});
}





    // Show/hide the person based on scene
    if (sceneKey === "start" || sceneKey === "mitten" || sceneKey === "title" || sceneKey === "what"){
      personDiv.style.display = 'none';
    } else {
      personDiv.style.display = 'grid';
    }
  
    /*
    if (sceneKey === "mitten") {
      personFullDiv.style.display = 'grid';
      personDiv.style.display = 'none'; // Ensure the split person is hidden
    } else {
      personFullDiv.style.display = 'none';
    }

    */



// Taube3 animation for stranger scene
const taube3 = document.getElementById('taube3');
taube3.style.display = 'none';
taube3.style.animation = 'none';

if (sceneKey === "stranger") {
  taube3.style.display = 'block';
  // Reset animation and trigger it after a short delay
  setTimeout(() => {
    taube3.style.animation = 'none';
    void taube3.offsetWidth; // Trigger reflow
    taube3.style.animation = 'taube3-animation 8s ease-in-out forwards 3s';
  }, 1000);
} else {
  taube3.style.display = 'none';
}




    // In the showScene function, find the mitten scene section and modify it:
if (sceneKey === "mitten") {
  personFullDiv.style.display = 'grid';
  personDiv.style.display = 'none';
  
  // Reset animation and trigger it
  const man3 = document.getElementById('scene-image-man3');
  man3.style.animation = 'none';
  // Trigger reflow
  void man3.offsetWidth;
  man3.style.animation = 'slideInFromRight 2s ease-out forwards ' ;
} else {
  personFullDiv.style.display = 'none';
}




     // Show shapes only in "aye" scene
     if (sceneKey === "aye") {
      shapesDiv.style.display = 'grid';
    } else {
      shapesDiv.style.display = 'none';
    }



    const shape1 = document.getElementById('shape1');
    const shape2 = document.getElementById('shape2');
    const shape3 = document.getElementById('shape3');

    // ... other scene setup code ...

    // Handle shapes floating animation
    if (sceneKey === "aye") {
      shapesDiv.style.display = 'grid';
      shape1.classList.add('floating-shape1');
      shape2.classList.add('floating-shape2');
      shape3.classList.add('floating-shape3');
    } else {
      shapesDiv.style.display = 'none';
      shape1.classList.remove('floating-shape1');
      shape2.classList.remove('floating-shape2');
      shape3.classList.remove('floating-shape3');
    }




    // In the showScene function, replace the entire "what" scene section with:

if (sceneKey === "what") {
  const owlDiv = document.querySelector('.owl');
  owlDiv.style.display = 'grid';
  
  // Reset all owl images
  const normalMan = document.getElementById('scene-normal-man');
  const eyeMan = document.getElementById('scene-eye-man');
  const owlMan = document.getElementById('scene-owl-man');
  
  normalMan.style.opacity = '0';
  eyeMan.style.opacity = '0';
  owlMan.style.opacity = '0';
  
  // Sequence the transitions
  // Show normal man immediately
  normalMan.style.opacity = '1';
  
  // After 2 seconds, fade to eyes
  setTimeout(() => {
    normalMan.style.opacity = '0';
    eyeMan.style.opacity = '1';
    
    // After another 2 seconds, fade to owl
    setTimeout(() => {
      eyeMan.style.opacity = '0';
      owlMan.style.opacity = '1';
    }, 2000);
  }, 2000);
} else {
  document.querySelector('.owl').style.display = 'none';
}







   




  
    gameContainer.classList.remove('scene-mitten', 'scene-stranger');
    if (sceneKey === "mitten") {
      gameContainer.classList.add('scene-mitten');
    } else if (sceneKey === "stranger") {
      gameContainer.classList.add('scene-stranger');
    }
  
    // Control wiggle animation
    if (wiggleScenes.includes(sceneKey)) {
      manHead.classList.add('wiggling');
    } else {
      manHead.classList.remove('wiggling');
    }
  
   // In the showScene function, modify the growth control section:
if (sceneKey === "aye") {
  manHead.classList.add('growing-head');
  manBody.classList.add('growing-body');
} else {
  manHead.classList.remove('growing-head');
  manBody.classList.remove('growing-body');
  // Reset transforms when not growing
  manHead.style.transform = 'translate(0px, 34px)';
  manBody.style.transform = 'translate(0px, 0px)';
}
  
    // Clear previous content
    dialogue.textContent = scene.text || "";
    choicesContainer.innerHTML = "";
    sceneImage.style.backgroundImage = `url('${scene.image}')`;
    
    // Hide choices initially
    choicesContainer.style.display = 'none';
  
    // Audio handling
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    
    if (scene.audio) {
      currentAudio = new Audio(scene.audio);
      currentAudio.loop = scene.loopAudio || false;
      
      // Lower background music volume when scene audio plays
      backgroundMusic.volume = 0.1;
      
      currentAudio.play().catch(e => console.log("Audio play failed:", e));
      
      currentAudio.addEventListener('ended', () => {
          // Restore background music volume
          backgroundMusic.volume = 0.3;
          manHead.classList.remove('wiggling');
          
          if (scene.choices && scene.choices.length > 0) {
              choicesContainer.style.display = 'block';
              
              scene.choices.forEach(choice => {
                  const button = document.createElement("button");
                  button.textContent = choice.text;
                  button.onclick = choice.isLink 
                      ? () => (window.location.href = choice.href)
                      : () => showScene(choice.nextScene);
                  choicesContainer.appendChild(button);
              });
          }
      });
  }
    
    
    else {
      if (scene.choices && scene.choices.length > 0) {
        choicesContainer.style.display = 'block';
        
        scene.choices.forEach(choice => {
          const button = document.createElement("button");
          button.textContent = choice.text;
          button.onclick = choice.isLink 
            ? () => (window.location.href = choice.href)
            : () => showScene(choice.nextScene);
          choicesContainer.appendChild(button);
        });
      }
    }
  
    sceneImage.style.cursor = sceneKey === "start" ? "pointer" : "default";
    sceneImage.onclick = sceneKey === "start" ? () => showScene(scene.nextScene) : null;
  
   

  
  
  
  
  
  
  }




  
  document.addEventListener("DOMContentLoaded", () => {
    showScene(currentScene);
  });

  document.addEventListener("DOMContentLoaded", () => {
    // Start background music
    backgroundMusic.play().catch(e => console.log("Background music play failed:", e));
    showScene(currentScene);
});

 
