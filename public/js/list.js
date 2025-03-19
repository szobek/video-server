fetch("/test")
    .then(response => response.json())
    .then(data => {
       
        for (let movie_data of data) {
            createVideo(movie_data);
        }
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
    });
const createVideo = (movie_data) => {
    const type = movie_data.type
    const id = movie_data.ID
    const element = document.createElement("video");
    element.src = `/video/${type}/${id}`;
    element.controls = false;
    element.muted = true;
    document.getElementById("test").appendChild(element);
}