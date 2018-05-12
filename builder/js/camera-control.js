
let cameraDirection = "stop";

(function () {
    let slidePosition = 0;
    
    const slides = [
        {
            length: 30 
        },
        {
            length: 5
        },
        {
            length: 30 
        },
    ];

    const totalSlideSize = slides.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.length;
    }, 0);
    // console.table("totalSlideSize", totalSlideSize);
    

    window.addEventListener("load", function () {
        let lastTimeStamp;
        const cameraSpeed = 0.03;
        let lastBackgroundProgress = 0;

        frameRender.attachFunction(function (timeStamp) {
            if (lastTimeStamp != undefined) {
                const speedFactor = (timeStamp - lastTimeStamp) / 17

                switch (cameraDirection) {
                    case "left":
                        slidePosition += speedFactor * cameraSpeed;
                        if (slidePosition > totalSlideSize) {
                            slidePosition = 0;
                        } 
                        break;
                    case "right":
                        slidePosition -= speedFactor * cameraSpeed;
                        if (slidePosition < 0) {
                            slidePosition = totalSlideSize;
                        }
                        break;
                    default:

                        break;
                }

                const progress = slidePosition / totalSlideSize;
                // debug(Math.abs(lastBackgroundProgress - progress));
                // debug(cameraDirection);
                // console.log(Math.abs(lastBackgroundProgress - progress), progress)
                if (Math.abs(lastBackgroundProgress - progress) > 0.5) {
                    document.getElementById("main-background").classList.remove("background-transition");
                    
                    setTimeout(function () {
                        // debug("yes", Math.abs(lastBackgroundProgress - progress));
                        document.getElementById("main-background").classList.add("background-transition");
                    }, 50);
                }
                lastBackgroundProgress = progress;
                // debug(document.getElementsByTagName("main")[0].style.backgroundPosition);
                console.log(document.getElementsByTagName("main")[0].style.backgroundPosition);
                const backgroundProgress = slidePosition % 10 / 10;
                const backgroundPositionX = (backgroundProgress * 200) - 50;
                document.getElementById("main-background").style.backgroundPosition = "" + backgroundPositionX + "vw calc(150vmax - 50vh)";
                // document.getElementsByTagName("textarea")[0].value = progress;
            }
            lastTimeStamp = timeStamp;
        });
    });    
})();

