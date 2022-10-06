function start() {
    let res = document.getElementById('create');
    res.addEventListener('click', (event) => { createElement(event) });
}

let url;

function addListener() {
    const input = document.getElementById('fileselect');
    input.addEventListener('change', function () {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            url = event.target.result;
        });
        reader.readAsDataURL(this.files[0]);
    });
}




function createElement(ev) {

    let titleElement = document.getElementById('title');
    let textTitle = titleElement.value;
    titleElement.value = '';

    let descElement = document.getElementById('description');
    let textDescription = descElement.value;
    descElement.value = '';

    if (textTitle === '' || textDescription === '' || url === '') {
        alert('Что-то не было выбрано');
    }
    else {
        const input = document.getElementById('fileselect');

        let container = document.getElementById('container');

        let element = document.createElement('div');
        element.className = 'card';

        let image = document.createElement('img');
        // image.src = 'https://www.bofrost.de/medias/01781-DE-pizza-con-salame-pic1.jpg-W1400xH1400R1.1?context=bWFzdGVyfHByb2R1Y3QtaW1hZ2VzfDExMzAyOTd8aW1hZ2UvanBlZ3xoODQvaDU4Lzk0MDcyMjE4MjU1NjYvMDE3ODFfREVfcGl6emEtY29uLXNhbGFtZV9waWMxLmpwZ19XMTQwMHhIMTQwMFIxLjF8YjRjY2FkZmZhZjRlMzU5NmUyYzU0ZjEzOTcxZmExM2ZhMDI2Yjk5YjMxZTkwOGMzZDQ4Y2QxODJhOTRiOGU0Nw';
        image.src = url;
        image.className = 'card--image';
        element.appendChild(image);

        let title = document.createElement('div');
        title.className = 'card--title';
        title.textContent = textTitle.length > 15 ? textTitle.slice(0, 15) : textTitle;
        element.appendChild(title);

        let description = document.createElement('div');
        description.className = 'card--description';
        description.textContent = textDescription.length > 50 ? `${textDescription.slice(0, 50)}..` : textDescription;
        element.appendChild(description);

        container.appendChild(element);
        console.log(container, element);
        
        input.value = '';
    }
}

window.onload = () => {
    start();
    addListener();
}