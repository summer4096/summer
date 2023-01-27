/**
 * Fruit OS system homepage
 */

function bindDockItem(className, callback) {
  const dockIcon = document.querySelector('.fruitOS .desktop .dock .dock-icon.' + className)

  let isOpen = false;

  dockIcon.addEventListener('click', async () => {
    if (isOpen) return
    isOpen = true

    const dockIconRect = dockIcon.getBoundingClientRect();
    const xOrigin = dockIconRect.left + (dockIconRect.width / 2)
    const yOrigin = dockIconRect.top + (dockIconRect.height / 2)
  
    const desktopMainRect = document.querySelector('.desktop .main').getBoundingClientRect();
    const xTarget = desktopMainRect.width / 2
    const yTarget = desktopMainRect.height / 2
  
    dockIcon.classList.add('bounce')
  
    const positioner = document.querySelector('.fruitOS .window-positioner.' + className)
    positioner.style.transform = `translate(${xOrigin}px, ${yOrigin}px)`
  
    await sleep(500);
  
    positioner.classList.add('launching')
    positioner.style.transform = `translate(${xTarget}px, ${yTarget}px)`
  
    callback();
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

bindDockItem('zombo-com', () => {})