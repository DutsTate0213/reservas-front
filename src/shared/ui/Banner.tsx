interface BannerProps {
  kind: 'error' | 'info'
  message: string
}

export function Banner({ kind, message }: BannerProps) {
  return <div className={`banner banner-${kind}`}>{message}</div>
}
