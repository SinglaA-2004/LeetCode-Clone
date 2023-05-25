const express = require('express');
const app = express();
const port = 3000;
let jwt = require('jsonwebtoken');
let USER_ID_COUNTER = 1;
const JWS_SECRET= 'aand_mand_ka_tola_jo_na_nacha_bhen_ka_loda!___NACHO!';
const {auth} = require('./middleware.js');
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({extended : false});
const cors = require('cors');
app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);
const USERS =[];
const SUBMISSIONS =[];
const PROBLEMS = [
    {
        problemId: "1",
        title: "201. Bitwise AND of Numbers Range",
        difficulty: "Medium",
        acceptance: "42%",
        description: "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
        exampleIn: "left = 5, right = 7",
        exampleOut: "4"
    },
    {
        problemId: "2",
        title: "202. Add two numbers",
        difficulty: "Medium",
        acceptance: "41%",
        description: "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
        exampleIn: "a = 100 , b = 200",
        exampleOut: "300"
    },
    {
        problemId: "3",
        title: "203. Happy Number",
        difficulty: "Easy",
        acceptance: "54.9%",
        description: "Write an algorithm to determine if a number n is happy.",
        exampleIn: "n = 19",
        exampleOut: "true"
    },
    {
        problemId: "4",
        title: "204. Remove Linked List Elements",
        difficulty: "Hard",
        acceptance: "42%",
        description: "Given number k , removed kth element",
        exampleIn: "list: 1->2->3 , k=2",
        exampleOut: "1->3"
    },
    {
        problemId: "5",
        title: "205. Bitwise AND of Numbers Range",
        difficulty: "Medium",
        acceptance: "42%",
        description: "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
        exampleIn: "left = 5, right = 7",
        exampleOut: "4"
    },
    {
        problemId: "6",
        title: "206. Add two numbers",
        difficulty: "Medium",
        acceptance: "41%",
        description: "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
        exampleIn: "a = 100 , b = 200",
        exampleOut: "300"
    },
    {
        problemId: "7",
        title: "207. Happy Number",
        difficulty: "Easy",
        acceptance: "54.9%",
        description: "Write an algorithm to determine if a number n is happy.",
        exampleIn: "n = 19",
        exampleOut: "true"
    },
    {
        problemId: "8",
        title: "208. Remove Linked List Elements",
        difficulty: "Hard",
        acceptance: "42%",
        description: "Given number k , removed kth element",
        exampleIn: "list: 1->2->3 , k=2",
        exampleOut: "1->3"
    }
];

app.get('/problems', (req, res)=>{
    const fileteredProblems = PROBLEMS.map(x => ({
        problemId: x.problemId,
        difficulty : x.difficulty,
        acceptance : x.acceptance,
        title: x.title
    }))
    res.json({
        problems: fileteredProblems
    })
})
app.get('/problems/:id', (req, res)=>{
    const id = req.params.id;
    const problem = PROBLEMS.find(x => x.problemId === id)
    if(!problem){
        return res.status(411).json({});
    }
    res.json({problem});
})

app.get('/', (req, res) => {
    res.json({
        msg: "Hello world!"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name =  req.body.name;
    const username = req.body.username;
    if(USERS.find(x => x.email === email)){
        return res.status(403).json({msg: "Email are already in use."});
    }
    USERS.push({
        name: name,
        username: username,
        email: email,
        password: password,
        id : USER_ID_COUNTER++
    })
    return res.json({msg: "User created successfully."})
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = USERS.find(x => x.email === email);

    if(!user){
        return res.status(403).json({msg: "User not found."});
    }

    if(user.password !== password){
        return res.status(403).json({msg: "Incorrect password."});
    }

    const token = jwt.sign({
        id: user.id
    }, JWS_SECRET);

    return res.json({token});
})

app.post('/submission', auth, (req, res) => {
    const isCorrect  = Math.random() < 0.5;
    const problemId = req.body.problemId;
    const submission = req.body.submission;
    if(isCorrect){
        SUBMISSIONS.push({
            submission: submission,
            problemId: problemId,
            userId: req.userId,
            status: 'AC'
        })
        return res.json({
            status : 'AC'
        })
    }
    else {
        SUBMISSIONS.push({
            submission: submission,
            problemId: problemId,
            userId: req.userId,
            status: 'WA'
        })
        return res.json({
            status : 'WA'
        })
    }
})

app.get('/submissions/:problemId', auth, (req, res) => {
    const problemId = req.params.problemId;
    const submission = SUBMISSIONS.filter(x => x.problemId === problemId && x.userId === req.userId);
    res.json({
        submission: submission
    })
})
app.get('/me', auth, (req, res) => {
    const user  = USERS.find(x => x.id === req.userId)
    const filteredUser = {
        name: user.name,
        username: user.username,
        email: user.email,
        id : user.id
    }
    res.json({
        filteredUser
    })
})
