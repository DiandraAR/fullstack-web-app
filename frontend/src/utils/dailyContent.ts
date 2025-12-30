type DailyConfig<T> = {
  key: string
  limit: number
  emptyMessage: string
}

type DailyResult<T> = {
  data?: T
  message?: string
  locked: boolean
}

export async function getDailyContent<T>(
  config: DailyConfig<T>,
  fetcher: () => Promise<T>
): Promise<DailyResult<T>> {
  const storageKey = `daily-${config.key}`
  const today = new Date().toISOString().split('T')[0]

  const stored = localStorage.getItem(storageKey)

  if (stored) {
    const parsed = JSON.parse(stored)

    if (parsed.date === today && parsed.count >= config.limit) {
      return {
        locked: true,
        message: config.emptyMessage,
      }
    }
  }

  const data = await fetcher()

  const nextCount =
    stored && JSON.parse(stored).date === today
      ? JSON.parse(stored).count + 1
      : 1

  localStorage.setItem(
    storageKey,
    JSON.stringify({
      date: today,
      count: nextCount,
    })
  )

  return {
    locked: false,
    data,
  }
}


  