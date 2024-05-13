/* eslint-disable no-undef */
'use client'

import KeyModal from './modal/keyModal'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FileAudio2Icon } from 'lucide-react'
import { ExitModal } from '@/app/store/useExitModal'
import { Button } from './ui/button'

export default function FileSubmit() {
  const { open } = ExitModal()
  const [formData, setFormData] = useState<FormData | null>(null)

  const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const file: File = (target.files as FileList)[0]

    const data = new FormData()
    data.append('file', file)
    data.append('model', 'whisper-1')
    data.append('language', 'es')
    data.append('response_format', 'verbose_json')
    data.append('timestamp_granularities', 'word')
    setFormData(data)
  }

  return (
    <div className='grid max-w-sm items-center gap-1.5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='audio'>Audio</Label>
        <FileAudio2Icon className='h-4 w-4' />
      </div>
      <div className='flex flex-col lg:flex-row items-center gap-x-2 lg:gap-y-0 gap-y-2'>
        <Input
          accept='.mp3,.wav,.ogg,.webm,.mp4'
          id='audio'
          type='file'
          className='rounded-xl text-white bg-primary/35 cursor-pointer'
          onChange={handleFileChange}
        />
        <Button
          variant='colorMode'
          className='rounded-xl'
          onClick={formData ? open : undefined}>
          Submit
        </Button>
      </div>
      <KeyModal formData={formData} />
    </div>
  )
}
