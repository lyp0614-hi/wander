export type TripBrief = {
  destination: string;
  duration: string;
  budget: string;
  mood: string;
};

export const TRIP_BRIEF_KEY = "wander.tripBrief";

const TRIP_BRIEF_EVENT = "wander:trip-brief-change";

/** 把 /create 的四题答案存进浏览器，供 /plans 读取。 */
export function saveTripBrief(brief: TripBrief) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(TRIP_BRIEF_KEY, JSON.stringify(brief));
    window.dispatchEvent(new Event(TRIP_BRIEF_EVENT));
  } catch {
    // 无痕模式等写不进去的情况：忽略，页面会提示重新填写
  }
}

/** 供 useSyncExternalStore 订阅：同一标签页靠自定义事件，跨标签页靠 storage 事件。 */
export function subscribeTripBrief(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(TRIP_BRIEF_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(TRIP_BRIEF_EVENT, onStoreChange);
  };
}

/**
 * 快照只返回原始字符串，保证引用稳定、避免重复渲染。
 * undefined 表示还没读到（服务端渲染 / 水合中）。
 */
export function getTripBriefSnapshot(): string | null | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    return window.localStorage.getItem(TRIP_BRIEF_KEY);
  } catch {
    return null;
  }
}

export function getServerTripBriefSnapshot(): string | null | undefined {
  return undefined;
}

export function parseTripBrief(raw: string | null | undefined): TripBrief | null {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;

    const record = parsed as Record<string, unknown>;
    const read = (key: keyof TripBrief) =>
      typeof record[key] === "string" ? (record[key] as string).trim() : "";

    return {
      destination: read("destination"),
      duration: read("duration"),
      budget: read("budget"),
      mood: read("mood"),
    };
  } catch {
    return null;
  }
}

export function hasTripBrief(brief: TripBrief) {
  return Boolean(
    brief.destination || brief.duration || brief.budget || brief.mood
  );
}