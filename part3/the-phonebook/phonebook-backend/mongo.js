const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://dbUser:${password}@cluster0.9sqwtig.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if(!name || !number) {
    Contact.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })

        mongoose.connection.close()
    })
    return
}

const contact = new Contact({
    name: name,
    number: number
})

contact.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
})