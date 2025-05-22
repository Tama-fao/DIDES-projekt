const scenes = {
    start: {
      image: "images/Big-Science.png",
      audio: "/visual%20novel/audio/big-science/golden-city.mp3",
      choices: [
        { text: "got them", nextScene: "mitten" },
       
      ]
    },

    mitten: {
      audio: "/visual%20novel/audio/big-science/here-is-a-man.mp3",
      image: "images/Big-Science.png",

      choices: [
        { text: "Don't be a stranger", nextScene: "stranger" },
        { text: "Got places to be, ask for Directions.", nextScene: "directions" }
      ]
    },

    stranger: {
      audio: "/visual%20novel/audio/big-science/howdy-every-man.mp3",
      image: "images/Big-Science2.png",

      choices: [
        { text: "aye!", nextScene: "aye" },
        { text: "nay!", nextScene: "nay" }
      ]
    },
    directions: {
      audio: "/visual%20novel/audio/big-science/hey-pal-directions.mp3",
      image: "images/Big-Science2.png",

      choices: [
        { text: "Thank you, bye", nextScene: "Thanks" },
        { text: "Can I hitch a ride?", nextScene: "Ride" }
      ]
    },

      aye: {
        image: "images/Big-Science-background.png",

        audio: "/visual%20novel/audio/big-science/crazy.mp3",
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

        audio: "/visual%20novel/audio/big-science/stairs.mp3",
        choices: [
          { text: "All about that!", nextScene: "aye" },
          { text: "What?", nextScene: "what" }
        ]
      },

      what: {
        image: "images/Big-Science2.png",

        audio: "/visual%20novel/audio/big-science/Ooo-coo-coo.mp3",
        choices: [
            { text: "...",  nextScene: "title" },
        ]
      },
   
      Thanks: {
        image: "images/Big-Science2.png",

        audio: "/visual%20novel/audio/big-science/that-must-be-the-place.mp3",
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

        audio: "/visual%20novel/audio/big-science/hey-professor.mp3",
        choices: [
            { text: "Thanks for the ride.", nextScene: "title"  },
        ]
      },

      silent: {
        image: "images/Big-Science2.png",

        audio: "/visual%20novel/audio/big-science/and-long-cars.mp3",
        choices: [
          { text: "...", nextScene: "nay" },
        ]
      },

      title: {
        image: "images/Big-Science-title.png",
        choices: [
          { text: "...",  nextScene: "link", isLink: true, href: "Phone_3.html"},
        ]
      },

  };
  
  const wiggleScenes = ["stranger", "aye", "nay", "stairs", "what", "Ride", "Sure", "directions"];

  let currentScene = "start";
  let currentAudio = null;



  function createSnow() {
    const snowContainer = document.querySelector('.snow-container');
    snowContainer.innerHTML = ''; // Clear existing snow
    
    // Create 100 snowflakes
    for (let i = 0; i < 100; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snow');
      
      // Random properties for each snowflake
      const size = Math.random() * 5 + 2;
      const duration = Math.random() * 10 + 5;
      const delay = Math.random() * 5;
      const randomX = Math.random() * 2 - 1; // Between -1 and 1
      
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.opacity = Math.random() * 0.5 + 0.5;
      snowflake.style.animationDuration = `${duration}s`;
      snowflake.style.animationDelay = `${delay}s`;
      snowflake.style.setProperty('--random-x', randomX);
      
      snowContainer.appendChild(snowflake);
    }
  }

  
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


    // Show/hide the person based on scene
    if (sceneKey === "start" || sceneKey === "mitten" || sceneKey === "title" || sceneKey === "what"){
      personDiv.style.display = 'none';
    } else {
      personDiv.style.display = 'grid';
    }
  
    if (sceneKey === "mitten") {
      personFullDiv.style.display = 'grid';
      personDiv.style.display = 'none'; // Ensure the split person is hidden
    } else {
      personFullDiv.style.display = 'none';
    }

     // Show shapes only in "aye" scene
     if (sceneKey === "aye") {
      shapesDiv.style.display = 'grid';
    } else {
      shapesDiv.style.display = 'none';
    }






  // Snow effect control
  const snowContainer = document.querySelector('.snow-container');
  if (sceneKey === "start" || sceneKey === "mitten") {
    snowContainer.style.display = 'block';
    createSnow();
  } else {
    snowContainer.style.display = 'none';
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




    const owlDiv = document.querySelector('.owl');

    if (sceneKey === "what") {
      owlDiv.style.display = 'grid';
    } else {
      owlDiv.style.display = 'none';
    }
    
    // Reset classes
owlDiv.classList.remove('owl-show-normal', 'owl-show-eyes', 'owl-show-final');

// Trigger animations
setTimeout(() => owlDiv.classList.add('owl-show-normal'), 0);
setTimeout(() => owlDiv.classList.add('owl-show-eyes'), 2000);
setTimeout(() => owlDiv.classList.add('owl-show-final'), 4000);







   




  
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
      currentAudio.play().catch(e => console.log("Audio play failed:", e));
      
      currentAudio.addEventListener('ended', () => {
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
    } else {
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