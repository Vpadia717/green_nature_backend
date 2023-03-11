const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { dbFirestore, dbRealtime } = require("./server");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/  ", (req, res) => {
  res.send("Hello World");
});

app.get("/categories", async (req, res, next) => {
  try {
    const peopleRef = dbFirestore.collection("Categories");
    const snapshot = await peopleRef.get();
    const list = snapshot.docs.map((doc) => ({ ...doc.data() }));
    var keys = Object.values(list);
    console.log(typeof(keys));
    res.send(keys);
  } catch (err) {
    next(err);
  }
});

app.put("/addfertlizerproducts", async (req, res) => {
  const id = "fertilizer";
  const data = req.body;
  const peopleRef = dbFirestore.collection("Categories");
  const snapshot = await peopleRef.get();
  const list = snapshot.docs.map((doc) => ({ ...doc.data() }));
  peopleRef.doc(id).set(data, { merge:  true });
  res.send("Added: " + data);
});

app.put("/updatefertilizerproducts", async (req, res, next) => {
  try {
    const id = "fertilizer";
    delete req.body.id;
    const data = req.body;
    const peopleRef = dbFirestore.collection("Categories");
    respond = await peopleRef.doc(id).update(data, { merge: true });
    res.send(respond);
  } catch (err) {
    next(err);
  }
});

app.put("/deletefertlizerproducts", async (req, res, next) => {
  try {
    const FieldValue = require("firebase-admin").firestore.FieldValue;
    const id = "fertilizer";
    const data = req.query.search_query;
    const peopleRef = dbFirestore.collection("Categories").doc(id);
    const respond = await peopleRef.update({ [data]: FieldValue.delete() });
    res.send(respond);
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
