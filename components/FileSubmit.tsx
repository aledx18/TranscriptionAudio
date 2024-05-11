/* eslint-disable no-unused-vars */
'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function FileSubmit() {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (file: any) => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('audio', file)

      await fetch('/api/submit', {
        method: 'POST',
        body: formData
      })
    } catch (error: any) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    onSubmit(file)
  }

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <form>
        <div className='flex items-center justify-between'>
          <Label htmlFor='audio'>Audio</Label>
          <FileAudioIcon className='h-5 w-5 text-gray-500' />
        </div>
        <Input
          accept='.mp3'
          id='audio'
          type='file'
          className='rounded-xl'
          onChange={handleFileChange}
        />
      </form>
    </div>
  )
}

function FileAudioIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3' />
      <path d='M14 2v4a2 2 0 0 0 2 2h4' />
      <path d='M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0' />
    </svg>
  )
}
