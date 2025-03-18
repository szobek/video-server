const urlParams = new URLSearchParams(window.location.search);
const id=urlParams.get('video')
document.getElementById('videoid').innerText=id