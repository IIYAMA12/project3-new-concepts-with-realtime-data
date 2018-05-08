window.addEventListener("deviceorientation", handleOrientation, true);

document.getElementsByTagName("textarea")[0].value = "start";

function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;
    console.log(absolute, alpha, beta, gamma);
    document.getElementsByTagName("textarea")[0].value = alpha;
    // Do stuff with the new orientation data
}

