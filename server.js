const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))
const users = [
  {
    id:1,
    name:"saladin",
    email:"saladinjake@gmail.com",
    password:"saladin123"
  },
  {
    id:2,
    name:"esau",

    email:"easua@gmail.com",
    password:"saladin123"
  }
]


const posts= [
  {
    id:1,
    title:"window shopp",
    detail:"this is the post"
  }
]


app.post('/api/v1/login', (request,response)=>{
	console.log(request.body)
   const user = users.find(user=> user.email==request.body.email && user.password== request.body.password)
   if( user){
    	return response.status(200).json({data: user})
   
   } 
return response.status(400).json({error:'invalid credentials'})
})

app.get('/api/v1/users', (request,response)=>{
	return response.status(200).json(users)
})


app.get('/api/v1/posts', (request,response)=>{
	return response.status(200).json({data:posts})
})

app.post('/api/v1/posts',(request,response)=>{
	const newPost =  request.body;
	const {title, detail} = newPost;
	if(!title || !detail){
     return response.status(401).json({error:'invalid form data'})

	}
	posts.push(newPost);
	return response.status(200).json({data:posts})
})


app.listen(3000,(err)=>{
  console.log("port 3000")
})
