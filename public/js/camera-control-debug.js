
let cameraDirection = "stop";

const slideControl = (function () {

    const slides = [
        {
            length: 4,
            elementId: "intro",
            functions: {
                start: [
                    function () {
                        document.getElementById("main-crop").classList.add("on-screen");
                        document.getElementById("main-fish").classList.add("on-plate");
                        document.getElementById("main-crop").classList.add("on-plate");
                        
                    }
                ],
                end: [
                    function () {
                        document.getElementById("main-fish").classList.remove("on-plate");
                        document.getElementById("main-crop").classList.remove("on-plate");
                        document.getElementById("main-crop").classList.remove("on-screen");
                    }
                ]
            }
        },
        {
            length: 4,
            functions: {
                start: [
                    function () {
                        
                        
                        document.getElementById("main-fish").classList.add("on-bottom-section");
                        document.getElementById("main-crop").classList.add("on-bottom-section");

                        document.getElementById("main-crop").classList.add("on-screen");
                        document.getElementById("waves").classList.add("on-screen");
                    }
                ],
                end: [
                    function () {
                        
                        document.getElementById("main-fish").classList.remove("on-bottom-section");
                        document.getElementById("main-crop").classList.remove("on-bottom-section");

                        document.getElementById("main-crop").classList.remove("on-screen");
                        document.getElementById("waves").classList.remove("on-screen");
                    }
                ]
            },
            elementId: "show-plate-content",
        },
        {
            length: 2,
            elementId: "",
        },
        {
            length: 4,
            elementId: "toilet",
            functions: {
                start: [
                    function () {
                        document.getElementById("main-fish").classList.add("shitting");
                        document.getElementById("main-fish").classList.add("on-screen");
                    }
                ],
                end: [
                    function () {
                        
                        document.getElementById("main-fish").classList.remove("shitting");

                    }
                ]
            },
        },
        {
            length: 4,
            elementId: "nitrosomonas",
            functions: {
                start: [
                    function () {
                        document.getElementById("main-fish").classList.remove("on-screen");
                    }
                ]
            }
        },
        {
            length: 4,
            elementId: "nitrospira",
        },
        {
            length: 4,
            elementId: "plants",
        },
        {
            length: 4,
            elementId: "clean-water",
        },
        {
            length: 4,
            elementId: "fish-tank",
        },
        {
            length: 1,
            elementId: "break",
            functions: {
                start: [
                    function () {
                        document.getElementById("main-fish").classList.remove("on-screen");
                    }
                ]
            }
        },
    ];

   

    const slideControl = {
        check: function () {
            const slides = this.slides;
            const progress = this.slidePosition / this.totalSize;
            let slideOffset = 0;
            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i];
                if (this.slidePosition <= slideOffset + slide.length) {
                    console.log("slide index", i, this.slidePosition);
                    slideControl.show(i);
                    break;
                } else {
                    slideOffset += slide.length;
                }
            }
            
        },
        show: function (index) {
            const slide = this.slides[index];
            let newElementId;
            if (slide != undefined) {
                newElementId = slide.elementId;
            }


            const previousSlide = this.slideShown;
            const previousElementId = previousSlide.elementId;
            if (newElementId !== previousElementId) {

                
                if (previousSlide.functions != undefined && previousSlide.functions.end != undefined) {
                    const endFunctions = previousSlide.functions.end;
                    for (let i = 0; i < endFunctions.length; i++) {
                        endFunctions[i]();
                    }
                }
                
                if (slide.functions != undefined && slide.functions.start != undefined) {
                    const startFunctions = slide.functions.start;
                    for (let i = 0; i < startFunctions.length; i++) {
                        startFunctions[i]();
                    }
                }

                if (previousElementId != undefined) {
                    const previousElement = document.getElementById(previousElementId);
                    if (previousElement != undefined) {
                        previousElement.classList.add("hide-article");
                    }
                }
                if (newElementId != undefined) {
                    const elementElement = document.getElementById(newElementId);
                    if (elementElement != undefined) {
                        elementElement.classList.remove("hide-article");
                        elementElement.classList.add("active");
                    }
                }
            }
            this.slideShown = slide;
        },
        slideShown: slides[0],
        slides: slides,
        totalSize: slides.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.length;
        }, 0),
        slidePosition: slides[0].length / 2
    };

    return slideControl;
})();


(function () {
    let slidePosition = slideControl.slidePosition;
    
    
    const totalSlideSize = slideControl.totalSize;

    window.addEventListener("load", function () {
        let lastTimeStamp;
        const cameraSpeed = 0.03;
        let lastBackgroundProgress = 0;

        frameRender.attachFunction(function (timeStamp) {
            if (lastTimeStamp != undefined) {
                const speedFactor = (timeStamp - lastTimeStamp) / 17

                switch (cameraDirection) {
                    case "left":
                        slidePosition -= speedFactor * cameraSpeed;
                        if (slidePosition < 0) {
                            slidePosition = totalSlideSize;
                        }
                        break;
                    case "right":

                        slidePosition += speedFactor * cameraSpeed;
                        if (slidePosition > totalSlideSize) {
                            slidePosition = 0;
                        } 
                        break;
                    default:

                        break;
                }

                const progress = slidePosition / totalSlideSize;

                // console.log(Math.abs(lastBackgroundProgress - progress), progress)
                if (Math.abs(lastBackgroundProgress - progress) > 0.5) {
                    document.getElementById("main-background").classList.remove("background-transition");
                    
                    setTimeout(function () {

                        document.getElementById("main-background").classList.add("background-transition");
                    }, 50);
                }
                lastBackgroundProgress = progress;

                slideControl.check();
                
                const backgroundProgress = slidePosition % 10 / 10;
                const backgroundPositionX = (200 - (backgroundProgress * 200)) - 50;
                document.getElementById("main-background").style.backgroundPosition = "" + backgroundPositionX + "vw calc(150vmax - 50vh)";
            }

            slideControl.slidePosition = slidePosition;
            lastTimeStamp = timeStamp;
        });
    });    
})();



