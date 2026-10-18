// Draws the wrap-around can label. Used as the 3D texture and as the flat image on flavor cards.
export function drawLabel(f, w = 1024, h = 640) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const g = c.getContext('2d')
  const cx = w / 2

  g.fillStyle = f.can.body
  g.fillRect(0, 0, w, h)

  g.fillStyle = f.can.rim
  g.fillRect(0, 0, w, 96)
  g.fillRect(0, h - 96, w, 96)
  g.fillStyle = 'rgba(255,255,255,.2)'
  g.fillRect(0, 96, w, 4)
  g.fillRect(0, h - 100, w, 4)

  g.textAlign = 'center'
  g.fillStyle = f.can.ink
  g.font = 'italic 700 74px Georgia, serif'
  g.fillText('Velvetspoon', cx, 240)

  g.globalAlpha = 0.7
  g.font = '600 24px Arial, sans-serif'
  g.fillText('250 g dessert in a can', cx, 282)
  g.globalAlpha = 1

  const tw = 300
  g.fillStyle = f.can.tagBg
  g.beginPath()
  g.roundRect ? g.roundRect(cx - tw / 2, 310, tw, 54, 6) : g.rect(cx - tw / 2, 310, tw, 54)
  g.fill()
  g.fillStyle = '#fff'
  g.font = '700 30px Arial, sans-serif'
  g.fillText(f.can.tag, cx, 349)

  g.strokeStyle = f.can.ink
  g.lineWidth = 4
  g.beginPath()
  g.arc(cx - 120, 438, 30, 0, Math.PI * 2)
  g.stroke()

  g.fillStyle = f.can.ink
  let x = cx - 50
  for (let i = 0; i < 28; i++) {
    const bw = (i * 7) % 4 + 1.5
    g.fillRect(x, 408, bw, 62)
    x += bw + 2.5
  }
  return c
}
