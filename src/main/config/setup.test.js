const request = require('supertest')
const app = require('./app')

describe('App Setup', () => {
  test('should disable x-powered-by header', async () => {
    app.get('/test_x_powered_by', (req, res) => {
      res.send('')
    })

    const res = await request(app).get('/test_x_powered_by')
    expect(res.header['x-powered-by']).toBeUndefined()
  })

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
