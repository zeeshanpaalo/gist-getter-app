import { useCallback, useState } from 'react'
import { transformFileName, sendRequest } from '../helpers'

function useGistApi() {
  // So this resuable hook is responsible for fetching data from the gistApi and returns the gists and loading status and errors if any
  const [isFetching, setFetching] = useState(false) // loading flag
  const [error, setError] = useState(null) // error flag
  const [gists, setGists] = useState([]) // empty array by def
  // userName state
  const [userName, setUserName] = useState('')
  // pagination related stuff
  const [page, setPage] = useState(1)
  // Fetch func: This needs to use a useCallback hook to memoize.
  // Forks for a gist.
  const [forks, setForks] = useState({}) // empty Map by def

  const fetchGists = useCallback(
    (page) => {
      // TODO: Do some validation on the input- best practices
      // set Fetching to True
      setFetching(true)
      setError(null)
      setPage(page)
      sendRequest(
        'get',
        `https://api.github.com/users/${userName}/gists?per_page=${10}&page=${page}`, // TODO: size per page can be configurable
      )
        .then((gists) => {
          // set the fetched gists
          // TODO: Transform the gists' filename property to have badges here
          const transGists = transformFileName(gists);
          setGists(transGists)
          setFetching(false)
          setError(null)
        })
        .catch((err) => {
          // set error Message  and clear UI if needs to be
          setFetching(false)
          setError(err)
        })
    },
    [userName],
  ) // Only changes when username or page number changes
  // changePage handler
  const changePage = useCallback(
    (page) => {
      // Todo: Some validation on the page Number
      setPage(page)
      // fetch next page results
      fetchGists(page)
    },
    [fetchGists],
  )

  // Fetch Forks for a gist by gistID
  const fetchForks = useCallback(
    (gistID) => {
      // Fetch the forks.
      // TODO: This gist api does not support total number of results in the query and it also does not support pagination. Atleast the documentation is void of such thigs
      // Although it is technically possible to get last three users forking but the api would exceed its rate limits and would not be a good solution.
      // Just fetching random three users instead.
      sendRequest(
        'get',
        `https://api.github.com/gists/${gistID}/forks?per_page=${10}`, // Only getting 10 since its all random users
      )
        .then((forksForGist) => {
          // Transform the result to get only last three users.
          const lastTHree = forksForGist.slice(
            Math.max(forksForGist.length - 3, 0),
          )
          // set the fetched gists by gist ID. to persist previously fetched data
          setForks({ ...forks, [gistID]: lastTHree })
        })
        .catch((err) => {
          // set error Message  and clear UI if needs to be
          // TODO: error handling for UI
        })
    },
    [forks],
  )

  return {
    isFetching,
    error,
    gists,
    fetchGists,
    userName,
    setUserName,
    page,
    changePage,
    forks,
    fetchForks,
  }
}

export default useGistApi
