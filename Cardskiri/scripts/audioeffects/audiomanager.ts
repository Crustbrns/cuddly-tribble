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
    new AudioResource('hover0', 0.6, './sounds/cards-hover1.mp3'),
    new AudioResource('hover1', 0.6, './sounds/cards-hover2.mp3'),
    new AudioResource('hover2', 1, './sounds/cards-hover3.mp3'),
    new AudioResource('hover3', 1, './sounds/cards-hover4.mp3'),
    new AudioResource('shuffle', 1, './sounds/cards-shuffle.mp3'),
    new AudioResource('start', 0.6, './sounds/cards-start.mp3'),
    new AudioResource('appear', 0.6, './sounds/cards-appear.mp3'),
    new AudioResource('moving', 0.8, './sounds/cards-moving.mp3')
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
                this.Audios.find(x => x.key === `hover${Math.floor(Math.random() * 3)}`)?.Play();
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