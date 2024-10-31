import { useState } from "react"

export default function ArticleEntry({ addArticle, setWriting }) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [error, setError] = useState(null)

  function submit(e) {
    setError(null)
    e.preventDefault()
    if (!image.trim()){
      setImage("")
    }
    if (!title.trim() || !body.trim()) {
      setError("Title and body are required matey")
    } else {
      addArticle({ title, body, image })
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        {error && <p className="error">{error}</p>}
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        Body
        <textarea
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        Image (Optional) (Copy image address)
        <input value={image} onChange={(e) => setImage(e.target.value)} />
        <section className="buttons">
        <button type="submit">Create</button>
        <button button onClick={() => setWriting(false)}>Cancel</button>
        </section>
      </form>
    </div>
  )
}
