const mongoose = require("mongoose");

const request = require("supertest"); //gia na mporo na kano request epeidi h jest den exei ayth th dynatothta

const app = require("../app");

const helper = require("../helpers/user.helper");

require('dotenv').config(); //to read the .env file

beforeEach(async() =>{
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () =>{console.log("connection to mogodb established")},
        err => {console.log("failed to connect to mongodb",err)}
    )
});

afterEach(async() =>{
    await mongoose.connection.close();
});



describe("get request /api/users", () => {

    it("returns all users", async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    },10000)

});

describe('request get /api/users/:username',() =>{

    it('returns a user', async () => {
        const result = await helper.findLastInsertedUser();
        console.log(result);

        const res = await request(app).get('/api/users/' + result.username);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.username).toBe(result.username);
        expect(res.body.data.email).toBe(result.email)
    },200000)
});

describe("request post /api/users", () =>{

    it ("creates a user" , async() => {
        const res = await request(app).post('/api/users')
        .send({
            username : "test",
            password : "123456",
            name : "kostas",
            surname : "kostakis",
            email: "test@aueb.gr"
        })

        expect(res.statusCode).toBe(400);
        expect(res.body.data).toBeTruthy();
    },10000);

    it ("creates a user testing password length" , async() => {
        const res = await request(app).post('/api/users')
        .send({
            username : "test1",
            password : "1234",
            name : "kostas",
            surname : "kostakis",
            email: "test1@aueb.gr"
        })

        expect(res.statusCode).toBe(400);
        expect(res.body.data).toBeTruthy();
    },10000);

    it ("creates a user testing username and email" , async() => {
        const res = await request(app).post('/api/users')
        .send({
            username : "test",
            password : "123456",
            name : "kostas",
            surname : "kostakis",
            email: "test@aueb.gr"
        })

        expect(res.statusCode).toBe(400);
        expect(res.body.data).toBeTruthy();
    },10000);
})

describe("delete /api/users/:username", () =>{

    it ("delete a user" , async() => {
        const result = await helper.findLastInsertedUser();
        const res = await request(app).delete('/api/users/' + result.username);

        expect(res.statusCode).toBe(200);
    },10000)
})