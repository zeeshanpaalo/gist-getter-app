import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

import { sendRequest, transformFileName } from './helpers.js'

jest.mock('./helpers.js')

const apiData = [
  {
    url: 'https://api.github.com/gists/4b5db44304aa8d5e4ec9d7a214ada781',
    id: '4b5db44304aa8d5e4ec9d7a214ada781',
    node_id: 'MDQ6R2lzdDRiNWRiNDQzMDRhYThkNWU0ZWM5ZDdhMjE0YWRhNzgx',
    files: {
      'purge_non_existing_images.sh': {
        filename: 'purge_non_existing_images.sh',
        type: 'application/x-sh',
      },
    },
    public: true,
    created_at: '2018-11-13T16:54:59Z',
    updated_at: '2018-11-13T16:55:52Z',
    owner: {
      login: 'esperlu',
    },
  },
  {
    url: 'https://api.github.com/gists/4b5db44304aa8d5e4ec9d7a214ada781',
    id: '222204aa8d5e4ec9d7a214ada781',
    node_id: 'MD2RiNWRiNDQzMDRhYThkNWU0ZWM5ZDdhMjE0YWRhNzgx',
    files: {
      'purge_non_existing_images.sh': {
        filename: 'purge_non_existing_images.sh',
        type: 'application/python',
      },
    },
    public: true,
    created_at: '2019-11-13T16:54:59Z',
    updated_at: '2018-11-13T16:55:52Z',
    owner: {
      login: 'esperlu',
    },
  },
]

test('Getter App sample test', () => {
  render(<App />)
  const linkElement = screen.getByText(/Gists Getter App/i)
  expect(linkElement).toBeInTheDocument()
})

test('List Component prevbtn should be disabled on first page', () => {
  render(<App />)
  expect(screen.getByTestId('prevbtn')).toBeDisabled()
})

test('List Component nextbtn should be disabled on first page', () => {
  render(<App />)
  expect(screen.getByTestId('nextbtn')).toBeDisabled()
})

test('Hitting enter on text field should fetch data using mocks', async () => {
  // Mock api call
  sendRequest.mockImplementation(() => {
    return new Promise((res, rej) => {
      return res(apiData)
    })
  })
  transformFileName.mockImplementation(transformFileName)
  render(<App />)
  // use user event to type in field data
  const userNameField = screen.getByTestId('userName')
  // change field value
  userEvent.paste(userNameField, 'esperlu')
  expect(userNameField.value).toBe('esperlu') // test change of value
  // userEvent press enter should call the api
  userEvent.type(userNameField, '[Enter]')
  await waitFor(() => expect(screen.getByTestId('nextbtn')).toBeDisabled()) // Should be disabled because less than 10 results
})
