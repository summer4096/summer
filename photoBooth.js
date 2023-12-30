const selfieButton = document.querySelector('.photo-booth .selfie-button')

bindDockItem('photo-booth', async function photoBooth() {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  })

  const videoElement = document.querySelector('.photo-booth video')

  videoElement.onCanPlay = () => {
    heap.track(`fruitOS_photo_booth_permission_enabled`);
    mediaStream?.play()
  }

  videoElement.srcObject = mediaStream

  const track = mediaStream.getVideoTracks()[0];
  imageCapture = new ImageCapture(track);

  const onClick = async () => {
    heap.track(`fruitOS_photo_booth_took_photo`);
    new Audio('./camera.mp3').play()
    document.querySelector('.photo-flash').classList.remove('flashing')
    await new Promise(resolve => requestAnimationFrame(resolve))
    document.querySelector('.photo-flash').classList.add('flashing')

    const rawPhoto = await imageCapture.takePhoto()
    const url = URL.createObjectURL(rawPhoto);

    const link = document.createElement('a');
    link.download = 'SummerPhotoBooth.jpg';
    link.href = url

    link.click();
  }

  selfieButton.addEventListener('click', onClick)

  return () => {
    mediaStream?.getTracks().forEach(track => track.stop())
    selfieButton.removeEventListener('click', onClick)
  }
})
