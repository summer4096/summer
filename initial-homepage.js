async function runInitialHomepage() {
  const initialHomepage = document.querySelector('.initial-homepage');
  initialHomepage.addEventListener('scroll', () => {
    if (initialHomepage.scrollTop + initialHomepage.clientHeight + 10 >= initialHomepage.scrollHeight) {
      initialHomepage.scrollTop = 0;
      gtag('event', 'scroll_wrap');
    }
  })

  document.querySelector('.dialog').style.transform = `scale(${Math.min(2, (window.innerWidth - 16) / document.querySelector('.dialog').clientWidth)})`

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

  gtag('event', 'windows_xp_error_message');

  document.querySelector('.backdrop').classList.add('visible')

  new Audio('./error.mp3').play()

  await new Promise(resolve => setTimeout(resolve, 200))

  document.querySelector('.dialog').classList.add('visible')

  const buttons = Array.from(document.querySelectorAll('.dialog button'))
  await new Promise(resolve => buttons.forEach(el => el.addEventListener('click', resolve)))

  window.hackerAudio = new Audio('./hacker.mp3')
  window.hackerAudio.play();

  await new Promise(resolve => setTimeout(resolve, 50))

  document.querySelector('.dialog').classList.remove('visible')

  await new Promise(resolve => setTimeout(resolve, 200))
}
