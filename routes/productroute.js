const express= require('express');
const route = express.Router();
const  {addfertlizerproducts,addplantproducts,addtoolsproducts,updatefertilizerproducts,updateplantproducts,updatetoolsproducts}= require('../controller/productController')

route.post("/addtoolsproducts", addtoolsproducts);
route.post("/addplantproducts", addplantproducts); 
route.post("/addfertlizerproducts",addfertlizerproducts);

route.put("/updatetoolsproducts", updatetoolsproducts);
route.put("/updateplantproducts", updateplantproducts);
route.put("/updatefertilizerproducts",updatefertilizerproducts);
