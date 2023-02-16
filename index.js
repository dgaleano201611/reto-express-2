const express = require("express");
const app = express();
const port = 8080;
app.use(express.json())

let data = require("./data.json");
const personalInfo = require("./personal_info.json");

let time = new Date();

let info = `
Our store has info for ${Object.keys(data).length} products 
<br>
<br>
${time}
`;

app.get("/api/products", (req, res) => {
  res.json(data);
});

//solicitar un producto
app.get("/api/products/:productI", (req, res) => {
  const { productI } = req.params;
  const product = data.find((person) => person.id == productI);
  !product ? res.status(404).json({Error: "Product not found"}) : res.status(200).json(product);
});

//Eliminar producto por id
app.delete('/api/products/:proId', (req, res) => {
  const { proId } = req.params;
  const deleted = data.find(prod => prod.id == proId);
  if(deleted){
    data = data.filter(prod => prod.id !== proId);
    res.status(200).json(deleted);
  } else {
    res.status(404).json({
      message: "no existe"
    });
  }
});

 //res.send('POST request to the homepage')

app.post('/api/products/product', (req, res) => {
  const objNew = req.body;
  

  const newId = data.map(product => product.id);
  const findIndex = (arr) => {
    arr.sort((a,b) => a - b);
    arr.map(element => parseInt(element));
    for (let i=1; i<arr.length; i++){
      if (arr[i]-1 !== arr[i - 1]){
        return arr[i] - 1
      }
    }
    return arr[arr.length - 1] + 1;
  }

  objNew.id = findIndex(newId);
  data.push(objNew)
  res.status(201).json(objNew)
});
//#############################################################
app.get("/info", (req, res) => {
  res.send(info);
});

app.get("/about", (req, res) => {
  res.json(personalInfo);
});

app.listen(port, () => {
  console.log("server running");
});
