let inInitialHomepage = true

function flickerSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms * delayMultiplier))
}

function flickerOn() {
  document.querySelector('.initial-homepage').classList.add('uncanny')
}
function flickerOff() {
  document.querySelector('.initial-homepage').classList.remove('uncanny')
}

async function quickFlicker() {
  flickerOn()
  await sleep(50)
  flickerOff()
}

async function slowFlicker() {
  flickerOn()
  await sleep(500)
  flickerOff()
}
async function slowerFlicker() {
  flickerOn()
  await sleep(2000)
  flickerOff()
}

async function doubleFlicker() {
  await quickFlicker()
  await sleep(100)
  await quickFlicker()
}

async function flickerLoop() {
  while (true) {
    if (!inInitialHomepage) return
    await sleep(1000)
    await slowerFlicker()
    await sleep(500)
    await doubleFlicker()
    await sleep(1500)
    await quickFlicker()
    await sleep(2000)
    await slowFlicker()
    await sleep(1000)
  }
}

async function dialogBounceLoop() {
  const dialog = document.querySelector('.initial-homepage .dialog')
  const scale = Math.min(2, (window.innerWidth - 16) / dialog.clientWidth)
  document.querySelector('.dialog').style.transform = `scale(${scale})`
 
  await sleep(1000)
  dialog.classList.add('visible')

  while (true) {
    if (!inInitialHomepage) return
    const rect = dialog.getBoundingClientRect()
    const maxX = window.innerWidth - rect.width
    const maxY = window.innerHeight - rect.height
    const newX = (Math.random() * maxX) / scale
    const newY = (Math.random() * maxY) / scale
    dialog.style.transform = `scale(${scale}) translate(${newX}px, ${newY}px)`
    await sleep(10000)
  }
}

const scrollDownTimeout = setTimeout(() => {
  document.querySelector('.initial-homepage').scrollTo(0, window.innerHeight - 50)
}, 5000)

async function runInitialHomepage() {
  const initialHomepage = document.querySelector('.initial-homepage');
  initialHomepage.scrollBy(0, 100) // sneak peak
  
  initialHomepage.addEventListener('scroll', () => {
    if (initialHomepage.scrollTop + initialHomepage.clientHeight + 10 >= initialHomepage.scrollHeight) {
      initialHomepage.scrollTop = 0;
      heap.track('scroll_wrap');
    }
    if (initialHomepage.scrollTop > 200) {
      clearTimeout(scrollDownTimeout)
      initialHomepage.style.scrollBehavior = 'auto'
    }
  })


  const zalgoElements = Array.from(document.querySelectorAll('.initial-homepage .zalgo'))
  for (let el of zalgoElements) {
    let words = el.innerText.split(' ')
    const wordSpans = words.map((word, index) => {
      const span = document.createElement('span')
      span.className = 'zalgo'
      span.innerText
      if (index >= 0) {
        span.innerText = ' ' + word
      }
      return span
    })
    el.replaceWith(...wordSpans)
  }

  const zalgoWordElements = Array.from(document.querySelectorAll('.initial-homepage .zalgo'))
  for (let el of zalgoWordElements) {
    // create two span elements that contain the zalgo text
    const zalgoText = el.innerText
    const plainText = zalgoText.replace(/[^a-zA-Z ]/g, '')
    const zalgoTextSpan = document.createElement('span')
    const plainTextSpan = document.createElement('span')
    zalgoTextSpan.innerText = zalgoText
    zalgoTextSpan.className = 'zalgo-text'
    plainTextSpan.innerText = plainText
    plainTextSpan.className = 'plain-text'
    el.innerHTML = ''
    el.appendChild(zalgoTextSpan)
    el.appendChild(plainTextSpan)
  }

  flickerLoop()

  dialogBounceLoop()
  
  await new Promise(resolve => {
    Array.from(
      document.querySelectorAll('.initial-homepage a, .initial-homepage .zalgo, .initial-homepage .dialog button')
    ).forEach(
      el => el.addEventListener('click', e => {
        inInitialHomepage = false
        e.preventDefault()
        e.stopPropagation()
        resolve()
      })
    )
  })

  heap.track('windows_xp_error_message');

  document.querySelector('.backdrop').classList.add('visible')

  new Audio('./error.mp3').play()

  await new Promise(resolve => setTimeout(resolve, 200))

  const errorDialog = document.querySelector('.backdrop .dialog')

  errorDialog.classList.add('visible')

  const buttons = Array.from(document.querySelectorAll('.backdrop .dialog button'))
  await new Promise(resolve => buttons.forEach(el => el.addEventListener('click', resolve)))

  window.hackerAudio = new Audio('./hacker.mp3')
  window.hackerAudio.play();

  await new Promise(resolve => setTimeout(resolve, 50))

  errorDialog.classList.remove('visible')

  await new Promise(resolve => setTimeout(resolve, 200))
}
