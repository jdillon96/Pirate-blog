import { useEffect, useState } from "react"
import Nav from "./Nav"
import Article from "./Article"
import ArticleEntry from "./ArticleEntry"
import Comments from "./Comments"
import CommentEntry from "./CommentEntry"
import { SignIn, SignOut } from "./Auth"
import { useAuthentication } from "../services/authService"
import { fetchArticles, createArticle } from "../services/articleService"
import { fetchComments, createComment } from "../services/commentService"
import "./App.css"

export default function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [awriting, setAwriting] = useState(false)
  const [comments, setComments] = useState([])

  const [cwriting, setCwriting] = useState(false)
  const user = useAuthentication()

  // This is a trivial app, so just fetch all the articles only when
  // a user logs in. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.
  useEffect(() => {
    if (user) {
      fetchArticles().then(setArticles)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchComments().then(setComments)
    }
  }, [user])

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ title, body, image }) {
    createArticle({ title, body, image }).then((article) => {
      setArticle(article)
      setArticles([article, ...articles])
      setAwriting(false)
    })

  }
  function addComment({ name, text, articleId }) {
    createComment({ name, text, articleId}).then((comment) => {
      setComments([comment, ...comments])
      setCwriting(false)
    })
  }

  return (
    <div className="App">
      <header>
        {user && <button onClick={() => setAwriting(true)}>New Article</button>}
        Blog
        {!user ? <SignIn /> : <SignOut />}
      </header>

      {!user ? "" : <Nav articles={articles} setArticle={setArticle} />}

      {!user ? (
        <h1>Please Log In!</h1>
      ) : awriting ? (
        <ArticleEntry addArticle={addArticle} setWriting = {setAwriting} />
      ) : !article ? (
        <p>No article selected</p>
      ) : (
        <section>
        <Article article={article}/>
        {cwriting ? (
          <CommentEntry addComment={addComment} setCwriting={setCwriting} articleId={article.id} />
        ) : 
        <section>
        <button onClick={() => setCwriting(true)}>Add a Comment!</button>
        <Comments comments={comments} articleId={article.id}/>
        </section>}
        </section>
      )}
    </div>
  )
}