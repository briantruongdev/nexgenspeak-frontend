export function toValue<T>(r: MaybeRefOrGetter<T> | undefined): T | undefined {
  if (r === undefined) return undefined
  if (typeof r === 'function') return (r as () => T)()
  if (typeof (r as { value?: T }).value !== 'undefined') return (r as { value: T }).value
  return r as T
}
