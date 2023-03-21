
import { Kafka } from 'kafkajs'
//const { Kafka } = require("kafkajs")


const topic = "my_topic"
const clientId = "my-app"

const brokers = ['localhost:9092']

const kafka = new Kafka({
  clientId,
  brokers,
})
const consumer = kafka.consumer({ groupId:clientId })

export function counter() {
    const consume = async () => {
      // first, we wait for the client to connect and subscribe to the given topic
        console.log('----354356', clientId)
        consumer.connect().then(res => { 
            debugger
            console.log('===456', res)
            
        })
        console.log('---www-354356',clientId)

      await consumer.subscribe({ topic })
      await consumer.run({
        // this function is called every time the consumer gets a new message
        eachMessage:async ({ message }) => {
          console.log(`received message: ${message.value}`)
        },
      })
    }
    // start the consumer, and log any errors
    consume().catch((err) => {
      console.log("error in consumer: ", err)
    })
  }
