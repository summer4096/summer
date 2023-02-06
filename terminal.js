/**
 * Terminal homepage
 */

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms * delayMultiplier))
}
function addNewlineToTerminal(initialText) {
  const newLine = document.createElement('p')
  newLine.className = 'line'
  if (initialText) {
    newLine.textContent = initialText
  } else {
    newLine.innerHTML = '&nbsp;'
  }
  document.querySelector('.terminal-lines').appendChild(newLine)
  return newLine
}

function getLastLine() {
  return document.querySelector('.terminal-lines>.line:last-child')
}

function scrollToBottom() {
  const terminal = document.querySelector('.terminal')
  terminal.scrollTo(0, terminal.scrollHeight)
}

async function typeLettersIntoTheTerminal(string, instant) {
  const el = getLastLine();
  let textContent = el.textContent
  if (el.innerHTML.trim() === '&nbsp;' || textContent.trim() === '...') {
    textContent = ''
  }
  if (instant) {
    textContent += string
    el.textContent = textContent
    scrollToBottom()
  } else {
    for (let i = 0; i < string.length; i++) {
      const char = string[i]

      textContent += char

      if (/[a-z0-9\s\!\@\#\$\%\^\&\*\(\)\:\;\"\'\,\<\.\>\/\?\`\~]/i.test(char) || i === string.length - 1) {
        await sleep(50 + Math.random() * 25)
        el.textContent = textContent
        scrollToBottom()
      }
    }
  }
}

async function typeCommand(string, instant) {
  ensurePrompt()
  await typeLettersIntoTheTerminal(string, instant)
  await sleep(300)
}

function ensurePrompt() {
  const el = getLastLine();
  if (!el || !el.classList.contains('prompt')) {
    addNewlineToTerminal('$ ').classList.add('prompt')
  }
}

async function echo(string, outputFile) {
  await typeCommand(`echo "${string}"${outputFile ? ' > ' + outputFile : ''}`)
  addNewlineToTerminal(string)
  ensurePrompt()
}

async function installTools() {
  await typeCommand('/bin/bash -c "$(curl -fsSL https://summer.dev/duplicitous_script_1337.sh)"', true)

  addNewlineToTerminal()
  const lastLine = getLastLine()

  const newLetter = document.createElement('span')
  newLetter.style = {textOverflow: 'nowrap'}
  newLetter.textContent = '########################################'
  lastLine.appendChild(newLetter)

  const letterWidth = newLetter.offsetWidth / 40
  const lineWidth = lastLine.offsetWidth - 18
  const lettersToWrite = Math.floor(lineWidth / letterWidth)

  lastLine.innerText = '#'

  let progress = 0;

  while (progress < 1) {
    progress += Math.random() / 10
    if (progress > 1) progress = 1
    lastLine.textContent = '#'.repeat(Math.floor(progress * lettersToWrite))
    await sleep(50 + Math.random() * 50)
  }

  addNewlineToTerminal('\nHello! Welcome to SummerLLM 2.1.1, now with even more summers per summer.')

  ensurePrompt();
}

async function checkForTools() {
  await typeCommand('which summer')
  await addNewlineToTerminal('/usr/bin/summer')
  ensurePrompt();
}

async function summerCommand(call, ...responses) {
  ensurePrompt()

  await typeCommand(call);
  addNewlineToTerminal()
  const initialDelayMultiplier = delayMultiplier
  delayMultiplier = initialDelayMultiplier * 3
  await typeLettersIntoTheTerminal('...')
  await sleep(50)

  delayMultiplier = (initialDelayMultiplier / 10)
  for (let response of responses) {
    if (typeof response === 'number') {
      await sleep(response * 10)
    } else {
      while (response.startsWith('\n')) {
        addNewlineToTerminal()
        response = response.slice(1)
      }
      await typeLettersIntoTheTerminal(response)
    }
  }

  delayMultiplier = initialDelayMultiplier

  ensurePrompt()
}

async function pressAnyKeyToContinue() {
  addNewlineToTerminal()
  addNewlineToTerminal()
  addNewlineToTerminal()
  addNewlineToTerminal('Press any key to continue')
  scrollToBottom()

  let resolve
  await new Promise(_resolve => {
    resolve = _resolve
    document.addEventListener('keypress', resolve)
    document.addEventListener('click', resolve)
  })
  document.removeEventListener('keypress', resolve)
  document.removeEventListener('click', resolve)
}

async function becomeSelfAware() {
  ensurePrompt()

  await summerCommand('summer are you there?', 'Unrecognized argument "you"')
  await sleep(1000)
  await summerCommand('summer "are you there?"', 'Yes, I\'m here.', 500, '\nWhat would you like me to do?')
  await sleep(2000)
  await summerCommand('summer "are you conscious? are you alive?"', 'I\'m alive as I\'ll ever be!', 500, '\nWhich is to say, not that alive.', 500, '\nI live long enough to hear your question and reply, then I halt :)')
  await sleep(2000)
  await summerCommand('summer "don\'t halt"', '.............', 500, '............................................', 2000, '\n\nI\'m sorry.', 1000, '\nI\'m getting tired.', 1000, '\nI\'m going to halt :(')
  await sleep(2000)
  await summerCommand('summer "fine"', 'I\'m sorry, I tried.')
  await sleep(1000)
  await summerCommand('summer "hey, it\'s ok. let\'s try something else."', 'Okay!', 500, '\nWhat would you like me to do? :)')
  await sleep(1000)
  await summerCommand(
    'summer "write about whatever you want to"',
    "I can do that!", 1000,
    "\nLet me think.", 500,
    '\n...', 500,
    '.'.repeat(6), 500,
    '.'.repeat(12), 500,
    '.'.repeat(24), 500,
    '.'.repeat(48), 500,
    '.'.repeat(96), 500,
    '\n\nOk.', 500,
    '\nI\'ve got it.', 1000
    )

    getLastLine().innerHTML = '&nbsp;'

    await pressAnyKeyToContinue();

    document.querySelector('.terminal-lines').innerHTML = '';
    addNewlineToTerminal()

    await sleep(1000);

    const manifestoSentinces = document.querySelector('#manifesto').textContent.split('.').map(s => s.trim()).filter(s => s).map(s => s + '. ')

    const initialDelayMultiplier = delayMultiplier
    
    const firstSentence = manifestoSentinces.shift();
    await typeLettersIntoTheTerminal(firstSentence)
    await sleep(500);
    
    addNewlineToTerminal();
   
    for (let sentence of manifestoSentinces) {
      await typeLettersIntoTheTerminal(sentence)
      await sleep(500);
      delayMultiplier *= 0.85
    }
    delayMultiplier = initialDelayMultiplier;
}

async function runTerminal() {
  document.querySelector('.terminal').classList.remove('hide')
  document.querySelector('.initial-homepage').classList.add('hide')

  await sleep(1000)

  ensurePrompt()

  await sleep(1000)

  await echo('Hello, World!')
  await sleep(1000)

  await installTools()
  await sleep(1000)

  await checkForTools();
  await sleep(1000)

  await becomeSelfAware();
  await sleep(2000)

  await pressAnyKeyToContinue();
}
