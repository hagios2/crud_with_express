const express = require('express')
const router = express.Router()
const members = require('../../Members')
const uuid = require('uuid')



// app.get('/', (req, res)=>{

//     res.send(path.join(__dirname, 'public', 'index.html'))
// })


router.get('/', (request, res) => res.json(members))

router.get('/:id/data', (request, response) => {
    
    let found = members.some(member => member.id === parseInt(request.params.id))

    if(found)
    {
        response.json(members.filter(member => member.id === parseInt(request.params.id)))
    
    }else{
        response.status(404).json({message: 'Not found'})
    }

})

router.post('/', (request, response) => {

    const newMember = {
        id: uuid.v4(),
        name: request.body.name,
        email: request.body.email,
        age: request.body.age,
        status: request.body.status
    }

    if(!newMember.name || !newMember.email)
    {
        return response.status(400).json({message: "Name and Email required"})

    }

    members.push(newMember)

    response.json(members)
})


router.put('/:id/data', (request, response) => {
    
    let found = members.some(member => member.id === parseInt(request.params.id))

    if(found)
    {
        const updated_member = request.body
        
        members.forEach(member => {
            if(member.id === parseInt(request.params.id))
            {
                member.name = updated_member.name ? updated_member.name : member.name,
                member.email = updated_member.email ? updated_member.email : member.email,
                member.age = updated_member.age ? updated_member.age : member.age
            }
        })
    
    }else{
        response.status(404).json({message: 'Not found'})
    }

})

module.exports = router