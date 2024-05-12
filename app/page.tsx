import FileSubmit from '@/components/FileSubmit'
import FooterPlayerAudio from '@/components/footerPlayerAudio'
import TranscriptionCall from '@/components/transcriptionCall'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-1 flex flex-col items-center justify-center'>
        <div className='flex flex-col justify-center items-center gap-4 rounded-xl mt-5 lg:mt-0 lg:mx-20'>
          <FileSubmit />
          <TranscriptionCall />
        </div>
      </main>
      <FooterPlayerAudio />
    </div>
  )
}
