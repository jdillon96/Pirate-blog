
export default function Article({ article}) {
  return (
    <article>
          <h2 className="title">{article.title}</h2>
          <p className="date">{`Written: ${article.date.toDate()}`}</p>
          <p className="body">{article.body}</p>
          {article.image != "" ? <img src={article.image} width="50%" height="33%" /> : ""}
    </article>
  )
}


