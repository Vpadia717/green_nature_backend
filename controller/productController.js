const addfertlizerproducts = async (req, res, next) => {
    try {
        const id = "fertilizer";
        const data = req.body;
        const productRef = db.collection('products').doc('fertilizer');
        // const snapshot = await peopleRef.get();
        // const list = snapshot.docs.map((doc) => ({ ...doc.data() }));
        productRef.collection('fertlilizerproducts').doc().set(data, { merge: true });
        res.send("Added: " + data);
    } catch (error) {
        next(error);
    }
}



const addplantproducts = async (req, res, next) => {
    try {
        const id = "plant";
        const data = req.body;
        const peopleRef = db.collection("products").doc('plant');
        // const snapshot = await peopleRef.get();
        // const list = snapshot.docs.map((doc) => ({ ...doc.data() }));
        peopleRef.doc(id).collection('plantproducts').doc().set(data, { merge: true });
        res.send("Added: " + data);
    } catch (error) {
        next(error)
    }
}




const addtoolsproducts = async (req, res, next) => {
    try {
        const id = "tools";
        const data = req.body;
        const peopleRef = db.collection("products").doc('tool');
        // const snapshot = await peopleRef.get();
        // const list = snapshot.docs.map((doc) => ({ ...doc.data() }));
        peopleRef.doc(id).collection('toolproducts').doc().set(data, { merge: true });
        res.send("Added: " + data);
    } catch (error) {
        next(error)
    }
}


const updatefertilizerproducts = async (req, res, next) => {
    try {
        const id = "fertilizer";
        // const pid = req.body.id;
        const data = req.body;
        const peopleRef = db.collection("products");
        respond = await peopleRef.doc(id).collection('fertlilizerproducts').doc('QkUhuvNhTQqKXJ1lvYds').update(data, { merge: false });
        return res.status(200).send(respond);
    } catch (err) {
        next(err);
    }
}

const updateplantproducts = async (req, res, next) => {
    try {
        const id = "plant";
        // delete req.body.id;
        const data = req.body;
        const peopleRef = db.collection("products");
        respond = await peopleRef.doc(id).collection('plantproducts').doc().update(data, { merge: false });
        res.send(respond);
    } catch (err) {
        next(err);
    }
}



const updatetoolsproducts =async(req,res,next)=>{
    try {
        const id = "tool";
        delete req.body.id;
        const data = req.body;
        const peopleRef = db.collection("products");
        respond = await peopleRef.doc(id).collection('toolproducts').doc().update(data, { merge: false });
        res.send(respond);
    } catch (err) {
        next(err);
    }
}


module.exports(addfertlizerproducts,addplantproducts,addtoolsproducts,updatefertilizerproducts,updateplantproducts,updatetoolsproducts);