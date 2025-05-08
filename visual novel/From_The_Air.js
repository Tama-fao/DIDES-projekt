const scenes = {
    start: {
      text: "Good evening.This is your Captain. This is gonna be some day. Standby.",
      image: "images/From-The-Air3.png",
      choices: [
        { text: "Oh no!", nextScene: "No" },
        { text: "Whatever.", nextScene: "Whatever" }
      ]
    },
    No: {
      text: "Uh-this is your Captain again. We are about to attempt a crash landing.Please extinuish all cigarettes.Place your tray tables in their upright, locked position. Your Captain says: Put your head on your knees.",
      choices: [
        { text: "Ignore", nextScene: "Ignore" },
        { text: "follow instructions", nextScene: "follow" }
      ]
    },
    follow: {
      text: "Your Captain says: Put your head on your hands.",
      choices: [
        { text: "Ignore", nextScene: "Ignore" },
        { text: "follow instructions", nextScene: "follow2" }
      ]
    },

    follow2: {
        text: "Captain says: Put your hands on your head.",
        choices: [
          { text: "Ignore", nextScene: "Ignore" },
          { text: "follow instructions", nextScene: "follow3" }
        ]
      },

      follow3: {
        text: "Put your hands on your hips.",
        choices: [
          { text: "Ignore", nextScene: "Ignore" },
          { text: "follow instructions", nextScene: "follow4" }
        ]
      },
      follow4: {
        text: "Heh heh.", 
        choices: [
            { text: "...", nextScene: "link", isLink: true, href: "Phone4.html" },
        ]
      },

      Ignore: {
        text: "This is your Captain-and we are going down.We are all going down, together.",
        choices: [
          { text: "Put your hands over your eyes. Jump out of the plane.", nextScene: "link", isLink: true, href: "Phone4.html" },
        
        ]
      },


      Whatever: {
        text: "You know, I've got a funny feeling I've seen this all before.Why? Cause I'm a caveman.Why?Cause I've got eyes in the back of my head.Why?It's the heat.",
        choices: [
          { text: "Drink some water", nextScene: "water" },
          { text: "This ia all an illusion", nextScene: "illusion" }
        ]
      },


      water: {
        text: "This is your Captain-and we are going down. Place your tray tables in their upright, locked position.", 
        choices: [
            { text: "...", nextScene: "link", isLink: true, href: "Phone4.html" },
        ]
      },

      illusion: {
        text: "This is the time.And this is the record of the time. This is the time. There is no pilot.You are not alone.", 
        choices: [
            { text: "...", nextScene: "ignore" },
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
  