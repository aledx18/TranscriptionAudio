/* eslint-disable no-undef */
'use client'

import KeyModal from './modal/keyModal'
import { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FileAudio2Icon } from 'lucide-react'
import { ExitModal } from '@/app/store/useExitModal'
import { Button } from './ui/button'

export default function FileSubmit() {
  const { open } = ExitModal()
  const lastSelectedFile = useRef<File | null>(null)
  const [formData, setFormData] = useState<FormData | null>(null)

  const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const file: File = (target.files as FileList)[0]
    if (file !== lastSelectedFile.current) {
      lastSelectedFile.current = file

      const data = new FormData()
      if (file) {
        data.append('file', file)
        data.append('model', 'whisper-1')
        data.append('language', 'es')
        data.append('response_format', 'verbose_json')
        data.append('timestamp_granularities', 'word')
      }
      setFormData(data)
    }
  }

  function openModal() {
    if (formData && formData.get('file')) {
      open()
    }
  }

  return (
    <div className='grid max-w-sm items-center gap-1.5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='audio'>Audio</Label>
        <FileAudio2Icon className='h-4 w-4' />
      </div>
      <div className='flex flex-col lg:flex-row items-center gap-x-2 lg:gap-y-0 gap-y-2'>
        <Input
          accept='.mp3,.mp4'
          id='audio'
          type='file'
          className='rounded-xl text-white bg-primary/35 cursor-pointer'
          onChange={handleFileChange}
        />
        <Button variant='colorMode' className='rounded-xl' onClick={openModal}>
          Submit
        </Button>
      </div>
      <KeyModal formData={formData} />
    </div>
  )
}
