'use client'

import { useEffect, useRef, useState } from 'react'
import saveAs from 'file-saver'
import { BottomButton } from './common'
import Image from 'next/image'
import html2canvas from 'html2canvas' // Import html2canvas
import SaveImage from './SaveImage'
import { iconClose, iconError } from '../../public/images/icons'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function SaveAsImageHandler() {
  const divRef = useRef<HTMLDivElement>(null)
  const [capturedImage, setCapturedImage] = useState('')
  const [screenshot, setScreenshot] = useState(false)
  const [isKakao, setIsKakao] = useState(false)
  // const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleDownload = async () => {
    setScreenshot(true)

    setTimeout(async () => {
      if (!divRef.current) return

      try {
        const div = divRef.current

        const canvas = await html2canvas(div, { logging: true })

        canvas.toBlob((blob) => {
          if (blob !== null) {
            const imageURL = URL.createObjectURL(blob)

            saveAs(blob, '떡국.png')
            const isKakaoTalkInAppBrowser = /KAKAOTALK/i.test(window.navigator.userAgent)
            if (isKakaoTalkInAppBrowser) {
              setIsKakao(true)
              setScreenshot(false)
              setCapturedImage(imageURL)
              return
            } else {
              toast({ description: '사진이 저장되었습니다.' })
            }
          }
        })
      } catch (error) {
        console.error('Error converting div to image:', error)
      } finally {
        // setTimeout(() => {
        //   setScreenshot(false)
        // }, 3000)
      }
    }, 0)
  }

  useEffect(() => {}, [])

  const basic = !screenshot && !isKakao && !capturedImage
  return (
    <>
      {basic && (
        <div className=" relative mx-[-20px] mt-[-32px] h-dvh bg-[url(/images/avatar/savePhoto.png)] bg-cover bg-center p-20">
          <div className="flex flex-row-reverse">
            <Link href={'/host'}>
              <Image src={iconClose} width={24} height={24} alt="iconClose" className=" m-12 " />
            </Link>
          </div>
          <div className="font-xl ">
            <p>덕담 남기기 완료!</p>
            <p>사진을 저장하고 공유해 보세요.</p>
          </div>
          <div className="font-sm flex flex-row items-center gap-4 text-pr-500">
            <Image src={iconError} alt="iconError" width={18} height={18} className="py-2" />
            <p>현재 페이지는 벗어나면 다시 돌아올 수 없어요!</p>
          </div>
          <div className=" absolute left-[41%] top-[59.50%] ">
            <div className="relative h-57 w-71 lg:h-90 lg:w-120">
              <Image src={'/images/garnishes/dumpling.png'} layout="fill" alt="garnishes" />
            </div>
          </div>
          <div className="relative">
            <SaveImage type="basic" />
          </div>

          <BottomButton
            bgColor="bg-transperant"
            fullBtnName="사진 공유"
            fullBtnClick={handleDownload}
          />
        </div>
      )}
      {screenshot && (
        <div className="mx-[-20px] mt-[-32px] ">
          <div
            ref={divRef}
            className="relative flex h-dvh bg-[url(/images/avatar/photo.png)] bg-cover bg-center p-20"
          >
            <div className=" absolute left-[41%] top-[52.50%] ">
              <div className="relative h-57 w-71 lg:h-90 lg:w-120">
                <Image src={'/images/garnishes/dumpling.png'} layout="fill" alt="garnishes" />
              </div>
            </div>
            <SaveImage type="snapShot" />
          </div>
          <Image
            src={iconClose}
            width={24}
            height={24}
            alt="iconClose"
            className=" absolute right-20 top-20 m-12"
            onClick={() => setScreenshot(false)}
          />
        </div>
      )}
      {isKakao && capturedImage && (
        <div className="relative mx-[-20px] mt-[-32px] h-dvh">
          <Image src={capturedImage} alt="snap-shot" layout="fill" />
          <Image
            src={iconClose}
            width={24}
            height={24}
            alt="iconClose"
            className=" absolute right-20 top-20 m-12"
            onClick={() => setIsKakao(false)}
          />
        </div>
      )}
    </>
  )
}
