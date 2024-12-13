import convert from "mp3-to-wav"

export function mp3_to_wav(path: string): Promise<{
  data: Float32Array[]
  sampleRate: number
}> {
  return new convert(path).decodeMp3(path)
}

if (import.meta.main) {
  // const path = new URL("./bad.mp3", import.meta.url).pathname
  const path = new URL("./fix.mp3", import.meta.url).pathname

  mp3_to_wav(path)
}
