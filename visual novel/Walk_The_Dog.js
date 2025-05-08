const scenes = {
    start: {
      text: "Well, I saw a lot of trees today and they were all made of wood. They were wooden trees and they were made entirely of wood.",
      image: "Walk_The_Dog.png",
      choices: [
        { text: "I don't care.", nextScene: "Care" },
        { text: "Cool!", nextScene: "Cool" }
      ]
    },
    Care: {
      text: "I came home today and you were all on fire. Your shirt was on fire, and your hair was on fire, And flames were licking all around your feet. And I did not know what to do! And then a thousand violins began to play, And I really did not know what to do then. So I just decided to go out and walk the dog.",
      choices: [
        { text: "Ok, so?", nextScene: "Ok" },
        { text: "I'm Sorry...", nextScene: "Sorry" }
      ]
    },
    Cool: {
      text: "I went to the movies, and I saw a dog thirty feet high. And this dog was made entirely of light. And he filled up the whole screen. And his eyes were long hallways.He had those long, echoing, hallway eyes.",
      choices: [
        { text: "Who cares.", nextScene: "Ok" },
        { text: "I love Dogs too!", nextScene: "Sorry" }
      ]
    },
    Ok: {
      text: "I left my mom and I left my dad. And I just want to go home now. Oh! I feel so bad. I feel so sad. But not as bad as the night I wrote this song.",
      choices: [
        { text: "...", nextScene: "link", isLink: true, href: "Phone_2.html" },
      ]
    },
    Sorry: {
      text: "Well, I just want to go home now and walk the dog.",
      choices: [{ text: "...", nextScene: "link", isLink: true, href: "Phone_2.html" },]
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
  