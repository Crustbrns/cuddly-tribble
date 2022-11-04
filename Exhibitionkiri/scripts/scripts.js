const token = '25074899-aab4fea360b67611a921a5d7d';

async function fetchRandomImage(){
    fetch(`https://pixabay.com/api/?key=${token}&q=yellow+flowers&image_type=photo`)
}

window.onload = () => {
    let btn = document.getElementById('buzzbutton');
}