import List from './List'
import useGistApi from './hooks/useGistApi'
import './App.css'

function App() {
  const {
    gists,
    fetchGists,
    userName,
    setUserName,
    page,
    changePage,
    forks,
    fetchForks,
  } = useGistApi()
  // Enter handler and
  // TODO: Loaders can be placed for better UX
  // return JSX
  return (
    <div className="App">
      <h2>Gists Getter App</h2>
      <input
        data-testid="userName"
        type="text"
        value={userName}
        placeholder="Enter a valid username"
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            fetchGists(1)
          }
        }}
      ></input>
      <h4>List of Gists for the User</h4>
      <List
        gists={gists}
        page={page}
        setPage={changePage}
        forks={forks}
        fetchForks={fetchForks}
      />
    </div>
  )
}

export default App
