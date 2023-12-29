import MettEdit from '@/components/MettEdit'
import ShareButton from '@/components/ShareButton'
import { getTteokguk, getTteokguks } from '@/services/main'
import Image from 'next/image'
import { DdayIcon, myPage } from '../../../public/images/index'
import Link from 'next/link'
import { PaginationEntire } from '@/components/common'

type Props = {
  params: {
    userId: string
  }
}

export default async function DishPage({ params: { userId } }: Props) {
  const 떡국 = await getTteokguk(userId)
  if (!떡국) {
    // 추후 not-found 페이지로 수정 예정
    console.log('해당떡국없음')
  }

  const garnishLocation: GarnishType = {
    0: 'top-[39px] left-[122px]',
    1: 'top-[81px] left-[51px]',
    2: 'top-[123px] left-[122px]',
    3: 'top-[81px] left-[194px]',
    4: 'top-[164px] left-[51px]',
    5: 'top-[205px] left-[122px]',
    6: 'top-[164px] left-[194px]',
  }

  return (
    <section className=" mx-[-20px] mt-[-32px] flex h-dvh justify-center bg-[url('/images/red.png')] bg-cover bg-center px-20 ">
      {/* <div className={`w-375 bg-[url('/images/${떡국?.테이블매트정보}')] bg-cover bg-center `}> */}
      <div className={` w-375  `}>
        <div className="flex flex-row items-center justify-between pb-36 pt-32 ">
          <h1 className="font-xl">{`${떡국?.nickname}님의 떡국`}</h1>
          <Link href={'/account'}>
            <Image src={myPage} width={28} height={28} alt="myPageButton" className="pb-1 pt-2" />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-sm flex-center px-15 bg-pr-100 mb-8 flex flex-row gap-1.5 rounded-2xl py-3">
            <Image width={12} height={11} src={DdayIcon} alt="D-day icon" />
            <p className="font-base text-pr-800">{`까치까치 설날 D-${떡국?.디데이}`}</p>
          </div>
          <p className="mb-5">{`${떡국?.편지총개수}개의 덕담을 받았어요!`}</p>
          <div className="h-300 w-300 mb-31 mt-19 bg-gr-200 relative rounded-full">
            {떡국?.고명정보.map((item, idx) => (
              <div
                key={item.고명식별자}
                className={` absolute text-center ${garnishLocation[idx]} flex flex-col `}
              >
                {/* <div
                  className={`h-54 w-54  rounded-full bg-[url('/images/seaweed.png')] bg-cover bg-center`}
                > */}
                <div className={`h-54 w-54 `}>
                  <Image
                    width={54}
                    height={54}
                    src={`/images/${item.고명키값}.png`}
                    alt="garnish"
                  />
                </div>
                <p className="font-xs">{item.닉네임}</p>
              </div>
            ))}

            {userId === 'my' ? (
              <div className="absolute bottom-[-52px] right-[-18px]">
                <Link href={'/change-matt	'}>
                  <MettEdit />
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>

          <PaginationEntire />
          <ShareButton />
        </div>
      </div>
    </section>
  )
}

export async function generateStaticParams() {
  const tteokguks = await getTteokguks()
  return tteokguks.map((tteokguk) => ({
    userId: tteokguk.id,
  }))
}

export interface GarnishType {
  [key: number]: string
}

export interface MattType {
  [key: string]: string
}
