const request = require('supertest')
const app = require('../config/app')

describe('CORS Middleware', () => {
  test('should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send('')
    })

    const res = await request(app).get('/test_cors')
    expect(res.header['access-control-allow-origin']).toBe('*')
    expect(res.header['access-control-allow-methods']).toBe('*')
    expect(res.header['access-control-allow-headers']).toBe('*')
  })
})
