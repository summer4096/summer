/**
 * Fruit OS system homepage
 */

let currentWindowZIndex = 1000;

function bindDockItem(className, callback, fullscreen = false) {
  const dockIcon = document.querySelector('.fruitOS .desktop .dock .dock-icon.' + className)

  let isOpen = false;
  let isOpening = false;
  let isClosing = false;

  dockIcon.addEventListener('click', async () => {
    if (isOpen || isOpening || isClosing) return

    heap.track(`fruitOS_app_launched_${className}`);
    isOpen = true
    isOpening = true

    const dockIconRect = dockIcon.getBoundingClientRect();
    const xOrigin = dockIconRect.left + (dockIconRect.width / 2)
    const yOrigin = dockIconRect.top + (dockIconRect.height / 2)
  
    const desktopMainRect = document.querySelector(fullscreen ? 'body' : '.desktop .main').getBoundingClientRect();
    const xTarget = desktopMainRect.width / 2
    const yTarget = desktopMainRect.height / 2
  
    dockIcon.classList.add('bounce')
  
    const positioner = document.querySelector('.fruitOS .window-positioner.' + className)
    positioner.style.transform = `translate(${xOrigin}px, ${yOrigin}px)`
    positioner.style.zIndex = currentWindowZIndex;
    currentWindowZIndex++;
    positioner.onclick = () => {
      positioner.style.zIndex = currentWindowZIndex;
      currentWindowZIndex++;
    }

    const [_, destroy] = await Promise.all([
      sleep(500),
      callback?.()
    ])

    positioner.classList.add('launching')
    positioner.style.transform = `translate(${xTarget}px, ${yTarget}px)`

    const close = async () => {
      if (!isOpen || isOpening || isClosing) return
      heap.track(`fruitOS_app_closed_${className}`);
      dockIcon.classList.remove('bounce')

      positioner.classList.add('closing')
      positioner.classList.remove('launching')

      positioner.style.transform = `translate(${xOrigin}px, ${yOrigin}px)`
      await sleep(800)
        destroy?.()
        isOpen = false
        isClosing = false
        positioner.classList.remove('closing')
    }

    await sleep(800)
    isOpening = false

    positioner.querySelector('.titlebar-close')?.addEventListener('click', close, {once: true})
    positioner.querySelector('.titlebar-minimize')?.addEventListener('click', close, {once: true})
    dockIcon.addEventListener('click', close, {once: true})

    if (fullscreen) {
      setTimeout(close, 2200)
    }
  })
}

async function runFruitOS() {
  heap.track('fruitOS_opened');
  document.querySelector('.initial-homepage').classList.add('hide')
  document.querySelector('.terminal').classList.add('hide')

  document.querySelector('.fruitOS').classList.remove('hide')

  const bootScreen = document.querySelector('.fruitOS .boot-screen')

  await sleep(2000)

  bootScreen.classList.add('stage-1')

  await sleep(500)

  bootScreen.classList.add('stage-2')

  new Audio('./fruit.mp3').play();

  await sleep(500)

  const progress = bootScreen.querySelector('.progress-bar .fill')
  progress.style.width = '100%'

  await sleep(3500)

  bootScreen.classList.remove('stage-2')

  await sleep(500)

  bootScreen.classList.remove('stage-1')

  await sleep(1000)

  bootScreen.classList.add('stage-3')

  await sleep(250)

  bootScreen.classList.remove('stage-3')

  await sleep(1000)

  bootScreen.classList.add('hide')

  const desktop = document.querySelector('.fruitOS .desktop')
  desktop.classList.remove('hide')

  await sleep(500)

  document.querySelector('.fruitOS .desktop .dock').classList.add('visible')
}

async function bootImmediately() {
  document.querySelector('.initial-homepage').classList.add('hide')
  document.querySelector('.terminal').classList.add('hide')
  document.querySelector('.fruitOS .boot-screen').classList.add('hide')

  const desktop = document.querySelector('.fruitOS .desktop')
  desktop.classList.remove('hide')
  document.querySelector('.fruitOS .desktop .dock').classList.add('visible')

  document.querySelector('.fruitOS').classList.remove('hide')
}

bindDockItem('zombo-com', () => {
  document.querySelector('.zombo-com iframe').src = 'https://zombo.com'

  return () => {
    document.querySelector('.zombo-com iframe').src = 'about:blank'
  }
})

bindDockItem('expedition', () => {
  document.querySelector('.expedition iframe').src = '/?rand=' + Math.random()

  return () => {
    document.querySelector('.expedition iframe').src = 'about:blank'
  }
})

bindDockItem('stars', () => {
  document.querySelector('.stars iframe').src = '/stars.html?rand=' + Math.random()

  return () => {
    document.querySelector('.stars iframe').src = 'about:blank'
  }
})

bindDockItem('headache', () => {
  document.querySelector('.headache iframe').src = '/headache.html?rand=' + Math.random()

  return () => {
    document.querySelector('.headache iframe').src = 'about:blank'
  }
})

bindDockItem('textedit', () => {
  document.querySelector('.textedit .window-main .note-content').innerText = document.querySelector('#manifesto').textContent.trim();
})

setInterval(() => {
  const date = new Date().toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'})
  const time = new Date().toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})
  document.querySelector('.dropdown.clock .menu-bar-item').innerText = date + ' ' + time
}, 1000)