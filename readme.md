# issue

- bad.json was retrieved from ws tts
- bad.mp3 is the mp3 file from the base64 encoding (see write.ts)
- bad.mp3 web playback is fine, however when dealing with the file inside unity
  for placback and using node av (and mp3) packages for procesing, it fails (see
  to_wav.ts)
  ```
  error: Uncaught (in promise) Error: bad main_data_begin pointer
      at Layer3.decode (file:///Users/devidw/Library/Caches/deno/npm/registry.npmjs.org/mp3/0.1.0/src/layer3.js:112:19)
      at MP3Frame.decode (file:///Users/devidw/Library/Caches/deno/npm/registry.npmjs.org/mp3/0.1.0/src/frame.js:31:13)
      at Class.readChunk (file:///Users/devidw/Library/Caches/deno/npm/registry.npmjs.org/mp3/0.1.0/src/decoder.js:40:19)
      at Class.Decoder.decode (file:///Users/devidw/Library/Caches/deno/npm/registry.npmjs.org/av/0.4.9/src/decoder.js:72:23)
      at Class.<anonymous> (file:///Users/devidw/Library/Caches/deno/npm/registry.npmjs.org/av/0.4.9/src/decoder.js:46:26)
      at Class.EventEmitter.emit (file:///Users/devidw/Library/Caches/deno/npm/registry.npmjs.org/av/0.4.9/src/core/events.js:64:12)
      at Class.readChunk (file:///Users/devidw/Library/Caches/deno/npm/registry.npmjs.org/mp3/0.1.0/src/demuxer.js:168:18)
      at BufferSource.<anonymous> (file:///Users/devidw/Library/Caches/deno/npm/registry.npmjs.org/av/0.4.9/src/demuxer.js:49:19)
      at BufferSource.EventEmitter.emit (file:///Users/devidw/Library/Caches/deno/npm/registry.npmjs.org/av/0.4.9/src/core/events.js:64:12)
      at BufferSource.loop (file:///Users/devidw/Library/Caches/deno/npm/registry.npmjs.org/av/0.4.9/src/sources/buffer.js:49:21)
  ```

## cause?

ffmpeg inspection indicates several problems:

```bash
ffmpeg -i bad.mp3 -f null -
```

> [mp3 @ 0x158e2bcb0] Format mp3 detected only with low score of 25, misdetection possible!

> [mp3 @ 0x158e2bcb0] Skipping 114 bytes of junk at 0.

> [mp3 @ 0x158e2bcb0] Estimating duration from bitrate, this may be inaccurate

## re-encoding

re-rencoding with ffmpeg solves the issues, but is an expensive operation

```bash
ffmpeg -i bad.mp3 -c:a libmp3lame -y fix.mp3
```

## Qs

- q: elevenlabs should provide valid mp3 output that does not cause the issues
  demonstrated?

- q (unrelated): why is elevenlabs base64 encoding audio instead of binary transfer via web
  sockets, which would result in smaller data size thus lower latency
