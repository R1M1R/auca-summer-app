export interface DiaryWatchEntry {
  id:        string
  updatedAt: number
}

export interface DiaryWatchConfig {
  projectId:     string
  apiKey:        string
  sessionStart:  number
  knownEntries:  DiaryWatchEntry[]
  notifyTitle:   string
  notifyBody:    string
}

const POLL_MS = 3 * 60_000

export function buildDiaryWatchConfig(
  entries: Array<{ id: string; updatedAt: Date | null }>,
  projectId: string,
  apiKey: string,
  notifyTitle: string,
  notifyBody: string,
): DiaryWatchConfig {
  return {
    projectId,
    apiKey,
    sessionStart: Date.now(),
    knownEntries: entries.map((e) => ({
      id:        e.id,
      updatedAt: e.updatedAt?.getTime() ?? 0,
    })),
    notifyTitle,
    notifyBody,
  }
}

export async function startDiaryWatchInServiceWorker(config: DiaryWatchConfig): Promise<void> {
  if (!('serviceWorker' in navigator)) return

  try {
    const reg = await navigator.serviceWorker.ready
    const worker = reg.active ?? navigator.serviceWorker.controller
    if (!worker) return

    worker.postMessage({
      type: 'DIARY_WATCH_START',
      config,
      pollMs: POLL_MS,
    })
  } catch {
    /* SW not ready */
  }
}

export function stopDiaryWatchInServiceWorker(): void {
  const worker = navigator.serviceWorker?.controller
  worker?.postMessage({ type: 'DIARY_WATCH_STOP' })
}
