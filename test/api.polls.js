const assert = require('assert')
const supertest = require('supertest')('http://localhost:8080/api/polls')
const Poll = require('../server/api/poll.model.js')

const pollExample = {
  title: 'My Test Poll',
  username: 'gigi',
  options: [
    {
      title: 'option one',
      votes: 3
    },
    {
      title: 'option two',
      votes: 5
    }
  ]
}

describe('GET the list of polls /api/polls/list', function () {
  before(function (done) {
    supertest.post('/new-poll')
      .send(pollExample)
      .end((err, res) => {
        if (err) throw new Error(err)
        done()
      })
  })

  it('Should give a JSON response', function (done) {
    supertest.get('/list')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done)
  })

  it('Should return an array of polls', function (done) {
    supertest.get('/list')
        .expect((res) => {
          const items = res.body
          assert.equal(Array.isArray(items), true)
        })
        .end(done)
  })

  it('The array contains at least one item', function (done) {
    supertest.get('/list')
      .expect(function (res) {
        const items = res.body
        assert.equal(items.length > 0, true)
      })
      .end(done)
  })

  it('Every poll in the array is valid', function (done) {
    supertest.get('/list')
      .expect(function (res) {
        const items = res.body
        const validItems = items.filter(poll => !(new Poll(poll)).validateSync())
        assert.equal(items.length > 0, true)
        assert.equal(items.length, validItems.length)
      })
      .end(done)
  })
})