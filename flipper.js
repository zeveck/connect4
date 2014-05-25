// Animates flipping an element over.
// See flipElement.
function animateFlip(flipper, interval, start, flip, target, step) {
    var flipped = false;
    var i = start;
    var handle = window.setInterval(function() {
        if (i > flip && !flipped) {
            var face = flipper.querySelector(".face");
            var back = flipper.querySelector(".back");
            if (flipper.faceDown) {
                back.style.visibility = "hidden";
                face.style.visibility = "visible";
                flipper.faceDown = false;
            } else {
                back.style.visibility = "visible";
                face.style.visibility = "hidden";
                flipper.faceDown = true;
            }
            flipped = true;
        }
        if (i > target) {
            window.clearInterval(handle);
            flipper.flipping = false;
        }

        flipper.style.webkitTransform = "rotateY(" + i + "deg)";
        i += step;
    }, interval);
}

// Uses CSS3 transform to "flip" an element (like flipping a card over).
function flipElement(element, step) {
    if (element.flipping) {
        return false;
    }
    element.flipping = true;

    if (!step) {
        step = 1;
    }

    if (element.faceDown) {
        animateFlip(element, 10, 0, 90, 180, step);
    } else {
        animateFlip(element, 10, 180, 270, 360, step);
    }

    return true;
}


