const token = '25074899-aab4fea360b67611a921a5d7d';
let query = '';

function changeQuery(e) {
    query = e.target.value;
    let btn = document.getElementById('buzzbutton');
    if (query !== '') {
        btn.classList.add('active');
    }
    else {
        btn.classList.remove('active');
    }
}

function removeSpaces(query) {
    return query.replace(' ', '+');
}

async function fetchRandomImage() {
    let image = null;

    await fetch(`https://pixabay.com/api/?key=${token}&q=${removeSpaces(query)}&image_type=photo`)
        .then(res => res.json())
        .then(res => image = res.hits.at(Math.floor(Math.random() * res.hits.length)).webformatURL);

    if (image != null) {
        let bgImage = document.getElementById('bg-image');
        bgImage.style.backgroundImage = `url(${image})`;
        console.log(bgImage.style.backgroundImage);

        let img = document.getElementById('buzzimage').src = image;
    }

    console.log(image);
}

window.onload = () => {
    let btn = document.getElementById('buzzbutton');
    btn.addEventListener('click', fetchRandomImage);

    let input = document.getElementById('buzzquery');
    input.addEventListener('keyup', changeQuery);
}