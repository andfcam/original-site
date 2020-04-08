class Script {
    constructor(div) {
        this.parent = div.parentNode;
        this.speech = div;
    }

    narrate = (line, inputRequired) => {
        this.parent.style.visibility = 'visible';
        this.speech.innerHTML = `"${line}"`;
        if (inputRequired) {
            this.speech.innerHTML += `<br><br><input type="text" id="name-input" placeholder="My name is: " autofocus>`;
            this.speech.innerHTML += `<button id="name-button"> &rarr; </button">`
        }
    }

    processName = () => {
        let name = document.getElementById('name-input').value;
        if (name.length < 1) name = 'Anonymous';
        this.advance(3, name);
    }

    advance = (progress, name) => {
        switch (progress) {
            case 0:
                this.narrate(`Oh, hi there. I'm surprised you missed the signs...`);
                setTimeout($.proxy(() => {
                    game.ableToShoot = true;
                    document.getElementById('click-me').classList.add('enlarged');
                    this.narrate(`A simple mistake. Let's ensure it doesn't happen again.`);
                }, this), 3500);
                break;
            case 1:
                this.narrate(`Really...`);
                break;
            case 2:
                game.ableToShoot = false;
                this.narrate(`Easy there, trigger-happy. How about a truce? What can I call you?`, true);
                document.getElementById('name-button').onclick = () => {
                    this.processName();
                }
                break;
            case 3:
                this.narrate(`${name}, is that right? Phew! I'm glad we could work things out...`);
                setTimeout($.proxy(() => {
                    game.ableToShoot = true;
                    // find other way to not store startTime as property
                    this.startTime = new Date().getTime();
                    this.narrate(`... now I don't have to worry about that top-right icon getting destroyed.`);
                    // change it from the banner to another, smaller image. Might make more sense. One of the other icons on right side?
                    // change picture to black - writing to say not to shoot it, nothing interesting behind
                }, this), 3000);
                break;
            case 4:
                game.ableToShoot = false;
                const currentTime = new Date().getTime();
                const timeElapsed = ((currentTime - this.startTime) / 1000).toFixed(2);
                this.narrate(`For g-`);
                setTimeout($.proxy(() => {
                    game.ship.lasers.length = 0;
                    this.narrate(`${timeElapsed} seconds it took you. It's <em>almost</em> impressive.`);
                    setTimeout($.proxy(() => {
                        game.ableToShoot = true;
                        document.getElementById('switch').classList.add('destructable');
                        game.elements.push(document.getElementById('switch'));
                        this.narrate(`Well go on then... shoot the mystery switch.`);
                    }, this), 3000);
                }, this), 500);
                break;
            case 5:
                game.apocalypse();
                this.narrate(`Oh, so you do listen.`);
                break;
            default:
                console.log('Invalid script argument.');
                break;
        }
    }
}