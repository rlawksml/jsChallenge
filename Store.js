const Store = {
    save(id, data){
        localStorage.setItem(id, JSON.stringify(data))
    },
    load(id){
        return JSON.parse(localStorage.getItem(id))
    }
}


export default Store