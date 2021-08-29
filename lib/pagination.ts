export const DEFAULT_PER_PAGE = 10
const DEFAULT_PAGE_LENGTH = 5

export function paging<T>(
  items: T[],
  currentPage: number,
  perPage: number = DEFAULT_PER_PAGE,
): T[] {
  currentPage = currentPage > 1 ? currentPage : 1
  const offset = (currentPage - 1) * perPage
  const last = offset + perPage

  return items.slice(offset, last)
}

export function getTotalPages(
  totalItems: number,
  perPage: number = DEFAULT_PER_PAGE,
): number {
  return Math.ceil(totalItems / perPage)
}

export function getPagingRange(
  current: number,
  { min = 1, total = 20, length = DEFAULT_PAGE_LENGTH } = {}
) {
  if (length > total) length = total

  let start = current - Math.floor(length / 2)
  start = Math.max(start, min)
  start = Math.min(start, min + total - length)

  return Array.from({length: length}, (el, i) => start + i)
}
