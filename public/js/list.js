fetch("/test")
    .then(response => response.json())
    .then(data => {
       for (let movie_data of data) {
            createTitle(movie_data);
            for (let movie of movie_data.movies) {
                createVideo(movie);
            }
        }
        addEventToVideos();
    });
const createVideo = (movie_data) => {
    const type = movie_data.type
    const id = movie_data.ID
    const element = document.createElement("video");
    element.src = `/video/${type}/${id}`;
    element.controls = false;
    element.muted = true;
    document.body.appendChild(element);
}
const createTitle = (movie_data) => {    
    const element = document.createElement("h1");
    element.textContent = movie_data.type;
    document.body.appendChild(element);
}

const addEventToVideos = () => {
    const video_array = document.getElementsByTagName("video");

    for (let video of video_array) {

        video.addEventListener("mouseenter", () => {
            video.play();
        });

        video.addEventListener("mouseleave", () => {
            video.currentTime = 0;//rewind video to start
            video.pause();
        });
    }
}