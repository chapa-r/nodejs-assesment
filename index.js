const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());



const items = [
    {
        id: 1,
        name: 'Mobile',
        description: 'samsung mobile',
        price: '70,000',
        quantity: 10
    },
    {
        id: 2,
        name: 'Headset',
        description: 'JBL',
        price: '20,000',
        quantity: 10
    },
    {
        id: 3,
        name: 'Power bank',
        description: 'MI',
        price: '10,000',
        quantity: 10
    }
]

//GET
app.get('/', (req,res) => {
    res.send('Hello world!!!');
});

//GET
app.get('/api/items', (req, res) => {
    res.send(items);
});

//GET item/{id}
app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!item) return res.status(404).send('Item not found'); //status 400
 
    // status 200
    res.status(200).send(item);
 
 });


//POST
app.post('/api/items', (req,res) => {

    //error validation
    const { error } = validateItem(req.body); 
    //400 bad request
    if(error) return  res.status(400).send(result.error.details[0].message);



    //since im not using a DB im using this method
    const item = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(item);
    //201 staus request
    res.status(201).send(item);
});

//PUT
app.put('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    //status 404
    if(!item) return res.status(404).send('Item not found');
        
    
 
    //validate
    //If invalid, return 400 - Bad request
   
    const { error } = validateItem(req.body); 
    //400 bad request
    if(error) return  res.status(400).send(result.error.details[0].message);

    
    item.name = req.body.name;
    //200 request
    res.status(200).send(item);
});

//DELETE
app.delete('api/items/:id', (req, res) => {
    //Look up the item
    //Not existing, return 404
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!item) return res.status(404).send('Item not found'); 

    
    const index = items.indexOf(item);
    items.splice(index, 1);

    //Return the same item
    res.status(204).send(item);

    const { error } = validateItem(req.body); 
    if(error) {
        //400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }


});



function validateItem(item) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.Validate(item, schema);
}




const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`));

