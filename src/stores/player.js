import { defineStore } from "pinia";
import { Howl } from "howler";
import helper from "../includes/helper";
// eslint-disable-next-line no-undef
export const usePlayerStore = defineStore("player", {
  state: () => ({
    currentSong: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
    playerProgress: "0%",
  }),
  actions: {
    async newSong(song) {
      if (this.sound instanceof Howl) {
        this.sound.unload();
      }
      this.currentSong = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });

      this.sound.play();

      this.sound.on("play", () => {
        requestAnimationFrame(this.progress);
      });
    },
    async togglePlay() {
      if (!this.sound.playing) {
        return;
      }

      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    progress() {
      this.seek = helper.formateTime(this.sound.seek());
      this.duration = helper.formateTime(this.sound.duration());

      this.playerProgress = `${
        (this.sound.seek() / this.sound.duration()) * 100
      }%`;
      if (this.sound.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
    updateSeek(event) {
      if (!this.sound.playing || !this.sound.playing()) {
        return;
      }
      const { x, width } = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - x;
      const precentage = clickX / width;
      const seconds = precentage * this.sound.duration();

      this.sound.seek(seconds);
      this.sound.once("seek", this.progress);
    },
  },
  getters: {
    playing: (state) => {
      return state.sound.playing ? state.sound.playing() : false;
    },
  },
});
