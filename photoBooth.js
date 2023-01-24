async function photoBooth() {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  })

  const videoElement = document.querySelector('.photo-booth video')

  videoElement.onCanPlay = () => {
    mediaStream?.play()
  }

  videoElement.srcObject = mediaStream

  const track = mediaStream.getVideoTracks()[0];
  imageCapture = new ImageCapture(track);

  document.querySelector('.photo-booth .selfie-button').addEventListener('click', async () => {
    const rawPhoto = await imageCapture.takePhoto()
    const url = URL.createObjectURL(rawPhoto);

    const link = document.createElement('a');
    link.download = 'SummerPhotoBooth.jpg';
    link.href = url

    link.click();
  })
}

async function takeSelfie() {
  document.querySelector('.photo-flash').classList.remove('flashing')
  await new Promise(resolve => requestAnimationFrame(resolve))
  document.querySelector('.photo-flash').classList.add('flashing')
}

document.querySelector('.photo-booth .selfie-button').addEventListener('click', takeSelfie)
