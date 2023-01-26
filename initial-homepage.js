async function runInitialHomepage() {
  await new Promise(resolve => {
    Array.from(
      document.querySelectorAll('.initial-homepage a, .initial-homepage .zalgo')
    ).forEach(
      el => el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        resolve()
      })
    )
  })

  document.querySelector('.backdrop').classList.add('visible')

  const buttons = Array.from(document.querySelectorAll('.dialog button'))

  await new Promise(resolve => buttons.forEach(el => el.addEventListener('click', resolve)))

  document.querySelector('.backdrop').classList.remove('visible')
}
