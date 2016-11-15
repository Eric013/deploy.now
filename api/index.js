const api = require('express')()
const bodyParser = require('body-parser')
const deploy = require('../lib/deploy')

api.use(bodyParser.json())

api.get('/', (req, res) => {
  res.send({msg: 'hi'})
})

api.post('/deploy', async (request, response) => {
  try {
    const {repo, zeitToken, envs} = request.body

    const url = await deploy(repo, zeitToken, envs)

    response.json({url})
  } catch(error) {
    response.status(500).json({
      error: JSON.stringify(error.message)
    })
  }
})

module.exports = api
