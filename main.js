const screenWidth = window.screen.availWidth;
const screenHeight = window.screen.availHeight;
const minimumImageWidth = 300;
const windowWidth = Math.max(
  Math.random() * 0.8 * screenWidth,
  minimumImageWidth
);
const windowHeight = windowWidth / 1.8;
const outerWindowWidth = windowWidth + window.outerWidth - window.innerWidth;
const outerWindowHeight =
  windowHeight + window.outerHeight - window.innerHeight;
const velocityBase = 15;
const minimumVelocity = 8;
const maximumVelocity = 20;
const speedChangeInterval = 100;
const margin = 10;
const tick = 50;

const videoLinks = [
  'assets/videos/MiracleWave.m4v',
  'assets/videos/WaterBlueNewWorld.mp4',
  'assets/videos/AwakenThePower.mp4',
  'assets/videos/HandInHand.mp4'
];

const videoTitles = [
  'Miracle Wave',
  'Water Blue New World',
  'Awaken the Power',
  'Hand in Hand!'
];

this.wins = [];
this.usedVideoIndexes = [];
const parentWindow = window.opener;

//only runs in opened windows
if (parentWindow) {
  //point all child windows wins to parent window wins array
  wins = parentWindow.wins;
  usedVideoIndexes = parentWindow.usedVideoIndexes;

  const bgElem = document.getElementById('background');
  bgElem.parentNode.removeChild(bgElem);

  const vxModifier = Math.random() - 0.5;
  let vx = velocityBase * vxModifier;
  if (Math.abs(vx) < minimumVelocity) {
    vx = vx > 0 ? minimumVelocity : -1 * minimumVelocity;
  }

  const vyModifier = Math.random() - 0.5;
  let vy = velocityBase * vyModifier;
  if (Math.abs(vy) < minimumVelocity) {
    vy = vy > 0 ? minimumVelocity : -1 * minimumVelocity;
  }

  const videoElement = document.createElement('video');

  let index;

  do {
    index = Math.floor(Math.random() * videoLinks.length);
  } while (
    usedVideoIndexes.length < videoTitles.length &&
    usedVideoIndexes.includes(index)
  );
  this.index = index;

  document.title = videoTitles[index];
  videoElement.src = videoLinks[index];

  usedVideoIndexes.push(index);

  videoElement.autoplay = true;
  videoElement.loop = true;
  videoElement.width = `${windowWidth}`;
  videoElement.height = `${windowHeight}`;

  document.body.appendChild(videoElement);

  window.setInterval(() => {
    window.resizeTo(outerWindowWidth, outerWindowHeight);
    const x = window.screenX;
    const y = window.screenY;

    if (x < margin) {
      vx = Math.abs(vx);
    } else if (x + outerWindowWidth > screenWidth - margin) {
      vx = Math.abs(vx) * -1;
    }

    if (y < margin) {
      vy = Math.abs(vy);
    } else if (y + outerWindowHeight > screenHeight - margin) {
      vy = Math.abs(vy) * -1;
    }

    window.moveBy(vx, vy);
  }, tick);

  window.setInterval(() => {
    vx *= 1 + (Math.random() - 0.5);
    if (Math.abs(vx) < minimumVelocity) {
      vx = vx > 0 ? minimumVelocity : -minimumVelocity;
    }
    if (Math.abs(vx) > maximumVelocity) {
      vx = vx > 0 ? maximumVelocity : -maximumVelocity;
    }
    vy *= 1 + (Math.random() - 0.5);
    if (Math.abs(vy) < minimumVelocity) {
      vy = vy > 0 ? minimumVelocity : -minimumVelocity;
    }
    if (Math.abs(vy) > maximumVelocity) {
      vy = vy > 0 ? maximumVelocity : -maximumVelocity;
    }
  }, speedChangeInterval);

  window.onunload = () => {
    if (!window.opener.closed) {
      window.opener.onCloseWindow(window);
    }
  };
}

// Parent and child window code
document.addEventListener('click', openWindow);

function openWindow() {
  focusWindows();

  const win = window.open(
    window.location.pathname,
    '',
    `width=${windowWidth}, height=${windowHeight}, left=0, top=0`
  );

  wins.push(win);
}

function focusWindows() {
  wins.forEach((win) => win.focus());
}

function onCloseWindow(win) {
  const i = wins.indexOf(win);
  if (i >= 0) {
    wins.splice(i, 1);
    usedVideoIndexes.splice(usedVideoIndexes.indexOf(win.index, 1));
  }
}
