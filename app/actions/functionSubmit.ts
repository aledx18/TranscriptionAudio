type Props = {
  formData: any
  key: string
}

export async function onSubmitAction({ formData, key }: Props) {
  console.log('formData', formData)

  try {
    if (!key) {
      return 'error key'
    }
    // const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    //   headers: {
    //     Authorization: 'Bearer asddas'
    //   },
    //   method: 'POST',
    //   body: formData
    // })
    // const data = await res.json()
    console.log('hola')
    return 'retorno file transcription'
  } catch (error: any) {
    console.log(error)
    return error
  } finally {
    console.log('final')
  }
}
