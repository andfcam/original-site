


// 1. refactor code 
//      noseX, noseY, radius don't work as intended, need to rework and find better solution
//          laser does not line up with lens position
//          new icon with lens in middle as workaround?
// 2. change images
//      clickme
//      make alternative banner/icon image for switch cover (make it look more dangerous)
//      avatar
// 7. implement switch and accompanying dialogue
// 8. contemplate duck battle and accompanying dialogue
// 9. narrate fades in and out

// after completion, 'You again? You have some nerve...'
// small title above narration to signify who's talking ('Andy the Pious' etc.)
// facial expressions change on avatar
// text prints out letter by letter
// reset page button after fight (or at all times?)
// lasers glow? affect lighting?

// -switch hit> (shooting disabled) (background flickers, everything turns to black, glows red in surveyor to simulate emergency lights, all elemtns on page glithced out - gobbledygook content and graphical glitches)
// Something about the duck... yadda yadda... protector of the website
// It's been fun, _name_. 
// (screen stops shaking) (Susan Fight)

// Look at firebase to think about book portfolio system

// static is called on the class, not _instances_ of a class eg Game not game

// For Ollie:
// Just include all files in html head? no JS import main file?
// Bad for classes to depend on each other? game.ctx, game.parent, Utils
// Idea to remove startTime rather than keep as property
// Is the bind necessary?
// advanceScript is massive

let game;

window.onload = () => {
    document.getElementById('theodolite').onclick = () => {
        if (!game && !window.matchMedia("(max-width: 768px)").matches) {
            game = new Game(document.getElementById('game'));
            game.start();
        }    
    };
};