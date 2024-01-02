const supertest = require('supertest');
const { expect } = require('chai');
const { app } = require('../index');

describe('Goal Controller', () => {
  it('should return a list of goal', async () => {

    const response = await supertest(app).get('/api/goals');

    expect(response.status).to.equal(200);

    response.body.forEach((goal) => {
        expect(goal).to.have.property('id');
        expect(goal).to.have.property('name');
        expect(goal).to.have.property('email');
        expect(goal).to.have.property('goal_id');
        expect(goal).to.have.property('updatedAt');
        expect(goal).to.have.property('createdAt');
        expect(goal).to.have.property('file_name');
    });

  });
});
