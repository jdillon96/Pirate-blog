
export default function Comments({comments, articleId}) {
    return (
        <section>
        {comments.map((c) => (
            c.articleId == articleId ? (
                <section key={c.id} className="comment">
                <h2>{c.name}</h2>
                <p>{c.text}</p>
                </section>
            ) : 
            ""
          ))}
        </section>
    )
        
  }
  