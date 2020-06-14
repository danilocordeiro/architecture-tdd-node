const {
  MongoClient
} = require('mongodb')

class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne({
      email
    })
    return user
  }
}

describe('LoadUserByEmailRepository', () => {
  let connection
  let db

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await connection.close()
  })

  test('Should returns null if no user is found', async () => {
    const userModel = db.collection('users')
    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('email@email.com')
    expect(user).toBeNull()
  })

  test('Should returns an user if user is found', async () => {
    const userModel = db.collection('users')
    await userModel.insertOne({
      email: 'email@email.com'
    })
    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('email@email.com')
    expect(user.email).toBe('email@email.com')
  })
})
