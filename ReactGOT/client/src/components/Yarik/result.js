const Cookies = require('js-cookie');

function saveResult(score) {
    let user = Cookies.get('user');

    if (user !== undefined) {
        if (user === '') user = 'Unknown';
        else if (user.length > 20) user.slice(20);
    }
    else user = 'Unknown';

    fetch("/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: user,
            score: score
        })
    })

    return false;
}

module.exports = {
    saveResult
}