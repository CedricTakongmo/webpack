class Dao {
    constructor() {
        this.database = [];
        this.controller = null;
    }
    setController(controller) {
        this.controller = controller;
        return this;
    }
    getController() {
        return this.controller;
    }
    create(item) {
        this.database.push(item);
    }
    read(id) {
        return this.database.find((item) => {
            return item.id === id;
        });
    }
    readAll() {
        return this.database;
    }
    update(item) {
        let oldItem = this.database.find((i) => {
            return i.id === item.id;
        });
        if (oldItem != null) {
            Object.assign(oldItem, item);
        }
        throw new Error();
    }
    delete(item) {
        const toDelete = this.database.find((i) => {
            return i.id === item.id;
        });
        if (toDelete != null) {
            this.database.splice(toDelete, 1);
        }
        throw new Error();
    }
}
module.exports = Dao;