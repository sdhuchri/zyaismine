export type LogAction =
  | "page.visit"
  | "gallery.photo_viewed"
  | "letter.generated"
  | "chat.message"
  | "cake.candle_blown"
  | "cake.all_blown"
  | "valentine.opened"
  | "valentine.revealed"
  | "wishes.viewed"
  | "letter.copied";

export async function log(action: LogAction, detail?: string) {
  try {
    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, detail }),
    });
  } catch {
    // silent fail — logging should never break the app
  }
}
