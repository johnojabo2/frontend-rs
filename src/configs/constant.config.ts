export const constant = {
  port: +(import.meta.env.PORT as unknown as number) || 5173,
  devURL: import.meta.env.VITE_DEV_APP_URL as string,
  liveURL: import.meta.env.VITE_LIVE_APP_URL as string,
  FLWPUBKTest: import.meta.env.VITE_FLWPUBKTEST as string,
  uploadLogo: import.meta.env.VITE_UPLOAD_LOGO as string,
  appURL: import.meta.env.VITE_APP_URL as string,
};
