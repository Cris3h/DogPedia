const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { api, key } = require('../utils/')



const getAllDogsApi = async () => {
    const apiCall = await axios.get(`${api}${key}`);
    const allData = apiCall.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image.url,
            temperaments: e.temperament,
            weight_min: e.weight.metric[0] ? e.weight.metric.split('-')[0] : 'no info',
            weight_max: e.weight.metric[1] ? e.weight.metric.split('-')[1] : 'no info',
            createdInDb: false
        };
    });
    return allData;
};


const getAllDogsDb = async () => {
    const callDb = await Dog.findAll({
        include: {
            model: Temperament,
            attribute: ['name'],
            throught: {
                attributes: []
            }
        }
    });
    const allDogsDB = callDb.map(e => ({
        id: e.id,
        name: e.name,
        temperaments: e.temperaments.map(e=> e),
        image: e.image,
        weight_min: e.weight_min,
        weight_max: e.weight_max,
        likes: e.likes,
        createdInDb: true,

    }));
    console.log('esto es coso', allDogsDB)
    return allDogsDB;
};


const getAllDogs = async () => {
    const dbData = await getAllDogsDb();
    const apiData = await getAllDogsApi();
    const allInfo = apiData.concat(dbData)
    return allInfo;
};


const getDetailsDogs = async (id) => {
    const apiCall = await axios.get(`${api}${key}`)
    const allData = apiCall.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image.url,
            temperaments: e.temperament,
            weight_min: e.weight.metric[0] ? e.weight.metric.split('-')[0] : 'no info',
            weight_max: e.weight.metric[1] ? e.weight.metric.split('-')[1] : 'no info',
            height_min: e.height.metric[0] ? e.height.metric.split('-')[0] : 'no info',
            height_max: e.height.metric[1] ? e.height.metric.split('-')[1] : 'no info',
            life: e.life_span ? e.life_span : 'information unavailable',
            createdInDb: false
        }
    })
    console.log('esto es allData', allData)
    return allData;
};


const getDetailDogsDb = async (id)=> {
        const dbCall = await Dog.findByPk(id, {
            include: {
                model: Temperament,
                attribute: ['name'],
                throught: {
                    attribute:[],
                }
            }
        })
        // console.log('esto es getDetailDogsDb en /dataController ---> ', dbCall.dataValues)
        // console.log('esto es getDetailDogsDb temperaments en /dataController ---> ', dbCall.dataValues.temperaments)
        // console.log('esto es getDetailDogsDb temperaments [0] en /dataController ---> ', dbCall.dataValues.temperaments[0].dataValues)

console.log('entra aca? /DC ', dbCall.dataValues)

        return {
            id: dbCall.dataValues.id,
            name: dbCall.dataValues.name,
            image: dbCall.dataValues.image,
            temperaments: dbCall.dataValues.temperaments.map((e) => e),
            weight_min: dbCall.dataValues.weight_min,
            weight_max: dbCall.dataValues.weight_max,
            height_min: dbCall.dataValues.height_min,
            height_max: dbCall.dataValues.height_max,
            createdInDb: true,
            life: dbCall.dataValues.life
        }
};




    module.exports = {
        getAllDogs,
        getDetailsDogs,
        getDetailDogsDb
    }




















































            // weight_min: e.weight.metric.split('-')[0] ? e.weight.metric.split('-')[0] : e.weight.metric.split('-')[1],
            // weight_max: e.weight.metric.split('-')[1] ? e.weight.metric.split('-')[1] : e.weight.metric.split('-')[0],
            // height_min: e.height.metric.split('-')[0] ? e.height.metric.split('-')[0] : e.height.metric.split('-')[1],
            // height_max: e.height.metric.split('-')[1] ? e.height.metric.split('-')[1] : e.height.metric.split('-')[0],













// const getDetailDogApi = async (id) => {
//     try {
//         const apiCall = await axios(`${URL}${key}/${id}`)
//         const detailData = apiCall.data.map(e => {
//             return {
//                 id: e.id,
//                 name: e.name,
//                 img: e.image.url,
//                 temperaments: e.temperament,
//                 weight_min: e.weight.metric.split('-')[0] ? e.weight.metric.split('-')[0] : e.weight.metric.split('-')[1],
//                 weight_max: e.weight.metric.split('-')[1] ? e.weight.metric.split('-')[1] : e.weight.metric.split('-')[0],
//                 height_min: e.height.metric.split('-')[0] ? e.height.metric.split('-')[0] : e.height.metric.split('-')[1],
//                 height_max: e.height.metric.split('-')[1] ? e.height.metric.split('-')[1] : e.height.metric.split('-')[0],
//                 life: e.life_span ? e.life_span : 'information unavailable',
//                 createdInDb: false
//             }
//         })
//         // console.log('data detail ----> ', detailData)
//         return detailData;
//     } catch (err) {
//         console.error(err)
//     }
// }

// const getDetailDogsApi = async (id) => {
//     //NO TIENE ID, ES UN OBJETO EL QUE TIENE EL ID
//     try{
//         const apiCall = await axios(`${URL}${key}`);

//        const detailData = {
//             id: apiCall.data.id,
//             name: apiCall.data.name,
//             img: apiCall.data.image.url,
//             temperaments: apiCall.data.temperament,
//             weight_min: apiCall.data.weight.metric.split('-')[0] ? apiCall.data.weight.metric.split('-')[0] : apiCall.data.weight.metric.split('-')[1],
//             weight_max: apiCall.data.weight.metric.split('-')[1] ? apiCall.data.weight.metric.split('-')[1] : apiCall.data.weight.metric.split('-')[0],
//             height_min: apiCall.data.height.metric.split('-')[0] ? apiCall.data.height.metric.split('-')[0] : apiCall.data.height.metric.split('-')[1],
//             height_max: apiCall.data.height.metric.split('-')[1] ? apiCall.data.height.metric.split('-')[1] : apiCall.data.height.metric.split('-')[0],
//             life: apiCall.data.life_span ? apiCall.data.life_span : 'information unavailable',
//             createdInDb: false
//         }
//         return detailData
//     }catch(err){
//         console.error(err)
//     }
// }

// const getDetailDogsDb = async (id)=> {
//     try{
//         const dbCall = await Dog.findByPk(id, {
//             include: {
//                 model: Temperament,
//                 attribute: ['temperament'],
//                 throught: {
//                     attribute:[],
//                 }
//             }
//         })
//         return {
//             //aca va dataValues?
//             id: dbCall.id,
//             name: dbCall.name,
//             img: dbCall.image.url,
//             temperaments: dbCall.temperament,
//             weight_min: dbCall.weight_min,
//             weight_max: dbCall.weight.weight_max,
//             height_min: dbCall.height_min,
//             height_max: dbCall.height_max,
//             life_min: dbCall.life_min ? dbCall.life_min : 'information unavailable',
//             life_max: dbCall.life_max ? dbCall.life_max : 'information unavailable',
//         }
//     }catch(err){
//         console.error(err)
//     }
// };






// module.exports = {
//     getAllDogs,
//     // getDetailDogsApi,
//     // getDetailDogsDb,
// }
