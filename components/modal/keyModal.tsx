'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ExitModal } from '@/app/store/useExitModal'
import { Input } from '@/components/ui/input'
import { onSubmitAction } from '@/app/actions/functionSubmit'
import { Segment } from '@/app/actions/responseInterface'
import { usePlayerStore } from '@/app/store/playerStore'

type Props = {
  formData: FormData | null
}

export default function KeyModal({ formData }: Props) {
  const { setUrl, setConversation } = usePlayerStore()
  const { isOpen, close } = ExitModal()
  const [key, setKey] = useState<string>('')
  const [error, setError] = useState<string>('')

  async function onsubmit() {
    if (key) {
      const url = URL.createObjectURL(formData?.get('file') as File)
      const res = await onSubmitAction({ formData, key })
      if (res.error) {
        setError(res.error)
      } else {
        setUrl(url)
        const data = res.segments.map((segment: Segment, i: number) => ({
          content: segment.text,
          start: segment.start,
          end: segment.end,
          role: i % 2 === 0 ? 'user' : 'agent',
          id: segment.id
        }))
        setConversation(data)
        close()
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Enter your key</DialogTitle>
          <DialogDescription>
            From Open Ai to transcribe your audio
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mb-4'>
          <div className='flex gap-x-2 w-full'>
            <Input
              className='rounded-xl'
              placeholder='Enter your key'
              onChange={(e) => setKey(e.target.value)}
            />
            <Button
              variant='colorMode'
              className='rounded-xl'
              onClick={onsubmit}>
              Transcript file
            </Button>
          </div>
        </DialogFooter>
        <p className='text-sm'>{error}</p>
      </DialogContent>
    </Dialog>
  )
}
