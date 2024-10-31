import { login, logout, loggedInUserDisplayName } from "../services/authService"

export function SignIn() {
  return <button onClick={login}>Embark</button>
}

export function SignOut() {
  return (
    <div>
      Ahoy, {loggedInUserDisplayName()}
      <>   </>
      <button onClick={logout}>Disembark</button>
    </div>
  )
}