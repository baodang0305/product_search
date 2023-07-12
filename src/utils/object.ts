interface ImageSize {
  width: number,
  height: number
}
const computeNewImageSize = (
  { maxRatio, src, des }: 
  { maxRatio: boolean, src: ImageSize, des: ImageSize }
) => {
  // Calculate the width and height ratios
  const widthRatio = src.width / des.width;
  const heightRatio = src.height / des.height;

  // Choose the minimum ratio to maintain the image's aspect ratio
  const ratio = maxRatio 
    ? Math.max(widthRatio, heightRatio) 
    : Math.min(widthRatio, heightRatio);

  // Compute the new image dimensions
  const width = des.width * ratio;
  const height = des.height * ratio;

  return { width, height };
}

export const renderVideoOnCanvas = (canvas: HTMLCanvasElement, video: HTMLVideoElement) => {
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    // scale and horizontally center the camera image
    const renderSize = computeNewImageSize({
      maxRatio: true,
      src: { width: canvas.width, height: canvas.height },
      des: { width: video.videoWidth, height: video.videoHeight }
    });
    const xOffset = (canvas.width - renderSize.width) / 2;
    const yOffset = (canvas.height - renderSize.height) / 2;
    context?.drawImage(video, xOffset, yOffset, renderSize.width, renderSize.height);
  }
}