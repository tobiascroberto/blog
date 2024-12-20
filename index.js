const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const { send } = require('process')

const date = new Date()

const newDate = date.getDate() + '/'+(date.getMonth()+1)+'/'+date.getFullYear()
console.log(newDate)

const app = express()

app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine','ejs')


// Entradas del blog

let entradas = [
    {
        date: '3/12/2020',
        title: 'Primera Entrada',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices augue quis mi sodales tristique. Donec laoreet odio nec metus pretium blandit. Proin sit amet.'
    },
    {
        date: '3/11/2021',
        title: 'Segunda Entrada',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices augue quis mi sodales tristique. Donec laoreet odio nec metus pretium blandit. Proin sit amet.'
    },{
        date: '3/09/2022',
        title: 'Tercera Entrada',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices augue quis mi sodales tristique. Donec laoreet odio nec metus pretium blandit. Proin sit amet.'
    },{
        date: '3/07/2023',
        title: 'Cuarta Entrada',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices augue quis mi sodales tristique. Donec laoreet odio nec metus pretium blandit. Proin sit amet.'
    },
]



app.get('/',(req,res)=>{
    res.render('pages/home', {todasLasEntradas : entradas})
})


app.route('/crear')
.get((req,res)=>{
    res.render('pages/crear', {date: newDate})
})
.post((req,res)=>{
    
    console.log(req.body)
    const date = req.body.date
    const title = req.body.title
    const content = req.body.content

    entradas.push({date,title,content})

    res.render('pages/crear', {date: newDate})

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