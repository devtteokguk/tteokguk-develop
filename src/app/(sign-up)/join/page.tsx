'use client'
import Image from 'next/image'
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { iconArrow, iconCloseCircle } from '../../../../public/images/icons';
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
// 상태 Enum
const StepStatus = {
  INITIAL: 'stepInitial',
  IN_PROGRESS: 'stepInProgress',
  COMPLETE: 'stepComplete',
}
export default function JoinPage() {
  const iptSt = 'w-full px-0 py-4 rounded-0 font-lg text-gr-900 border-t-0 border-x-0 border-b-1 bg-transparent placeholder:text-[#ADADAD] placeholder:font-lg caret-pr-500 focus:outline-none'
  const invalidSt = 'border-b-[#FF0000]'
  const validSt = 'border-b-[#ADADAD]'
  const [isStepBtnActive, setIsStepBtnActive] = useState(false)
  const [step, setStep] = useState({
      current : 2,
      status : [StepStatus.INITIAL, StepStatus.INITIAL, StepStatus.INITIAL]
    }
  )
  // 사용자 닉네임 상태, 상태변경 핸들러
  const [userName, setUserName] = useState('')
  const [isValidName, setIsValidName] = useState(true)
  const userNameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value
    if (/^[^\s~`!@#$%\^&*()+=\[\]\\';,./{}|\\":<>\?_-]*$/.test(typedValue)) {
      setIsValidName(true)
      setUserName(typedValue);
    }else{
      setIsValidName(false)
    }
  }
  const deleteNameOnClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setUserName('')
  }

  const navBtnOnClickHandler = (curr:number, dire:string) => {
    if(dire === 'prev'){
      if(curr !== 0){
        setStep(prevStep => ({
          ...prevStep,
          current: prevStep.current - 1
        }))
        setIsStepBtnActive(false)
      }
    }else{
      if(curr !== 2){
        setStep(prevStep => ({
          ...prevStep,
          current: prevStep.current + 1
        }))
        setIsStepBtnActive(false)
      }
    }
  }

  useEffect(()=>{
    if(userName.length > 0){
      if(userName.length <= 8){
        //입력 중 상태, 다음 단계 가능 상태
        setStep(prevStep => ({
          ...prevStep,
          status: [
            ...prevStep.status.slice(0, step.current),
            StepStatus.IN_PROGRESS,
            ...prevStep.status.slice(step.current + 1),
          ],
        }))
      }else if(userName.length === 8){
        //입력 완료. 다음 단계 가능 상태
        setStep(prevStep => ({
          ...prevStep,
          status: [
            ...prevStep.status.slice(0, step.current),
            StepStatus.COMPLETE,
            ...prevStep.status.slice(step.current + 1),
          ],
        }))
        setIsValidName(true)
      }else {
        // 8 보다 큰 경우
        // 경고창 빨개지고 마지막 글자 절삭
      }
    }else{
      // 못 넘어감. 입력하라고 알려줘야함.
      setStep(prevStep => ({
        ...prevStep,
        status: [
          ...prevStep.status.slice(0, step.current),
          StepStatus.INITIAL,
          ...prevStep.status.slice(step.current + 1),
        ],
      }))
    }
  },[userName])
  useEffect(()=>{
    console.log(">>>>>", step.current)
    console.log(">>>>>", step.status)
    if(step.status[step.current] === StepStatus.IN_PROGRESS || step.status[step.current] === StepStatus.COMPLETE){
      setIsStepBtnActive(true)
    }else{
      setIsStepBtnActive(false)
    }
  },[step])
  return (
    <div>
      {/* 상단 영역 */}
      <div className={'flex mt-[-12px]'}>
        <div className={step.current===0?'pl-0 pr-24 py-12 invisible':'pl-0 pr-24 py-12'} onClick={()=>{navBtnOnClickHandler(step.current, 'prev')}}>
          <Image src={iconArrow} alt="왼쪽을 가르키는 화살표 이미지" width={24} height={24} />
        </div>
        <div className={'flex gap-6 items-center  ml-[calc(50%-56px)]'}>
          <div className={step.current===0?'w-8 h-8 rounded-full bg-pr-300':'w-8 h-8 rounded-full bg-gr-100'}></div>
          <div className={step.current===1?'w-8 h-8 rounded-full bg-pr-300':'w-8 h-8 rounded-full bg-gr-100'}></div>
          <div className={step.current===2?'w-8 h-8 rounded-full bg-pr-300':'w-8 h-8 rounded-full bg-gr-100'}></div>
        </div>
      </div>
      {/* 컨텐츠 영역 */}
      <div>
        {/* step 0 */}
        <div className={step.current===0?'flex flex-col gap-38':'hidden'}>
          <div className={'flex flex-col gap-4'}>
            <h1 className={'font-xl text-gr-900'}>내 떡국에 표시될 <br />닉네임을 만들어 주세요</h1>
            <h2 className={isValidName?'font-xs text-[#ADADAD]':'font-xs text-[#FF0000]'}>최대 8자 / 공백, 특수기호 불가</h2>
          </div>
          <div className={'relative'}>
            <Input
              type={'text'}
              placeholder={'닉네임을 입력해 주세요'}
              maxLength={8}
              className={isValidName?`${iptSt}${validSt}`:`${iptSt}${invalidSt}`}
              onChange={(e)=>(userNameOnChangeHandler(e))}
              value={userName}/>
            <div className={userName.length>0?'absolute right-0 top-4 w-fit':'hidden'} onClick={deleteNameOnClickHandler}>
              <Image src={iconCloseCircle} alt="인풋 내용 삭제 버튼 이미지" width={20} height={20}/> 
            </div>
          </div>
        </div>
        {/* step 1 */}
        <div className={step.current===1?'flex flex-col gap-38':'hidden'}>
          <div className={'flex flex-col gap-4'}>
            <h1 className={'font-xl text-gr-900'}>캐릭터를 선택해주세요</h1>
            <h2 className={isValidName?'font-xs text-[#ADADAD]':'font-xs text-[#FF0000]'}>최대 8자 / 공백, 특수기호 불가</h2>
          </div>
          <div className={'relative'}>
            <Input
              type={'text'}
              placeholder={'닉네임을 입력해 주세요'}
              maxLength={8}
              className={isValidName?`${iptSt}${validSt}`:`${iptSt}${invalidSt}`}
              onChange={(e)=>(userNameOnChangeHandler(e))}
              value={userName}/>
            <div className={userName.length>0?'absolute right-0 top-4 w-fit':'hidden'} onClick={deleteNameOnClickHandler}>
              <Image src={iconCloseCircle} alt="인풋 내용 삭제 버튼 이미지" width={20} height={20}/> 
            </div>
          </div>
        </div>
        {/* step 2 */}
        <div className={step.current===2?'flex flex-col gap-38':'hidden'}>
          <div className={'flex flex-col gap-4'}>
            <h1 className={'font-xl text-gr-900'}>니떡국 내떡국<br />서비스 이용에 동의해 주세요</h1>
          </div>
          <div className={'relative flex flex-col gap-y-20'}>
            <div className={'flex items-center w-full gap-10 py-16 pl-20 bg-gr-100 rounded-4 h-52'}>
              <Checkbox id='termsAll' className={'w-20 h-20 rounded-full bg-center border-0 bg-[url(/images/icons/iconCheckCircleBefore.png)] bg-white'} />
              <Label htmlFor='termsAll'>필수 약관 전체 동의</Label>
            </div>
            <div className={'flex flex-col gap-y-22'}>
              <div className={'flex items-center w-full gap-10 pl-20'}>
                <Checkbox id='terms1' className={'w-20 h-20 rounded-full bg-center border-0 bg-[url(/images/icons/iconCheckCircleBefore.png)] bg-white'} />
                <Label htmlFor='terms1'>(필수) 만 14세 이상입니다.</Label>
              </div>
              <div className='flex items-center w-full gap-10 pl-20'>
                <Checkbox id='terms2' className={'w-20 h-20 rounded-full bg-center border-0 bg-[url(/images/icons/iconCheckCircleBefore.png)] bg-white'} />
                <Label htmlFor='terms2'>(필수) 서비스 이용 약관에 동의합니다.</Label>
              </div>
              <div className='flex items-center w-full gap-10 pl-20'>
                <Checkbox id='terms3' className={'w-20 h-20 rounded-full bg-center border-0 bg-[url(/images/icons/iconCheckCircleBefore.png)] bg-white'}/>
                <Label htmlFor='terms3'>(필수) 개인정보 수집이용에 동의합니다.</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 하단 영역 */}
      <div>
        <div className="fixed bottom-0 left-0 w-full h-117">
          <div className={`mx-auto flex h-full min-w-320 max-w-575 justify-center bg-bg px-20 pt-16`}>
            <Button 
              size="full"
              className={'font-semibold text-red-800 border bg-pr-500 text-17 leading-22 disabled:bg-[#D9D9D9]'}
              onClick={()=>{navBtnOnClickHandler(step.current, 'next')}}
              disabled={!isStepBtnActive}>
              {step.current === 2? '완료':'다음'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}