document.getElementById("high-five-button").addEventListener("click", function () {
    window.location.href = "start.html";
});

document.getElementById("teaser-button").addEventListener("click", function() {
    const modal = document.getElementById("video-modal");
    const video = document.getElementById("video-player");
    
    // Show the modal and play the video
    modal.style.display = "flex";
    video.play();
    
    // When video ends, hide the modal
    video.addEventListener("ended", function() {
        closeVideo();
    }, { once: true });
});

// Close button functionality
document.querySelector(".close-button").addEventListener("click", closeVideo);

// Also hide modal if user clicks anywhere outside the video
document.getElementById("video-modal").addEventListener("click", function(e) {
    if (e.target === this) {
        closeVideo();
    }
});

function closeVideo() {
    const modal = document.getElementById("video-modal");
    const video = document.getElementById("video-player");
    
    video.pause();
    modal.style.display = "none";
    video.currentTime = 0; // Reset video to start
}