import BAD from "./bad.json" with { type: "json" }
import { Buffer } from "node:buffer"

const data = Buffer.from(BAD.audio, "base64")

await Deno.writeFile("bad.mp3", data)
