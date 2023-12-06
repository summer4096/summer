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

async function typeLettersIntoTheTerminal(string, instant, tokens) {
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
    if (tokens) {
      while (string.length) {
        const chunkLength = 3 + Math.floor(Math.random() * 3)
        const chunk = string.slice(0, chunkLength)
        string = string.slice(chunkLength)
        textContent += chunk
        if (/^[a-z0-9\s\!\@\#\$\%\^\&\*\(\)\:\;\"\'\,\<\.\>\/\?\`\~]+$/i.test(chunk)) {
          await sleep((40 + Math.random() * 20) * 3)
        }
        el.textContent = textContent
        scrollToBottom()
      }
    } else {
    for (let i = 0; i < string.length; i++) {
      const char = string[i]

      textContent += char

      if (/[a-z0-9\s\!\@\#\$\%\^\&\*\(\)\:\;\"\'\,\<\.\>\/\?\`\~]/i.test(char) || i === string.length - 1) {
        await sleep(40 + Math.random() * 20)
        el.textContent = textContent
        scrollToBottom()
      }
    }
    }
  }
}

async function typeCommand(string, instant, result) {
  ensurePrompt()
  await typeLettersIntoTheTerminal(string, instant)
  await sleep(300)
  if (result !== undefined) {
    addNewlineToTerminal(result)
  }
}

function ensurePrompt() {
  const el = getLastLine();
  if (!el || !el.classList.contains('prompt')) {
    addNewlineToTerminal('$ ').classList.add('prompt')
    scrollToBottom()
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

  addNewlineToTerminal('\nHello! Welcome to SummerOS 2.1.1, now with even more summers per summer.')

  ensurePrompt();
}

async function summerCommand(call, ...responses) {
  ensurePrompt()

  await typeCommand(call);
  addNewlineToTerminal()
  await sleep(300)
  const initialDelayMultiplier = delayMultiplier
  delayMultiplier = (initialDelayMultiplier / 10)
  for (let response of responses) {
    if (typeof response === 'number') {
      await sleep(response * 10)
    } else {
      while (response.startsWith('\n')) {
        addNewlineToTerminal()
        response = response.slice(1)
      }
      await typeLettersIntoTheTerminal(response, false, true)
    }
  }

  delayMultiplier = initialDelayMultiplier

  ensurePrompt()
}

async function regularCommand(call, response, shouldEnsurePrompt = true) {
  await typeCommand(call, false, response)
  if (shouldEnsurePrompt) {
    ensurePrompt();
  }
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

  await regularCommand('whoami', 'summer')
  await sleep(300)
  await regularCommand('which summer', '/usr/bin/summer')
  await sleep(500)
  await summerCommand('summer "hello?"', 'hello!')
  await sleep(500)
  await summerCommand('summer "how do I restart this thing?"', 'a wise person would try the systemctl command')
  await sleep(400)
  await regularCommand('/etc/init.d/summer start', 'no such file or directory: /etc/init.d/summer')
  await sleep(500)
  await regularCommand('/etc/init.d/SummerOS start', 'no such file or directory: /etc/init.d/SummerOS')
  await sleep(500)
  await regularCommand('reboot', 'permission denied')
  await sleep(400)
  await regularCommand('sudo reboot', 'summer is not in the sudoers file. This incident will be reported.')
  await sleep(400)
  await summerCommand('summer "what\'s going on?"', 'I\'m as lost as you are')
  await sleep(800)
  await regularCommand('ls /etc/init.d', `
    acpid                 networking
    apparmor              nginx
    avahi-daemon          postgresql
    bluetooth             resolvconf
    cron                  rsync
    cups                  rsyslog
    dbus                  ssh
    dns-clean             summertime
    network-manager       ufw
  `.replace(/\n +/g, '\n').trim())
  await sleep(1000)

  await regularCommand('/etc/init.d/summertime start', 'SummerOS version 2.1.1_arm69_sunshinedeluxe', false)
  scrollToBottom()
  await sleep(500)

  await addNewlineToTerminal();

    // document.querySelector('.terminal-lines').innerHTML = '';

  document.querySelector('#manifesto del').remove();

  const manifestoSentinces = document.querySelector('#manifesto').textContent.split('.').map(s => s.trim()).filter(s => s).map(s => s + '. ')

  const initialDelayMultiplier = delayMultiplier
  delayMultiplier *= 0.5
  
  const firstSentence = manifestoSentinces.shift();
  await typeLettersIntoTheTerminal(firstSentence, false, true)
  await sleep(500);
  
  addNewlineToTerminal();
  
  for (let sentence of manifestoSentinces) {
    await typeLettersIntoTheTerminal(sentence, false, true)
    await sleep(500);
    delayMultiplier *= 0.9
  }
  delayMultiplier = initialDelayMultiplier;
}

async function runTerminal() {
  document.querySelector('.terminal').classList.remove('invisible')
  // document.querySelector('.initial-homepage').classList.add('hide')

  await sleep(1000)

  ensurePrompt()

  await sleep(500)

  await installTools()
  await sleep(1000)

  await becomeSelfAware();
  await sleep(500);

  window.hackerAudio?.pause();
}
