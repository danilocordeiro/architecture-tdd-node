const MongoHelper = require('./mongo-helpers')

describe('MongoHelper', () => {
  test('should reconnect when getDb is invoked and client is disconnect', async () => {
    const sut = MongoHelper
    await sut.connect(process.env.MONGO_URL)
    expect(sut.db).toBeTruthy()
    await sut.disconnect()
    expect(sut.db).toBeFalsy()
    await sut.getDb()
    expect(sut.db).toBeTruthy()
  })
})
