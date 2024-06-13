export function setSound(audio: HTMLAudioElement, time: number) {
  audio.play()
  setTimeout(() => {
    audio.pause()
  }, time)
  audio.currentTime = 0
}