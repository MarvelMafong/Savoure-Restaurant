'use client'

const ROW1 = [
  { t: 'Global Fusion', hl: false }, { t: '✦', icon: true },
  { t: 'New York City', hl: false }, { t: '✦', icon: true },
  { t: 'Fine Dining', hl: true },    { t: '✦', icon: true },
  { t: 'Savoure NYC', hl: false },   { t: '✦', icon: true },
  { t: 'Tasting Menu', hl: false },  { t: '✦', icon: true },
  { t: "Chef's Table", hl: true },   { t: '✦', icon: true },
  { t: 'Reservations Open', hl: false }, { t: '✦', icon: true },
  { t: '14 Countries', hl: false },  { t: '✦', icon: true },
]
const ROW2 = [
  { t: 'Craft & Passion', hl: false }, { t: '◆', icon: true },
  { t: 'Farm to Table', hl: true },    { t: '◆', icon: true },
  { t: 'Est. 2019', hl: false },       { t: '◆', icon: true },
  { t: 'Michelin Recognized', hl: true }, { t: '◆', icon: true },
  { t: 'Tribeca NYC', hl: false },     { t: '◆', icon: true },
  { t: 'Every Plate · A Story', hl: true }, { t: '◆', icon: true },
  { t: 'Seasonal Menu', hl: false },   { t: '◆', icon: true },
  { t: 'Global Kitchen', hl: false },  { t: '◆', icon: true },
]

export default function Marquee() {
  const renderRow = (words: typeof ROW1) =>
    [...words, ...words].map((w, i) =>
      w.icon
        ? <span key={i} className="mq-sep">{w.t}</span>
        : <span key={i} className={`mq-word${w.hl ? ' mq-word-hl' : ''}`}>{w.t}</span>
    )

  return (
    <div className="mq-section">
      <div className="mq-track-wrap">
        <div className="mq-row">
          <div className="mq-inner mq-inner-l">{renderRow(ROW1)}</div>
        </div>
        <div className="mq-row">
          <div className="mq-inner mq-inner-r">{renderRow(ROW2)}</div>
        </div>
      </div>
    </div>
  )
}