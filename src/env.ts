import { z } from "zod";

const envType = z.object({
  MONO_API_KEY: z.string(),
});

const safeEnv = envType.safeParse(process.env);

if (!safeEnv.success) {
  throw safeEnv.error;
}

export const env = safeEnv.data;
