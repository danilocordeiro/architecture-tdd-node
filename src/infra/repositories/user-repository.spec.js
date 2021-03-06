const MongoHelper = require('../helpers/mongo-helpers')
const LoadUserByEmailRepository = require('./user-repository')
const MissingParamError = require('../../utils/errors/missing-param-error')

let db

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
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
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

  test('Should throw if no userModel is provided', async () => {
    const
      sut = new LoadUserByEmailRepository()

    const promisse = sut.load('email@email.com')
    expect(promisse).rejects.toThrow()
  })

  test('Should throw if no email is provided', async () => {
    const {
      sut
    } = makeSut()

    const promisse = sut.load()
    expect(promisse).rejects.toThrow(new MissingParamError('email'))
  })
})
