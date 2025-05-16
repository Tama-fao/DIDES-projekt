const scenes = {
    start: {
      image: "images/From-The-Air.png",
      audio: "/visual%20novel/audio/oh-superman/good-evening.mp3",
      choices: [
        { text: "Oh no!", nextScene: "No" },
        { text: "Whatever.", nextScene: "Whatever" }
      ]
    },
    No: {
      image: "images/From-The-Air2.png",
      audio: "/visual%20novel/audio/uh-cptain-attempt-knees.mp3",
      choices: [
        { text: "Ignore", nextScene: "Ignore" },
        { text: "follow instructions", nextScene: "follow" }
      ]
    },
    follow: {
      image: "images/From-The-Air2.png",
      audio: "/visual%20novel/audio/captain-head-hands.mp3",

      choices: [
        { text: "Ignore", nextScene: "Ignore" },
        { text: "follow instructions", nextScene: "follow2" }
      ]
    },

    follow2: {
      image: "images/From-The-Air2.png",
      audio: "/visual%20novel/audio/captain-hand-head.mp3",
      choices: [
          { text: "Ignore", nextScene: "Ignore" },
          { text: "follow instructions", nextScene: "follow3" }
        ]
      },

      follow3: {
        image: "images/From-The-Air2.png",
        audio: "/visual%20novel/audio/put-hands-hips.mp3",
        choices: [
          { text: "Ignore", nextScene: "Ignore" },
          { text: "follow instructions", nextScene: "follow4" }
        ]
      },
      follow4: {
        image: "images/From-The-Air.png",
        audio: "/visual%20novel/audio/heh-heh.mp3",
        choices: [
            { text: "...", nextScene: "link", isLink: true, href: "Phone_4.html" },
        ]
      },

      Ignore: {
        image: "images/From-The-Air3.png",
        audio: "/visual%20novel/audio/together-jump.mp3",
        choices: [
          { text: "Put your hands over your eyes. Jump out of the plane.", nextScene: "link", isLink: true, href: "Phone_4.html" },
        
        ]
      },


      Whatever: {
        image: "images/From-The-Air2.png",
        audio: "/visual%20novel/audio/you-know.mp3",
        choices: [
          { text: "Drink some water", nextScene: "water" },
          { text: "This ia all an illusion", nextScene: "illusion" }
        ]
      },


      water: {
        image: "images/From-The-Air.png",
        audio: "/visual%20novel/audio/captain-going-down-traytable.mp3",
        choices: [
            { text: "...", nextScene: "link", isLink: true, href: "Phone_4.html" },
        ]
      },

      illusion: {
        image: "images/From-The-Air2.png",
        audio: "/visual%20novel/audio/time-no-pilot.mp3",
        choices: [
            { text: "...", nextScene: "ignore" },
        ]
      },
   
   

  };
  

  let currentScene = "start";
  let currentAudio = null;
  
  function showScene(sceneKey) {
    const scene = scenes[sceneKey];
    const dialogue = document.getElementById("dialogue");
    const sceneImage = document.getElementById("scene-image");
    const choicesContainer = document.getElementById("choices");
  
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    
    // Play new audio if specified in the scene
    if (scene.audio) {
      currentAudio = new Audio(scene.audio);
      currentAudio.loop = scene.loopAudio || false;
      currentAudio.play().catch(e => console.log("Audio play failed:", e));
    }
  
    // Set the text and image
    dialogue.textContent = scene.text;
    dialogue.style.transform = "translateY(0)"; // Ensure text is visible
    sceneImage.style.backgroundImage = `url('${scene.image}')`;
    
    // Set image clickability for start scene
    sceneImage.style.cursor = sceneKey === "start" ? "pointer" : "default";
    sceneImage.onclick = sceneKey === "start" ? () => showScene(scene.nextScene) : null;
    
    // Handle choices
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