function red() {
    let first_sign = document.getElementById("select_st").selectedOptions[0].value;
    let second_sign = document.getElementById("select_nd").selectedOptions[0].value;
    let random = Math.random() * 100;
    console.log(first_sign);

    document.getElementById("text-output")
        .textContent = `Совместимость между ${first_sign} и ${second_sign} равна ${Math.floor(random)}%`;
}

document.getElementById("meowBtn").onclick = red();