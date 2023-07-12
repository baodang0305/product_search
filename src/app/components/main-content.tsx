'use client'
import React, { useRef, useState, useEffect } from 'react';
import Camera, { CameraMethods } from '@/components/commons/camera'
import { uploadFileToS3 } from '@/utils/s3'
import { CameraIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'

interface MainProps {}

const MainContent: React.FC<MainProps> = () => {
  const cameraRef = useRef<CameraMethods>(null);
  const [step, setStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>('');
  const [imgSnapshot, setImgSnapshot] = useState<string>('');
  const [timeEnd, setTimeEnd] = useState<number>(0)

  const handleSnapshot = async () => {
    try {
      setIsLoading(true)
      const { buffer } = await cameraRef.current?.takeSnapshot()
      const s3Url = await uploadFileToS3({ key: `product-search/${new Date().getTime()}.png`, contentType: 'image/png', file: buffer })
      setImgSnapshot(s3Url)
      setStep(2)
    } catch (error) {
      
    } finally {
      setIsLoading(false)
    }
  }
  const handleSearchImage = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/search-product?imgUrl=${imgSnapshot}&lang=ja`);
      const data = await response.json();
      if (data?.error) setSearchData(data.error)
      else { setSearchData(data.data) }
      setStep(3)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false)
    }
  }
  const handleCancel = () => {
    setStep(1)
  }
  const preventPinchZooming = () => {
    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
    });
    document.addEventListener("gesturechange", function (e) {
      e.preventDefault();
    });
    document.addEventListener("gestureend", function (e) {
      e.preventDefault();
    });
  }
  const destroyPinchZooming = () => {
    document.removeEventListener("gesturestart", () => {});
    document.removeEventListener("gesturechange", () => {});
    document.removeEventListener("gestureend", () => {});
  }

  useEffect(() => {
    preventPinchZooming()
    return () => { destroyPinchZooming() };
  }, []);

  return (
    <main className="max-w-[414px] shadow h-[100svh] mx-auto">
      <div className='h-[calc(100svh-68px)]'>
        {step === 1 
          ? <Camera ref={cameraRef}/>
          : step === 2
            // eslint-disable-next-line @next/next/no-img-element
            ? <img
                src={imgSnapshot}
                alt="alt"
                className='w-full h-auto max-h-full object-contain'
              />
            : <div className="w-full h-full flex justify-center items-center" style={{ wordBreak: 'break-word' }}>{searchData}</div>
        }
      </div>
      <div className="h-[68px] bg-yellow-400 flex justify-center items-center">
        {step === 1 
          ? <button 
              type="button" disabled={isLoading}
              className="text-yellow-700 border-none hover:bg-yellow-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
              onClick={handleSnapshot}
            >
              {isLoading
                ? <svg aria-hidden="true" role="status" className="inline w-5 h-5 text-yellow-700 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                :  <CameraIcon className="w-6 h-6"/>
              }
            </button>
          : step === 2
              ? <button 
                  type="button" disabled={isLoading}
                  className="text-yellow-700 border border-yellow-700 hover:bg-yellow-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                  onClick={handleSearchImage}
                >
                  {isLoading
                      ? <svg aria-hidden="true" role="status" className="inline w-5 h-5 text-yellow-700 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                      : <MagnifyingGlassIcon className="w-6 h-6"/>
                  }
                </button>
              : <button 
                  type="button"
                  className="text-yellow-700 border-none hover:bg-yellow-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                  onClick={handleCancel}
                >
                  <XMarkIcon className="w-6 h-6"/>
                </button>
        }
      </div>
    </main>
  )
}

export default MainContent