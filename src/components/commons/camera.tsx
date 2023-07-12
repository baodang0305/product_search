'use client'

import React, { useEffect, useRef, useState } from 'react';
import { renderVideoOnCanvas } from '@/utils/object'

export interface CameraMethods {
  takeSnapshot: () => Promise<any>;
}
interface CameraProps {
  width?: number;
  height?: number;
}

const Camera: React.ForwardRefRenderFunction<CameraMethods, CameraProps> = (props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    let stream: MediaStream | null;
    const startCamera = async () => {
      try {
        const constraints: MediaStreamConstraints = {
          video: { facingMode: 'environment' }, audio: false
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera()
    return () => {
      const stopCamera = () => {
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => {
            track.stop();
          });
        }
      }
      stopCamera()
    };
  }, []);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isMobileDevice = /Mobi/i.test(userAgent) || /Android/i.test(userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  // Expose methods or properties to the parent component
  React.useImperativeHandle(ref, () => ({
    takeSnapshot: () => {
      return new Promise((resolve, reject) => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        if (video && canvas && context) {
          canvas.width = containerRef.current!.clientWidth;
          canvas.height = containerRef.current!.clientHeight;


          renderVideoOnCanvas(canvas, videoRef.current)

          // If mobile using back camera, no need flip
          // if (!isMobile) {
          //   // Flip the canvas horizontally
          //   context?.save();
          //   context?.scale(-1, 1);
          //   context?.drawImage(canvas, -canvas.width, 0, canvas.width, canvas.height);
          //   context?.restore();
          // }

          canvas.toBlob((res) => {
            if (!res) reject('Has error')
            resolve({ buffer: res, base64: canvas.toDataURL() })
          }, 'image/png');
        }
      })
    }
  }));
  return (
    <div ref={containerRef} className="w-full h-full">
      <video 
        ref={videoRef} autoPlay playsInline 
        style={{ ...(!isMobile ? { transform: 'scaleX(1)' } : {}) }}
        className='w-full h-full object-cover'
        />
    </div>
  )
};

export default React.forwardRef(Camera);