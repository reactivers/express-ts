import chai from 'chai';
import chaiHttp from 'chai-http';
import type { Server } from 'http';
import createServer from '../server';

chai.should();
chai.use(chaiHttp);
const prepare = (done: Mocha.Done, setServer: (server: Server) => void) => {
    try {
        createServer()
            .then((_server: Server) => {
                setServer(_server)
                done();
            })
    } catch (e) {
        done(e)
    }
}

let server: Server;
const testUser = {
    username: "reactivers",
    password: '123',
    firstname: 'Reactivers',
    lastname: 'Reactivers'
};

describe('AUTH', () => {
    before((done) => prepare(done, (_server: Server) => { server = _server }))
    let token: string;
    it('SIGN UP', (done) => {
        chai.request(server)
            .post('/api/auth/signup')
            .send(testUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('SIGN IN', (done) => {
        const body = {
            username: testUser.username,
            password: testUser.password,
        };

        chai.request(server)
            .post('/api/auth/signin')
            .send(body)
            .end((err, res) => {
                token = res.body.token
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('VALIDATE TOKEN', (done) => {
        chai.request(server)
            .get('/api/auth')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });
});


describe('JSON API', () => {
    before((done) => prepare(done, (_server: Server) => { server = _server }))
    let token: string;
    it('SIGN UP', (done) => {
        chai.request(server)
            .post('/api/auth/signup')
            .send(testUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('TODO Unauthorized', (done) => {
        chai.request(server)
            .get('/api/json-api/todo?id=1')
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('POST', (done) => {
        chai.request(server)
            .get('/api/json-api/post?id=1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('SIGN IN', (done) => {
        const body = {
            username: testUser.username,
            password: testUser.password,
        };

        chai.request(server)
            .post('/api/auth/signin')
            .send(body)
            .end((err, res) => {
                token = res.body.token
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });


    it('TODO Authorized', (done) => {
        chai.request(server)
            .get('/api/json-api/todo?id=1')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });
});