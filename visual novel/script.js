const scenes = {
    start: {
      text: "You know, I've got a funny feeling I've seen this all before. Why? Cause I'm a caveman. Why? Cause I've got eyes in the back of my head. Why? It's the heat.",
      choices: [
        { text: "Drink some water", nextScene: "leftPath" },
        { text: "This is all an illusion ", nextScene: "rightPath" }
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
  