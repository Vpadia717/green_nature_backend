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
                return response.status(200).send({ msg: 'register successfully' })
            })
            .catch((error) => {
                console.log('Error creating new user:', error);
                return res.status(400).send({ message: error.errorInfo.message })
            });
    }
})

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