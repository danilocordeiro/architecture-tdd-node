const request = require('supertest')

describe('Content-Type Middleware', () => {
  let app

  beforeEach(() => {
    jest.resetModules()

    app = require('../config/app')
  })

  test('should return content type json as default', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('should return content type xml if forced', async () => {
    app.get('/test_content_type', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /xml/)
  })
})
