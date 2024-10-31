
export default function Article({ article}) {
  return (
    <article>
          <h2>{article.title}</h2>
          <p className="date">{`Posted: ${article.date.toDate()}`}</p>
          <p className="body">{article.body}</p>
          {article.image != "" ? <img src={article.image} width="90%" height="40%" /> : ""}
    </article>
  )
}


