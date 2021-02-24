const axios = require('axios')
const LOCALHOST = 'http://localhost:'
const PORT = 3000
it('should return the index page, status code 200', async () => {
  const result = await axios.get(`${LOCALHOST}${PORT}`)
  console.log('result', typeof result)
  expect(result.status).toEqual(200)
  expect(result.data).toMatch(/Details/)
})
