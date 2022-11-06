var AudioResource = /** @class */ (function () {
    function AudioResource(key, volume, path) {
        this.key = key;
        this.volume = volume;
        this.audio = new Audio(path);
        this.audio.volume = this.volume;
    }
    AudioResource.prototype.Play = function () {
        this.audio.currentTime = 0;
        if (this.volume)
            this.audio.play();
    };
    return AudioResource;
}());
var AudioResources = [
    new AudioResource('hover0', 0.6, './sounds/cards-hover1.mp3'),
    new AudioResource('hover1', 0.6, './sounds/cards-hover2.mp3'),
    new AudioResource('hover2', 1, './sounds/cards-hover3.mp3'),
    new AudioResource('hover3', 1, './sounds/cards-hover4.mp3'),
    new AudioResource('shuffle', 1, './sounds/cards-shuffle.mp3'),
    new AudioResource('start', 0.6, './sounds/cards-start.mp3'),
    new AudioResource('appear', 0.6, './sounds/cards-appear.mp3'),
    new AudioResource('moving', 0.8, './sounds/cards-moving.mp3')
];
var AudioManager = /** @class */ (function () {
    function AudioManager() {
        this.Audios = [];
        this.SoundsToggle = false;
        for (var _i = 0, AudioResources_1 = AudioResources; _i < AudioResources_1.length; _i++) {
            var Audio_1 = AudioResources_1[_i];
            this.Audios.push(Audio_1);
        }
    }
    AudioManager.prototype.Play = function (key) {
        var _a, _b;
        if (this.SoundsToggle) {
            if (key === 'hover') {
                (_a = this.Audios.find(function (x) { return x.key === "hover".concat(Math.floor(Math.random() * 3)); })) === null || _a === void 0 ? void 0 : _a.Play();
            }
            else {
                (_b = this.Audios.find(function (x) { return x.key === key; })) === null || _b === void 0 ? void 0 : _b.Play();
            }
        }
    };
    AudioManager.prototype.Toggle = function () {
        return this.SoundsToggle = !this.SoundsToggle;
    };
    return AudioManager;
}());
