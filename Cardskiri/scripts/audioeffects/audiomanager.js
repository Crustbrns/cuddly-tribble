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
var AudioResources = [new AudioResource('hover', 0.8, './sounds/cards-hover.mp3')];
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
        var _a;
        (_a = this.Audios.find(function (x) { return x.key === key; })) === null || _a === void 0 ? void 0 : _a.Play();
    };
    AudioManager.prototype.Toggle = function () {
        return this.SoundsToggle = !this.SoundsToggle;
    };
    return AudioManager;
}());
