require ('dotenv').config();
const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const { getAuth } = require('firebase-admin/auth')
const port = process.env.PORT||1236
const { db } = require('./firebase.js')
const cors = require('cors')
const { firebase } = require('firebase-admin')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const userrouter = require('./routes/userRoute');
const productrouter = require('./routes/productRoute');

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({
  secret: "<your-secret>",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));



console.log("this is connection of database" + db)
app.get('/', (req, res) => {
    res.send("hello world")
})

app.use('/api/user',userrouter)
app.use('/product/product',productrouter)

app.post('/signup', async (req, res) => {

    const { password, email } = req.body
    // var responseSign= {
    //     status:false,
    //     message:'your field missing'
    // }  
    if (!password || !email) {
        return res.status(400).send({ message: 'Missing fields' })
    }
    else {

        getAuth()
            .createUser({
                email: email,
                password: password,
                emailVerified: false,
                disabled: false,
            })
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully created new user:', userRecord.uid);
                return res.status(200).send({ msg: 'register successfully' })
            })
            .catch((error) => {
                console.log('Error creating new user:', error);
                return res.status(400).send({ message: error.errorInfo.message })
            });
    }
})

app.get("/loginwithgoogle",(req,res)=>{
    const provider =new firebase.getAuth().GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    req.session.firebaseRedirect ="/dashbord";
    firebase.auth().signInWithPopup(provider).then(function(result){
        var token = result.credential.accessToken;
        var user  =result.user;
        console.log("user:"+user)
        console.log(result)
    })
});



app.get('/getalluser', async (req, res) => {
    await getAuth()
        .listUsers()
        .then((getUsersResult) => {
            console.log('Successfully fetched user data:');
            const users = getUsersResult.users.forEach((userRecord) => {
                console.log("user data", userRecord.providerData);
                return userRecord.providerData
            });
            console.log(users)
            return res.status(200).send(users)
        })
        .catch((error) => {
            console.log('Error fetching user data:', error)
        });
})

app.get("/allproducts", async (req, res, next) => {
    try {
        const productRef = db.collection("products").doc('fertilizer').collection('fertilizerproducts');
        const snapshot = await productRef.get();
        const list = snapshot.docs.map((doc) => ({ ...doc.data() }));
        var keys = Object.values(list);
        console.log("product list", list);
        res.send(list);
    } catch (err) {
        next(err);
    }
});


app.get('/products', async (req, res) => {
    const peopleRef = db.collection('products').doc()
    const doc = await peopleRef.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }
    res.status(200).send(doc.data())
})

app.get('/products/:name', (req, res) => {
    const { name } = req.params
    if (!name || !(name in friends)) {
        return res.sendStatus(404)
    }
    res.status(200).send({ [name]: friends[name] })
})

app.post('/addproduct', async (req, res) => {
    const { name, status } = req.body
    const productRef = db.collection('products').doc('plant')
    const res2 = await productRef.set({
        [name]: status
    })
    // friends[name] = status
    res.status(200).send(products)
})

app.put("/addfertlizerproducts", async (req, res, next) => {
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
});

app.put("/addplantproducts", async (req, res, next) => {
    try {
        const id = "plant";
        const data = req.body;
        const peopleRef = db.collection("products");
        // const snapshot = await peopleRef.get();
        // const list = snapshot.docs.map((doc) => ({ ...doc.data() }));
        peopleRef.doc(id).collection('plantproducts').doc().set(data, { merge: true });
        res.send("Added: " + data);
    } catch (error) {
        next(error)
    }
});

app.put("/addtoolsproducts", async (req, res, next) => {
    try {
        const id = "tools";
        const data = req.body;
        const peopleRef = db.collection("products");
        // const snapshot = await peopleRef.get();
        // const list = snapshot.docs.map((doc) => ({ ...doc.data() }));
        peopleRef.doc(id).collection('toolproducts').doc().set(data, { merge: true });
        res.send("Added: " + data);
    } catch (error) {
        next(error)
    }
});

app.put("/updatefertilizerproducts", async (req, res, next) => {
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
});

app.put("/updateplantproducts", async (req, res, next) => {
    try {
        const id = "fertilizer";
        // delete req.body.id;
        const data = req.body;
        const peopleRef = dbFirestore.collection("Categories");
        respond = await peopleRef.doc(id).collection('plantproducts').doc().update(data, { merge: false });
        res.send(respond);
    } catch (err) {
        next(err);
    }
});

app.put("/updatetoolsproducts", async (req, res, next) => {
    try {
        const id = "fertilizer";
        delete req.body.id;
        const data = req.body;
        const peopleRef = dbFirestore.collection("Categories");
        respond = await peopleRef.doc(id).collection('toolproducts').doc().update(data, { merge: false });
        res.send(respond);
    } catch (err) {
        next(err);
    }
});


app.patch('/changestatus', async (req, res) => {
    const { name, newStatus } = req.body
    const productRef = db.collection('products').doc()
    const res2 = await productRef.set({
        [name]: newStatus
    }, { merge: true })
    // friends[name] = newStatus
    res.status(200).send(products)
})

app.delete('/deleteproduct', async (req, res) => {
    const { name } = req.body
    const peopleRef = db.collection('products').doc()
    const res2 = await peopleRef.update({
        [name]: FieldValue.delete()
    })
    res.status(200).send(products)
})
app.listen(port, () => console.log(`server is running on port: ${port}`))