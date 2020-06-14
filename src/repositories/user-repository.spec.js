const {
  MongoClient
} = require('mongodb')
let connection
let db

class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne({
      email
    }, {
      projection: {
        password: 1
      }
    })
    return user
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return {
    userModel,
    sut
  }
}

describe('LoadUserByEmailRepository', () => {
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
    const {
      sut
    } = makeSut()
    const user = await sut.load('email@email.com')
    expect(user).toBeNull()
  })

  test('Should returns an user if user is found', async () => {
    const {
      sut,
      userModel
    } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'email@email.com',
      password: 'hashed_password'
    })
    const user = await sut.load('email@email.com')
    expect(user).toEqual({
      _id: fakeUser.ops[0]._id,
      password: fakeUser.ops[0].password
    })
  })
})
