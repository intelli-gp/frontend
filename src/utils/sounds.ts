export function player({ asset='', volume = 0.5 }: { asset?: string; volume?: number }) {
    const audio = new Audio();
    audio.src = asset;
    audio.volume = volume;
    
    const play = () => {
      if (audio.paused || !audio.currentTime) {
        audio.play().catch(() => {});
      }
    };
  
    const stop = () => {
      audio.pause();
    };
  
    const setVolume = (value: number) => (audio.volume = value / 100);
  
    const setAudio = (src: string) => {
      audio.src = src;
    };
  
    return {
      play,
      stop,
      setVolume,
      setAudio,
    };
  }