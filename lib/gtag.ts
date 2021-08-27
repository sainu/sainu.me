// Ref: https://panda-program.com/posts/nextjs-google-analytics

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== ''

// PVを測定する
export const pageview = (path: string) => {
  window.gtag('config', GA_ID, { page_path: path })
}

type EventProps = {
  action: string
  category: string
  label: string
  value?: string
}

// GAイベントを発火させる
export const event = ({ action, category, label, value = '' }: EventProps) => {
  if (!existsGaId) return

  window.gtag('event', action, {
    event_label: label,
    event_category: category,
    value: value,
  })
}
