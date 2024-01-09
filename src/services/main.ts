import { GarnishType, GuestTteokgukType, HostTteokgukType } from '@/types/MainPageTypes'
import { cookies } from 'next/headers'

const baseUrl = process.env.NEXT_PUBLIC_API_KEY

export async function getGuestTteokguk(userId: string): Promise<GuestTteokgukType> {
  // ! 이거 왜 함수 바깥에서 못쓰는거지..?ㅠㅠ
  const token = cookies().get('token')?.value
  const res = await fetch(`${baseUrl}/api/v1/tteokguk/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('failed')
  }

  return res.json()
}

export async function getHostTteokguk(): Promise<HostTteokgukType> {
  const token = cookies().get('token')?.value
  const res = await fetch(`${baseUrl}/api/v1/tteokguk/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  })
  if (!res.ok) {
    throw new Error('failed')
  }
  const { data } = await res.json()
  return data
}

export async function getGarnishes(userId: string, pageNum: number): Promise<GarnishType> {
  const res = await fetch(`${baseUrl}/api/v1/tteokguk/${userId}/garnishes?page=${pageNum}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('failed')
  }
  const { data } = await res.json()
  return data
}
