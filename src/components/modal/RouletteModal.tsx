'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRecoilState } from 'recoil'
import { chosenGarnishState, rouletteResultState } from '@/store/WriteAtom'
import Image from 'next/image'
import { RouletteModalProps } from '@/types/WriteTypes'
import { Button } from '../ui/button'
import { iconClose } from '../../../public/images/icons'
import { garnishes } from '../../../data/garnishes'

export function RouletteModal({ onClose }: RouletteModalProps) {
  const [mounted, setMounted] = useState(false)
  const [chosenGarnish, setChosenGarnish] = useRecoilState(chosenGarnishState)
  const [rouletteResult, setRouletteResult] = useRecoilState(rouletteResultState)

  // todo 룰렛 기능 완성되면 해당 결과값 담기도록 세팅
  const setResult = (clickedValue: string) => setRouletteResult(clickedValue)
  const doneRoulette = () => {
    setChosenGarnish(rouletteResult)
    onClose()
  }

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const element = (
    <div className="absolute top-0 h-full w-full">
      <div className="flex-center mx-auto h-full min-w-320 max-w-575 flex-grow bg-gr-100 px-20">
        <section className="h-500 w-full rounded-5 bg-white p-22">
          <Button onClick={onClose} className="float-right">
            <Image src={iconClose} alt="팝업 종료를 위한 엑스 모양 아이콘" width={24} height={24} />
          </Button>
          <div className="flex-center clear-right flex-col">
            <h1 className="text-22 font-semibold leading-28">랜덤 고명 뽑기</h1>
            <p className="font-xs pt-8">룰렛에 대한 설명</p>
            <div className="flex-center w-full flex-col gap-4 py-20">
              {garnishes.map(
                (garnish, idx) =>
                  garnish.type === 'option' && (
                    <Button
                      key={idx}
                      className={rouletteResult === garnish.id ? 'border-3 border-pr-500 p-2' : ''}
                      onClick={() => setResult(garnish.id)}
                    >
                      {garnish.id}
                    </Button>
                  ),
              )}
            </div>
          </div>
          <Button size="full" onClick={doneRoulette}>
            완료
          </Button>
        </section>
      </div>
    </div>
  )

  return mounted ? (
    createPortal(element, document.getElementById('modal-root') as HTMLElement)
  ) : (
    <></>
  )
}
