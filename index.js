const express = require ('express');
const app = express();

const items = require ('./Items');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
 
app.get('/api/items', (req,res) => {
    res.json(items);
})

app.post('/api/items', (req,res) => {
    const newItem ={
        name: req.body.name,
        id: req.body.id,
        price: req.body.price
    }
    items.push(newItem);
    res.json(items);
})

app.delete('/api/items/:id', (req,res) => {
    let{id} = req.params;
    let itemToBeDeleted = items.find(item=>item.id === id)
    if (itemToBeDeleted) {
        res.json({
            message:'Item deleted',
            items: items.filter(item => item.id !== id)
        })
    } else {
        res.status(404)
        .json({message:`Items doesn't exist!`})
    }

})

app.put('/api/items/:name',(req,res) => {
    let {name} = req.params;
    let itemToBeUpdated = items.find(item => item.name === name);
    if(itemToBeUpdated) {
        const updateItem = req.body

        items.forEach(item => {
            if(item.name === req.params.name) {
                item.name = updateItem ? updateItem.name : item.name;
                res.json({message:'Item updated', item})
            }})
    
    } else {
        res.status(404)
        .json({message:`Item doesn't exist!`});
    }
})



app.listen(4000, () => {
    console.log (`It's work!!!`);
})