const scenes = {
    start: {
      text: "Got the time?",
      image: "Let_X=X.png",
      choices: [
        { text: "No.", nextScene: "thanks" },
        { text: "For sure!", nextScene: "postcard" }
      ]
    },
    thanks: {
      text: "So... thanks. Thanks for going all out.",
      

    },
    postcard: {
      text: "I got this postcard. And it read, it said: Dear Amigo - Dear Partner. Listen, uh - I just want to say thanks. So...thanks.",
      choices: [
        { text: "Why didn't you contact me back sooner?", nextScene: "contact" },
        { text: "No problem, for you, always.", nextScene: "always" }
      ]
    },
    contact: {
      text: "I met this guy - and he looked like might have been a hat check clerk at an ice rink. AWhich, in fact, he turned out to be.",
      choices: [
        { text: "And?", nextScene: "and" },
        { text: "Allright, understandable.", nextScene: "understandable"}
      ]
    },
    always: {
      text: "Let X=X. You know, it could be you. It's a sky-blue sky. Satellites are out tonight.",
      choices: [
        { text: "Sorry, I don't have the time.", nextScene: "time" },
        { text: "Let's watch them.", nextScene: "watch"}
      ]
    },
    and: {
        text: "Right again.",
        choices: [
            { text: "That was a weak excuse.", nextScene: "time"},
            { text: "Ok, reason enough.", nextScene: "understandable"}
        ]
    },
    watch: {
        text: "You know, I could write a book. And this book would be think enough to stun an ox. Cause I can see the future and it's a place - about 70 miles east of here. Where it's lighter. Linger on over here.",
        choices: [
            { text: "Oh boy...", nextScene: "time"},
            { text: "Then let's wait for the future together.", nextScene: "understandable"}
        ]
    },
    understandable: {
        text: "Let X=X.Hug and kisses. XXXXOOOO.",
    },
    time: {
        text: "Oh yeah, P.S. I - feel - feel like - I am - in a burning building - and I gotta go. Cause I - I feel - feel like - I am - in a burning building - and I gotta go.",
        choices: [
            { text: "...", nextScene: "link", isLink: true, href: "phone5.html" },
        ]
    }

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
      button.onclick = () => showScene(choice.nextScene);
      choicesContainer.appendChild(button);
    });
  }
  
  showScene(currentScene);
  