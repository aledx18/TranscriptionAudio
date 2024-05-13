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
import { LoaderCircle } from 'lucide-react'

type Props = {
  formData: FormData | null
}

export default function KeyModal({ formData }: Props) {
  const { setUrl, setConversation } = usePlayerStore()
  const { isOpen, close } = ExitModal()

  const [key, setKey] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function onsubmit() {
    if (!key) return
    setLoading(true)
    const url = URL.createObjectURL(formData?.get('file') as File)

    try {
      const res = await onSubmitAction({ formData, key })
      if (res.error) {
        setError(res.error)
        setLoading(false)
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
    } catch (error) {
      console.error('Error submitting:', error)
      setError('An error occurred while submitting.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='font-medium'>
            Enter your openai api key
          </DialogTitle>
          <DialogDescription>To transcribe your audio</DialogDescription>
        </DialogHeader>
        <DialogFooter className='mb-4'>
          <div className='flex gap-x-2 w-full'>
            <Input
              className='rounded-xl focus-visible:ring-1 focus-visible:ring-primary/40 focus:ring-0'
              placeholder='Enter your key'
              onChange={(e) => setKey(e.target.value)}
            />
            <Button
              disabled={loading}
              variant='colorMode'
              className='rounded-xl'
              onClick={onsubmit}>
              {loading && (
                <LoaderCircle className='h-4 w-4 animate-spin mr-1' />
              )}
              {loading ? 'Transcribing...' : 'Transcript file'}
            </Button>
          </div>
        </DialogFooter>
        {error && <p className='text-xs text-muted-foreground'>{error}</p>}
      </DialogContent>
    </Dialog>
  )
}
