const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')

const date = new Date()

const newDate = date.getDate() + '/'+(date.getMonth()+1)+'/'+date.getFullYear()
console.log(newDate)

const app = express()

app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine','ejs')


app.get('/',(req,res)=>{
    res.render('pages/home')
})


app.get('/crear',(req,res)=>{
    res.render('pages/crear')
})

app.get('/nosotros',(req,res)=>{
    res.render('pages/nosotros')
})



app.get('/calculadora',(req,res)=>{
    res.render('pages/calculadora')
})

app.post('/calculadora',(req,res)=>{
    const num1 = Number.parseFloat(req.body.number1)
    const num2 = Number.parseFloat(req.body.number2)
    const resultado = num1 + num2

    console.log(req.body)
    console.log('los numeros enviados son: ' + num1 +' y num: '+num2)

    res.render('pages/resultado',{
        num1, num2, resultado
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log('Escuchando en puerto: '+ PORT)
})