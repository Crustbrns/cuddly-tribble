class AudioResource {
    key: string;
    volume: number;
    audio: HTMLAudioElement;

    constructor(key: string, volume: number, path: string) {
        this.key = key;
        this.volume = volume;
        this.audio = new Audio(path);
        this.audio.volume = this.volume;
    }

    Play(): void {
        this.audio.currentTime = 0;
        if (this.volume)
            this.audio.play();
    }
}

const AudioResources = [
    new AudioResource('hover0', 0.65, './sounds/cards-hover0.mp3'),
    new AudioResource('hover1', 0.55, './sounds/cards-hover1.mp3'),
    new AudioResource('shuffle', 1, './sounds/cards-shuffle.mp3'),
    new AudioResource('start', 0.6, './sounds/cards-start.mp3'),
    new AudioResource('appear', 0.35, './sounds/cards-appear.mp3'),
    new AudioResource('moving', 0.7, './sounds/cards-moving.mp3'),
    new AudioResource('sweep0', 0.7, './sounds/cards-sweep0.mp3'),
    new AudioResource('sweep1', 0.55, './sounds/cards-sweep1.mp3'),
    new AudioResource('trump', 0.5, './sounds/cards-trump.mp3'),
    new AudioResource('placed0', 0.2, './sounds/cards-placed0.mp3'),
    new AudioResource('placed1', 0.5, './sounds/cards-placed1.mp3'),
    new AudioResource('placed2', 0.5, './sounds/cards-placed2.mp3'),
    new AudioResource('placed3', 0.5, './sounds/cards-placed3.mp3'),
    new AudioResource('placed4', 0.5, './sounds/cards-placed4.mp3'),
    new AudioResource('placed5', 0.5, './sounds/cards-placed5.mp3'),
    new AudioResource('placed6', 0.5, './sounds/cards-placed6.mp3'),
    new AudioResource('placed7', 0.5, './sounds/cards-placed7.mp3'),
    new AudioResource('placed8', 0.5, './sounds/cards-placed8.mp3'),
    new AudioResource('shoved0', 0.5, './sounds/cards-shoved0.mp3'),
    new AudioResource('shoved1', 0.5, './sounds/cards-shoved1.mp3'),
    new AudioResource('shoved2', 0.5, './sounds/cards-shoved2.mp3'),
    new AudioResource('shoved3', 0.5, './sounds/cards-shoved3.mp3'),
    new AudioResource('win', 0.5, './sounds/cards-win.mp3'),
    new AudioResource('lose', 0.35, './sounds/cards-lose.mp3'),
    new AudioResource('alert', 0.06, './sounds/cards-alert.mp3')
];

class AudioManager {
    Audios: Array<AudioResource> = [];
    SoundsToggle: boolean = false;

    constructor() {
        for (const Audio of AudioResources) {
            this.Audios.push(Audio);
        }
    }

    Play(key: string): void {
        if (this.SoundsToggle) {
            if (key === 'hover') {
                this.Audios.find(x => x.key === `hover${Math.floor(Math.random() * 2)}`)?.Play();
            }
            else if (key === 'sweep') {
                this.Audios.find(x => x.key === `sweep${Math.floor(Math.random() * 2)}`)?.Play();
            }
            else if (key === 'placed') {
                let index: number = Math.floor(Math.random() * this.Audios.filter(x => x.key.includes('placed')).length);
                // console.log(index!);

                this.Audios.find(x => x.key === `placed${index}`)?.Play();
            }
            else if (key === 'shoved') {
                let index: number = Math.floor(Math.random() * this.Audios.filter(x => x.key.includes('shoved')).length);
                // console.log(index!);

                this.Audios.find(x => x.key === `shoved${index}`)?.Play();
            }
            else {
                this.Audios.find(x => x.key === key)?.Play();
            }
        }
    }

    Toggle(): boolean {
        return this.SoundsToggle = !this.SoundsToggle;
    }
}