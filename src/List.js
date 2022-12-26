import './List.css'

function List(props) {
  return (
    <div className="list">
      <div>
        <div className="pagination-btns">
          <button
            onClick={() => props.setPage(props.page - 1)}
            disabled={props.page <= 1}
            data-testid="prevbtn"
          >
            Prev. Page
          </button>
          {props.gists.length > 0 && <p>Page#{props.page}</p>}
          <button
            onClick={() => props.setPage(props.page + 1)}
            disabled={props.gists.length < 10}
            data-testid="nextbtn"
          >
            Next. Page
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Gist ID</th>
              <th>URL</th>
              <th>Files Badges</th>
              <th>Users Forking</th>
            </tr>
          </thead>
          <tbody>
            {props.gists.map((gist, i) => {
              return (
                <tr key={gist.id}>
                  <td>{gist.id}</td>
                  <td>{gist.url}</td>
                  <td>
                    {gist.files.map((f,i) => {
                      return <span key={`${f}${i}`}>{f} &nbsp;</span>
                    })}
                  </td>
                  <td>
                    {props.forks[gist.id] ? (
                      props.forks[gist.id].map((f) => {
                        return (
                          <div key={f.id}>
                            <a
                              href={f.owner.login}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {f.owner.login}
                            </a>
                            <br />
                          </div>
                        )
                      })
                    ) : (
                      <button onClick={() => props.fetchForks(gist.id)}>
                        View
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List
