/**
 * Fruit OS system homepage
 */
async function runFruitOS() {
  document.querySelector('.material').classList.add('hide')
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

  await sleep(5500)

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

  await sleep(1000)

  const dockIcon = document.querySelector('.fruitOS .desktop .dock .dock-icon:first-child')

  const dockIconRect = dockIcon.getBoundingClientRect();
  const xOrigin = dockIconRect.left + (dockIconRect.width / 2)
  const yOrigin = dockIconRect.top + (dockIconRect.height / 2)

  const desktopMainRect = document.querySelector('.desktop .main').getBoundingClientRect();
  const xTarget = desktopMainRect.width / 2
  const yTarget = desktopMainRect.height / 2

  dockIcon.classList.add('bounce')

  const positioner = document.querySelector('.fruitOS .window-positioner')
  positioner.style.transform = `translate(${xOrigin}px, ${yOrigin}px)`

  await sleep(4000);

  positioner.classList.add('launching')
  positioner.style.transform = `translate(${xTarget}px, ${yTarget}px)`

  await sleep(600)

  photoBooth()
}
