//--------------------- FILTRADOS -------------------------------//

//---------------- ORDENAMIENTOS------------------------//

const lowerToHigher = (payload) => {
    const order = payload.filter(e=> e.weight_max).sort((a, b) => {
        if (a.weight_max && b.weight_max) {
            // console.log('esto es a.weight_max ---> ', a.weight_max)
            if (parseInt(a.weight_max) > parseInt(b.weight_max)) return 1
            if (parseInt(a.weight_max) < parseInt(b.weight_max)) return -1
            return 0
        }
    })
    return order;
}

const higherToLower = (payload) => {
    const order = payload.filter(e=> e.weight_max).sort((a, b) => {
        if (a.weight_max && b.weight_max) {
            if (parseInt(a.weight_max) < parseInt(b.weight_max)) return 1
            if (parseInt(a.weight_max) > parseInt(b.weight_max)) return -1
            return 0
        }
    })
    return order;
}



export function orderByWeight(allDogs, payload) {
    const order = [...allDogs]
    return payload === 'Min-Max'
        ? lowerToHigher(order)
        : higherToLower(order)
}


const aToZ = (payload) => {
    return payload.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
        return 0
    })
}
const zToA = (payload) => {
    return payload.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
        return 0
    })
}

export function orderByAlphabet(allDogs, payload) {
    const order = [...allDogs]
    return payload === 'A-Z'
        ? aToZ(order)
        : zToA(order)
}

