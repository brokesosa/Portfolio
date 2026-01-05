import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const firebaseConfig = {
    apiKey: Netlify.env.get("VITE_API_KEY"),
    authDomain: Netlify.env.get("VITE_AUTH_DOMAIN"),
    projectId: Netlify.env.get("VITE_PROJECT_ID"),
    storageBucket: Netlify.env.get("VITE_STORAGE_BUCKET"),
    messagingSenderId: Netlify.env.get("VITE_MESSAGING_SENDER_ID"),
    appId: Netlify.env.get("VITE_APP_ID"),
    measurementId: Netlify.env.get("VITE_MEASUREMENT_ID"),
  };

  return new Response(JSON.stringify(firebaseConfig), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
};

export const config: Config = {
  path: "/api/firebase-config",
};
