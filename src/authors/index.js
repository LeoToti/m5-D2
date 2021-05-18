/*
****************** STUDENTS CRUD ********************
1. CREATE → POST http://localhost:3001/students (+ body)
2. READ → GET http://localhost:3001/students (+ optional query parameters)
3. READ → GET http://localhost:3001/students/:id
4. UPDATE → PUT http://localhost:3001/students/:id (+ body)
5. DELETE → DELETE http://localhost:3001/students/:id

*/

import express from "express" // 3rd party module
import fs from "fs" // core module
import { fileURLToPath } from "url" // core module
import { dirname, join } from "path" // core module
import uniqid from "uniqid" // 3rd party module

const authorsRouter = express.Router()

const filePath = fileURLToPath(import.meta.url) // C:\Strive\FullStack\2021\Mar21\M5\D2\src\students\index.js <-- CURRENT FILE PATH
const autohrsFolderPath = dirname(filePath) // C:\Strive\FullStack\2021\Mar21\M5\D2\src\students
const authorsJSONPath = join(autohrsFolderPath, "authors.json")
// WINDOWS STYLE --> C:\Strive\FullStack\2021\Mar21\M5\D2\src\students\students.json
// UNIX STYLE --> M5//D2//src//students//students.json

// DO NOT CONCATENATE PATHS WITH PLUS SYMBOL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// USE JOIN INSTEAD!!!!!!!!!!!!!!!!!!!!!!!!!!!

authorsRouter.post("/", (req, res) => {
  // 1. read request body
  const newAuthors = { ...req.body, createdAt: new Date(), _id: uniqid() }
  console.log(newAuthors)

  // 2. read the old content of the file students.json

  const authors = JSON.parse(fs.readFileSync(authorsJSONPath).toString())

  // 3. push the newstudent into students array
  authors.push(newAuthors)

  // 4. write the array back into the file students.json
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

  // 5. send back proper response

  res.status(201).send(authors._id)
}) // (URL, ROUTE HANDLER), Route handler (req, res) => {}

authorsRouter.get("/", (req, res) => {
  // 1. read students.json content

  const contentAsABuffer = fs.readFileSync(authorJSONPath) // we get back a buffer which is MACHINE READABLE
  //const contentAsAString = contentAsABuffer.toString() // we need to convert it to a string to have it in a HUMAN READABLE form

  // 2. send the content as a response
  const authors = JSON.parse(contentAsABuffer) // string needs to be converted into a JSON
  res.send(authors)
})

authorsRouter.get("/:id", (req, res) => {
  console.log(req.params)

  // 1. read the content of the file
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath).toString())

  // 2. find the one with the correspondant id

  const author = authors.find(s => s._id === req.params.id)

  // 3. send it as a response
  res.send(author)
})

authorsRouter.put("/:id", (req, res) => {
  // 1. read the old content of the file
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath).toString())

  // 2. modify the specified student

  const remainingAuthors = students.filter(student => student._id !== req.params.id)

  const updatedAuthors = { ...req.body, _id: req.params.id }

  remainingAuthors.push(updatedAuthors)

  // 3. write the file with the updated list
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))
  // 4. send a proper response

  res.send(updatedAuthors)
})

authorsRouter.delete("/:id", (req, res) => {
  // 1. read the old content of the file
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath).toString())

  // 2. filter out the specified id

  const remainingAuthors = authors.filter(author => author._id !== req.params.id) // ! = =

  // 3. write the remaining students into the file students.json
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))

  // 4. send back a proper response

  res.status(204).send()
})

export default authorsRouter
