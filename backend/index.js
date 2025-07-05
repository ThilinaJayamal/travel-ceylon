import express from 'express'

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Helo world!");
})

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT:", PORT)
})