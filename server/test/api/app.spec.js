import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import app from '../../src/app';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const request = chai.request(app).keepOpen();
const { expect } = chai;

after(() => {
  request.close();
});

describe('Invalid route', () => {
  it('Should return error 404', async () => {
    const { status } = await request.get('/notavailble');
    expect(status).to.be.eql(404);
  });
});
