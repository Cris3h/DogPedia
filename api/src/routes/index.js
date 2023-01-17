const { Router } = require('express');
const router = Router();


const axios = require('axios')
const { Temperament, Dog } = require('../db')
const { api, key } = require('../utils')
const { getDetailsDogs, getAllDogs, getDetailDogsDb } = require('../controllers/dataController')




router.get('/dogs', async (req, res) => {
    const { name } = req.query;
    const allBreads = await getAllDogs();

    if (name) {
        try {
            const dogByName = allBreads.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            dogByName
                ? res.status(200).json(dogByName)
                : res.status(400).send('FFFF ')
        } catch (err) {
            console.error(err)
        }
    }
    else {
        res.status(200).json(allBreads)
    }
});


router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params;

    if (!id.includes('-')) {
        const dogApiDetails = await getDetailsDogs(id);
        const dogId = dogApiDetails.filter(e=> e.id == id)
        res.status(200).json(dogId)
    }
    else {
        res.status(200).json(await getDetailDogsDb(id))
    }
})

router.get('/temperaments', async (req, res) => {

    
    const apiCall = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${key}`)

    const temperaments = apiCall.data.map(t => t.temperament);

    const temps = temperaments.toString().split(',') // ASI TRAIGO 127 TEMPERAMENTOS BIEN ORDENADOS.
    // const temps = temperaments.toString().split(', ')  // ASI TRAIGO 242 DES-ORDENADOS.

    temps.forEach(el => {
        let i = el.trim() 
        Temperament.findOrCreate({
            where: { name: i }
        })
    })
    const allTemps = await Temperament.findAll();
    // console.log('esto es allTEMPS --------->  ', allTemps)
    res.send(allTemps)
})



router.post('/dogs', async (req, res) => {
    let {
        name,
        image,
        temperaments,
        weight_min,
        weight_max,
        height_min,
        height_max,
        life,
    likes } = req.body

        if (!name) return res.json({ Problem: 'name is mandatory! please choose one!' });
        const notNewDog = await Dog.findOne({ where: { name: name } })
        if (notNewDog) return res.json({ Problem: 'that breed is already created, try another one please!' })

        let newDog = await Dog.create({
            name,
            image: image ? image : 'https://cdn.mexperience.com/wp-content/uploads/StreetDog-750x375.jpeg',
            weight_min,
            weight_max,
            height_min,
            height_max,
            life,
            likes
        })
console.log(newDog)
        await Promise.all(temperaments.map(async e => {
            console.log('log temperaments -->', temperaments)
            await newDog.addTemperament([
                (await Temperament.findOrCreate({
                    where: {
                        name: e
                    }
                }))[0].dataValues.id
            ])
        }))

// console.log('esto es creado ---> ', newDog)

    let asociateTemperaments = await Dog.findOne({
        where: { 
            name: name 
        },
    include: {
        model: Temperament,
        attributes: ['name'],
        through: {
            attributes: []
        }
    }
})

// console.log('esto es asociateTemperaments', asociateTemperaments)
res.status(200).send(asociateTemperaments)

}
)


module.exports = router;
