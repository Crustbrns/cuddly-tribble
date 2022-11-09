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
        var _a, _b, _c, _d, _e;
        if (this.SoundsToggle) {
            if (key === 'hover') {
                (_a = this.Audios.find(function (x) { return x.key === "hover".concat(Math.floor(Math.random() * 2)); })) === null || _a === void 0 ? void 0 : _a.Play();
            }
            else if (key === 'sweep') {
                (_b = this.Audios.find(function (x) { return x.key === "sweep".concat(Math.floor(Math.random() * 2)); })) === null || _b === void 0 ? void 0 : _b.Play();
            }
            else if (key === 'placed') {
                var index_1 = Math.floor(Math.random() * this.Audios.filter(function (x) { return x.key.includes('placed'); }).length);
                // console.log(index!);
                (_c = this.Audios.find(function (x) { return x.key === "placed".concat(index_1); })) === null || _c === void 0 ? void 0 : _c.Play();
            }
            else if (key === 'shoved') {
                var index_2 = Math.floor(Math.random() * this.Audios.filter(function (x) { return x.key.includes('shoved'); }).length);
                // console.log(index!);
                (_d = this.Audios.find(function (x) { return x.key === "shoved".concat(index_2); })) === null || _d === void 0 ? void 0 : _d.Play();
            }
            else {
                (_e = this.Audios.find(function (x) { return x.key === key; })) === null || _e === void 0 ? void 0 : _e.Play();
            }
        }
    };
    AudioManager.prototype.Toggle = function () {
        return this.SoundsToggle = !this.SoundsToggle;
    };
    return AudioManager;
}());
