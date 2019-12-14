const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const WINDOW_WIDTH = Math.max(Math.random() / 2, .2) * SCREEN_WIDTH
const WINDOW_HEIGHT = WINDOW_WIDTH / 1.8
const OUTER_WINDOW_WIDTH = WINDOW_WIDTH + window.outerWidth - window.innerWidth
const OUTER_WINDOW_HEIGHT = WINDOW_HEIGHT + window.outerHeight - window.innerHeight
const VELOCITY = 50
const MARGIN = 10
const TICK_LENGTH = 50

const VIDEOS = [
  'assets/videos/MiracleWave.m4v',
  'assets/videos/WaterBlueNewWorld.mp4',
  'assets/videos/AwakenThePower.mp4',
  'assets/videos/HandInHand.mp4',
]

const TITLES =[
  'Miracle Wave',
  'Water Blue New World',
  'Awaken the Power',
  'Hand in Hand!',
]

//only runs in opened windows
if (window.opener) {
  const bgElem = document.getElementById('background')
  bgElem.parentNode.removeChild(bgElem)

  let vx = VELOCITY * (Math.random() - .5)
  let vy = VELOCITY * (Math.random() - .5)

  const videoElement = document.createElement('video')

  let index = Math.floor(Math.random() * VIDEOS.length)

  document.title = TITLES[index]

  videoElement.src = VIDEOS[index]
  videoElement.autoplay = true
  videoElement.loop = true
  videoElement.width = `${WINDOW_WIDTH}`
  videoElement.height = `${WINDOW_HEIGHT}`

  document.body.appendChild(videoElement)
  
  window.setInterval(() => {
    window.resizeTo(OUTER_WINDOW_WIDTH, OUTER_WINDOW_HEIGHT)
    const x = window.screenX
    const y = window.screenY

    if (x < MARGIN) {
      vx = Math.abs(vx)
    } else if (x + WINDOW_WIDTH > SCREEN_WIDTH - MARGIN) {
      vx = Math.abs(vx) * -1
    }

    if (y < MARGIN) {
      vy = Math.abs(vy)
    } else if (y + WINDOW_HEIGHT > SCREEN_HEIGHT - MARGIN) {
      vy = Math.abs(vy) * -1
    }

    window.moveBy(vx, vy)
  }, TICK_LENGTH)

  window.onunload = () => {
    if (!window.opener.closed) {
      window.opener.onCloseWindow(window)
    }
  }
}

// Parent and child window code
const wins = []

document.addEventListener('click', openWindow)

function openWindow ()  {
  focusWindows()

  const win = window.open(window.location.pathname, '', `width=${WINDOW_WIDTH}, height=${WINDOW_HEIGHT}, left=0, top=0`)

  wins.push(win)
}

function focusWindows () {
  wins.forEach(win => win.focus())
}

function onCloseWindow (win) {
  const i = wins.indexOf(win)
  if (i >= 0) wins.splice(i, 1)
}
