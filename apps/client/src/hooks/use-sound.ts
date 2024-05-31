import { useMemo } from "react";

export default function useSound(url: string, options?: { volume: number }) {
  const audio = useMemo(() => {
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = options?.volume ?? 1;
    return audio;
  }, [url, options?.volume]);
  return audio;
}
