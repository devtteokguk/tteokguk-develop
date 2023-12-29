'use client'

import { usePathname } from 'next/navigation'
import { BottomButton } from './common'
import { Toaster } from './ui/toaster'
import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from '@/hooks/use-toast'

const ShareButton = () => {
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({ description: 'URL 복사가 완료되었습니다.' })

      // alert('복사 성공!')
    } catch (error) {
      alert('복사 실패!')
    }
  }
  const pathname = usePathname()

  return (
    <>
      {pathname === '/my' ? (
        <BottomButton
          fullBtnName="내떡국 공유하기"
          fullBtnClick={() => handleCopyClipBoard('https://develop-tteokguk.vercel.app/니떡국')}
        />
      ) : (
        <BottomButton
          split="twice"
          smallBtnName="내떡국"
          fullBtnName="덕담 남기기"
          smallBtnHref="/my"
          fullBtnHref="/dsda/write"
        />
      )}
    </>
  )
}

export default ShareButton
