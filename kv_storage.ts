import Kv from "lume/cms/storage/kv.ts";

const kv = await Deno.openKv();
export const kvStorage = new Kv({ kv })
