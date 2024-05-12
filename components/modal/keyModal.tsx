'use client'

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

export default function KeyModal() {
  const { isOpen, close } = ExitModal()

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Enter your key</DialogTitle>
          <DialogDescription>
            from Open Ai to transcribe your audio
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mb-4'>
          <div className='flex gap-x-2 w-full'>
            <Input className='rounded-xl' placeholder='Enter your key' />
            <Button
              variant='colorMode'
              className='rounded-xl'
              onClick={() => {
                close()
              }}>
              Submit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
