import axios from 'axios';

export const sendRequest = (method, url) => {
  return new Promise((res, rej) => {
    axios({
      method,
      url,
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })
      .then((response) => {
        return res(response.data)
      })
      .catch((err) => {
        return rej(err)
      })
  })
}

// badge maps
// TODO: This map can grow into hold what ever files we support
const badgesMap = {
  'application/x-sh': 'SH',
  'text/plain': 'TXT',
  'text/markdown': 'MD',
  'application/python': 'PY',
  'application/javascript': 'JS',
  'application/go': 'GO',
}

export const transformFileName = (gists)=> {
  return gists.map((g) => {
    const badges = Object.values(g.files).map((f) => {
      if (badgesMap[f.type]) {
        return badgesMap[f.type]
      }
      return 'N/A'
    })
    return { ...g, files: badges }
  })
}
