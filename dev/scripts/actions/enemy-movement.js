export const index_of_every = (item, array) => {
    let indeces = [], i = -1
    while ((i = arr.indexOf(item, i + 1)) !== -1) {
        indeces.push(i)
    }
    return indeces
}