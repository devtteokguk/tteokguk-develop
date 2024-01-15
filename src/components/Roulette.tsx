'use client'

import { useState, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { rouletteResultState } from '@/store/WriteAtom'
import { OptionGarnishes } from '../../data/garnishRoulette'
import Image from 'next/image'
import { Button } from './ui/button'
import { iconLocation } from '../../public/images/icons'
import { rouletteBoard } from '../../public/images/favicon'

export default function Roulette() {
  const [rouletteResult, setRouletteResult] = useRecoilState(rouletteResultState) // 룰렛 결과값
  const [disabled, setDisabled] = useState(false)

  const imageRef = useRef<HTMLImageElement>(null)

  // * 룰렛 회전 함수
  const rotate = () => {
    const image = imageRef.current
    if (!image) return

    setDisabled(true) // 버튼 1회만 클릭 가능하도록 state 설정

    image.style.transition = 'initial'
    image.style.transform = 'initial'

    const TOTAL_ROTATION_TIME = 3000 // 룰렛 회전에 소요되는 시간
    const totalDegrees = 3600 // 총 회전할 각도
    const randomIdx = Math.floor(Math.random() * OptionGarnishes.length) // 랜덤 선택된 아이템의 인덱스

    // OptionGarnishes 배열의 proportion을 기반으로 부채꼴(arcurate) 각도 계산
    const arc = OptionGarnishes.map((item) => (item.proportion / 100) * 360)

    // 랜덤 선택된 고명까지 회전시킬 각도 계산
    let rotationAngle = 0
    for (let i = 0; i <= randomIdx; i++) {
      rotationAngle += arc[i] // 0번째 인덱스부터 randomIdx까지 해당 각도값 누적
    }
    rotationAngle += 81 // 룰렛 보정 각도

    image.style.transition = `transform ${TOTAL_ROTATION_TIME}ms ease-out`
    image.style.transform = `rotate(-${totalDegrees + rotationAngle}deg)`

    // 회전 후 랜덤 선택된 고명 설정
    setTimeout(() => {
      setRouletteResult(OptionGarnishes[randomIdx]['id'])
    }, TOTAL_ROTATION_TIME)
  }

  return (
    <div className="relative">
      <Image
        src={iconLocation}
        alt="선택된 고명을 가리키는 아이콘"
        width="25"
        height="28"
        className="absolute left-127 top-3 z-10"
      />
      <Image
        ref={imageRef}
        src={rouletteBoard}
        height={270}
        width={270}
        className="mt-20"
        alt=""
        priority
      />
      <Button
        onClick={rotate}
        disabled={disabled}
        className={`
          absolute left-90 top-107 z-10 h-90 w-90 rounded-full font-soyoThin font-bold text-white
          ${disabled ? 'bg-gr-100' : 'bg-pr-500'}
        `}
      >
        룰렛
        <br />
        돌리기!
      </Button>
    </div>
  )
}
