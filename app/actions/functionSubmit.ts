type Props = {
  formData: FormData | null
  key: string
}

export async function onSubmitAction({ formData, key }: Props) {
  if (!key) {
    return 'error key'
  }
  try {
    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      headers: {
        Authorization: `Bearer ${key}`
      },
      method: 'POST',
      body: formData
    })
    if (!res.ok) {
      const error = (await res.json()).error
      return { error: error.message }
    }
    return await res.json()
  } catch (error: any) {
    console.log('error', error)
    return error.message
  }
}
