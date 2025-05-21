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
        { text: "aye", nextScene: "aye" },
        { text: "nay", nextScene: "nay" }
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
        image: "images/Big-Science2.png",

        audio: "/visual%20novel/audio/big-science/crazy.mp3",
        choices: [
            { text: "...", nextScene: "link", isLink: true, href: "Phone_3.html" },
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
            { text: "...", nextScene: "link", isLink: true, href: "_3.html" },
        ]
      },
   
      Thanks: {
        image: "images/Big-Science2.png",

        audio: "/visual%20novel/audio/big-science/that-must-be-the-place.mp3",
        choices: [
            { text: "...", nextScene: "link", isLink: true, href: "Phone_3.html" },
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

function showScene(sceneKey) {
  const scene = scenes[sceneKey];
  const dialogue = document.getElementById("dialogue");
  const sceneImage = document.getElementById("scene-image");
  const choicesContainer = document.getElementById("choices");
  const personDiv = document.querySelector('.person');
  const manHead = document.getElementById('scene-image-man2');

  // Show/hide the person based on scene
  if (sceneKey === "start" || sceneKey === "mitten" || sceneKey === "title"){
    personDiv.style.display = 'none';
  } else {
    personDiv.style.display = 'grid';
  }

  // Control wiggle animation
  if (wiggleScenes.includes(sceneKey)) {
    manHead.classList.add('wiggling');
  } else {
    manHead.classList.remove('wiggling');
  }

  // Audio handling (keep your existing code)
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  
  if (scene.audio) {
    currentAudio = new Audio(scene.audio);
    currentAudio.loop = scene.loopAudio || false;
    currentAudio.play().catch(e => console.log("Audio play failed:", e));
    
    // Stop wiggle when audio ends
    currentAudio.addEventListener('ended', () => {
      manHead.classList.remove('wiggling');
    });
  }

  // Rest of your existing showScene function...
  dialogue.textContent = scene.text;
  dialogue.style.transform = "translateY(0)";
  sceneImage.style.backgroundImage = `url('${scene.image}')`;
  
  sceneImage.style.cursor = sceneKey === "start" ? "pointer" : "default";
  sceneImage.onclick = sceneKey === "start" ? () => showScene(scene.nextScene) : null;
  
  choicesContainer.innerHTML = "";
  if (scene.choices) {
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

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  showScene(currentScene);
});
  