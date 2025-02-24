'use client'

import { toast } from '@/hooks/useToast'
import { paginationType } from '@/types/MainPageTypes'
import { debounce } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

const PaginationEntire = ({ pageSize, pageParam }: paginationType) => {
  const params = useSearchParams()
  const router = useRouter()

  const [page, setPage] = useState<number>(Number(params.get('page')) || 1)

  // const currentPage: number = Number(params.get('page'))
  const [currentPage, setCurrentPage] = useState(Number(params.get('page')))

  const pagesize = pageSize ? pageSize : 1
  // const movePage = (flag?: string) => {
  //   if ((flag === 'prev' && currentPage <= 1) || (flag === 'next' && currentPage >= pagesize)) {
  //     return
  //   }
  //   const movePageNum = flag === 'prev' ? currentPage - 1 : currentPage + 1

  //   setPage(movePageNum)
  // }
  const movePage = debounce((flag?: string) => {
    if ((flag === 'prev' && currentPage <= 1) || (flag === 'next' && currentPage >= pagesize)) {
      return
    }
    const movePageNum = flag === 'prev' ? currentPage - 1 : currentPage + 1
    setCurrentPage(movePageNum)
    // setPage(movePageNum)
  }, 500)
  useEffect(() => {
    if (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > pagesize) {
      toast({ description: '유효한 페이지 번호가 아닙니다.' })
      setCurrentPage(1)
      return
    }
    setPage(currentPage)
  }, [])

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage])

  useEffect(() => {
    router.push(`/${pageParam}?page=${page}`)
  }, [page])

  return (
    <nav className="w-full">
      <ul className="flex-center gap-5 text-14">
        <li>
          <Button onClick={() => movePage('prev')} className=" h-50 w-40">
            &lt;
          </Button>
        </li>
        <li>{currentPage}</li>
        <li>/</li>
        <li>{pageSize} 그릇</li>
        <li>
          <Button onClick={() => movePage('next')} className="  h-50 w-40 ">
            &gt;
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default PaginationEntire
