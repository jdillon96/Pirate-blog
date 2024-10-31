import { useState } from "react"

export default function CommentEntry({ addComment, setCwriting, articleId }) {
  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [error, setError] = useState(null)

  function submit(e) {
    setError(null)
    e.preventDefault()
    if (!name.trim() || !text.trim()) {
      setError("Both the name and text must be supplied")
    } else {
      addComment({ name, text, articleId })
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        {error && <p className="error">{error}</p>}
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} />
        Text
        <textarea
          rows="8"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <section className="buttons">
        <button type="submit">Create</button>
        <button button onClick={() => setCwriting(false)}>Cancel</button>
        </section>
      </form>
    </div>
  )
}
