const scenes = {
  start: {
    text: "And the voice said: Neither snow nor rain nor gloom Of night shall stay these couriers from the swift Completion of their appointed rounds. Cause when love is gone, there's always justice. And when justice is gone, there's always force.",
    image: "images/phone.png",
    choices: [
      { text: "reply", nextScene: "link", isLink: true, href: "Big_Science.html" },
    ]
  },
};

let currentScene = "start";

function showScene(sceneKey) {
  const scene = scenes[sceneKey];
  currentScene = sceneKey;
  document.getElementById("dialogue").innerText = scene.text;
  
  const sceneImage = document.getElementById("scene-image");
  if (scene.image) {
    sceneImage.style.backgroundImage = `url('${scene.image}')`;
  }

  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  
  scene.choices.forEach(choice => {
      const button = document.createElement("button");
      button.innerText = choice.text;
      button.classList.add("choice-button");
      
      if (choice.isLink) {
          // If it's a link, navigate to the specified href
          button.onclick = () => window.location.href = choice.href;
      } else {
          // Otherwise, proceed with normal scene navigation
          button.onclick = () => showScene(choice.nextScene);
      }
      
      choicesContainer.appendChild(button);
  });
}

showScene(currentScene);