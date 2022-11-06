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
        if(this.volume )
        this.audio.play();
    }
}

const AudioResources = [new AudioResource('hover', 0.8, './sounds/cards-hover.mp3')];

class AudioManager {
    Audios: Array<AudioResource> = [];
    SoundsToggle: boolean = false;

    constructor() {
        for (const Audio of AudioResources) {
            this.Audios.push(Audio);
        }
    }

    Play(key: string): void {
        this.Audios.find(x => x.key === key)?.Play();
    }

    Toggle(): boolean {
        return this.SoundsToggle = !this.SoundsToggle;
    }
}