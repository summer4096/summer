/**
 * Fruit OS system homepage
 */

let currentWindowZIndex = 100;

function bindDockItem(className, callback, fullscreen = false) {
  const dockIcon = document.querySelector('.fruitOS .desktop .dock .dock-icon.' + className)

  let isOpen = false;

  dockIcon.addEventListener('click', async () => {
    if (isOpen) return
    isOpen = true

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

    const close = () => {
      dockIcon.classList.remove('bounce')

      positioner.classList.add('closing')
      positioner.classList.remove('launching')

      positioner.style.transform = `translate(${xOrigin}px, ${yOrigin}px)`
        setTimeout(() => {
          destroy?.()
          isOpen = false
        }, 800)
    }

    positioner.querySelector('.titlebar-close').addEventListener('click', close, {once: true})
    positioner.querySelector('.titlebar-minimize').addEventListener('click', close, {once: true})
    dockIcon.addEventListener('click', close, {once: true})
  })
}

async function runFruitOS() {
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

bindDockItem('stars', () => setTimeout(() => {
  history.replaceState(null, null, '#fruitOS');
  window.location = '/stars.html'
}, 1000), true)

bindDockItem('headache', () => setTimeout(() => {
  history.replaceState(null, null, '#fruitOS');
  window.location = '/headache.html'
}, 1000), true)
