const scenes = {
    start: {
      text: "You're standing at a crossroad. What do you do?",
      choices: [
        { text: "Go left", nextScene: "leftPath" },
        { text: "Go right", nextScene: "rightPath" }
      ]
    },
    leftPath: {
      text: "You find a mysterious forest.",
      choices: [
        { text: "Enter the forest", nextScene: "forest" },
        { text: "Turn back", nextScene: "start" }
      ]
    },
    rightPath: {
      text: "You encounter a river.",
      choices: [
        { text: "Swim across", nextScene: "river" },
        { text: "Build a raft", nextScene: "raft" }
      ]
    },
    forest: {
      text: "You are lost in the forest forever. Game Over.",
      choices: []
    },
    river: {
      text: "The current is too strong. You drown. Game Over.",
      choices: []
    },
    raft: {
      text: "You cross safely and find treasure. You win!",
      choices: []
    }
  };
  
  let currentScene = "start";
  
  function showScene(sceneKey) {
    const scene = scenes[sceneKey];
    currentScene = sceneKey;
    document.getElementById("dialogue").innerText = scene.text;
    
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
    
    scene.choices.forEach(choice => {
      const button = document.createElement("button");
      button.innerText = choice.text;
      button.classList.add("choice-button");
      button.onclick = () => showScene(choice.nextScene);
      choicesContainer.appendChild(button);
    });
  }
  
  showScene(currentScene);
  