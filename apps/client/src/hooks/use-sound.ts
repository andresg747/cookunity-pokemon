import { useEffect, useState } from "react";

export default function useSound(url: string, options?: { volume: number }) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = options?.volume ?? 1;
    setAudio(audio);
  }, [options?.volume, url]);

  return audio;
}
