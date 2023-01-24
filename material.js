/**
 * Basic homepage
 */
async function runMaterial() {
  await new Promise(resolve => document.querySelector('.material-cta button').addEventListener('click', resolve))

  document.querySelector('.material-backdrop').classList.add('visible')

  const buttons = Array.from(document.querySelectorAll('.material-dialog button'))

  await new Promise(resolve => buttons.forEach(el => el.addEventListener('click', resolve)))
}