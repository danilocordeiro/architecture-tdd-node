const app = require('./config/app')
const MongoHelper = require('../infra/helpers/mongo-helpers')
const env = require('./config/env')

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    app.listen(8090, () => {
      console.log('Server is running')
    })
  })
  .catch(console.error)
