require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const { send } = require('process')
const mongoose = require('mongoose')

const date = new Date()

const newDate = date.getDate() + '/'+(date.getMonth()+1)+'/'+date.getFullYear()
console.log(newDate)

const app = express()

app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine','ejs')


//conectar a base de datos mongodb
mongoose.connect( process.env.BASEDEDATOS , {useNewUrlParser: true})


// crear la base de datos en Mongoose
// 1.- crear el Schema

const entradaSchema = {
    date:  String,
    title: String,
    content: String
}

// 2.- crear el modelo 

const EntradaModelo = mongoose.model('Entrada',entradaSchema)


// crud= create, read, updat y delete

// const entradaUno = new EntradaModelo({
//     date: '3/12/2020',
//     title: 'Primera Entrada',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices augue quis mi sodales tristique. Donec laoreet odio nec metus pretium blandit. Proin sit amet.'
// })

// entradaUno.save()


// para subir el resto de los registros: 

// const entradaDos = new EntradaModelo({
//     date: '3/11/2021',
//     title: 'Segunda Entrada',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices augue quis mi sodales tristique. Donec laoreet odio nec metus pretium blandit. Proin sit amet.'
// })

// const entradaTres = new EntradaModelo({
//     date: '3/09/2022',
//     title: 'Tercera Entrada',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices augue quis mi sodales tristique. Donec laoreet odio nec metus pretium blandit. Proin sit amet.'
// })

// const arraySubir = [entradaDos, entradaTres]

// EntradaModelo.insertMany(arraySubir)


// READ en mongoDB
//EntradaModelo.find().then(data => console.log(data))



// Entradas del blog

// let entradas = [
//     {
//         date: '3/12/2020',
//         title: 'Primera Entrada',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices augue quis mi sodales tristique. Donec laoreet odio nec metus pretium blandit. Proin sit amet.'
//     },
//     {
//         date: '3/11/2021',
//         title: 'Segunda Entrada',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices augue quis mi sodales tristique. Donec laoreet odio nec metus pretium blandit. Proin sit amet.'
//     },{
//         date: '3/09/2022',
//         title: 'Tercera Entrada',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices augue quis mi sodales tristique. Donec laoreet odio nec metus pretium blandit. Proin sit amet.'
//     },{
//         date: '3/07/2023',
//         title: 'Cuarta Entrada',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices augue quis mi sodales tristique. Donec laoreet odio nec metus pretium blandit. Proin sit amet.'
//     },
// ]



app.get('/',(req,res)=>{


    EntradaModelo.find().then( entradas => {


    const entradasArrat = [] 
    
    entradas.forEach(items => {

        entradasArrat.push({
            title: items.title,
            date: items.date,
            content: items.content,
            url: items.title.toLowerCase().split(' ').join('-')
        })

    })

    res.render('pages/home', {todasLasEntradas : entradasArrat})
})

})


app.route('/crear')
.get((req,res)=>{ 
    
    res.render('pages/crear', {date: newDate})
})
.post((req,res)=>{
    
    const nuevaEntrada = new EntradaModelo(req.body)

    nuevaEntrada.save()

    //version local
    // entradas.push(req.body)

    // res.render('pages/crear', {date: newDate})
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


app.get('/entrada/:post', (req,res) => {

    EntradaModelo.find().then( entradas => {
        let resultado = {}
        entradas.forEach(items =>{
            if(req.params.post === items.title.toLowerCase().split(' ').join('-')){
                resultado = {
                    title: items.title,
                    date: items.date,
                    content: items.content
                }
            }
        })

        res.render('pages/pagina',{data: resultado})
 })
})


const PORT = process.env.PORT 
app.listen(PORT, ()=>{
    console.log('Escuchando en puerto: '+ PORT)
})


module.exports = app;