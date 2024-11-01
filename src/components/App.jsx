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

  // fetches articles and comments from database
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

  // Update the "database" then react for adding articles and comments
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

  const Clear = () => {
    setArticle(null);
    setAwriting(false);
    setCwriting(false);
  };

  return (
    <div className="App">
      <header>
        {user && <button onClick={() => setAwriting(true)}>New Entry</button>}
        <h1 onClick={Clear}>🏴‍☠️ Cap'n's Log 🏴‍☠️</h1>
        {!user ? <SignIn /> : <SignOut />}
      </header>

      {!user ? "" : <Nav articles={articles} setArticle={setArticle}/>}

      {!user ? (
        <h1 className="instruction">Embark matey!</h1>
        
      ) : awriting ? (

        <ArticleEntry addArticle={addArticle} setWriting = {setAwriting} />

      ) : !article ? (

        <h1 className="instruction">Select an entry matey!</h1>

      ) : (

        <section className="entry">
        
        <Article article={article}/>
        
        {cwriting ? (
          <CommentEntry addComment={addComment} setCwriting={setCwriting} articleId={article.id} />
        ) : 

        <section className="comments">
        <h1 className="comments">Comments:</h1>
        <button onClick={() => setCwriting(true)}>Add a Comment!</button>
        <Comments comments={comments} articleId={article.id}/>
        </section>}

        </section>
      )}
    </div>
  )
}