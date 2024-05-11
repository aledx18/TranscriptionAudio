export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    console.log(formData.get('audio'))
    return Response.json({ message: 'File uploaded successfully' })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500
    })
  }
}
