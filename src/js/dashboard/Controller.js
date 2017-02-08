const Model = require("./Model");
const View = require("./View");
const Dao = require("./Dao");

class Controller {
    constructor($context) {
        this.view = new View($context).setController(this);
        this.dao = new Dao().setController(this);
    }
    render() {
        this.view.render();
        return this;
    }
    create(name, description) {
        const item = new Model();
        item.setId(item.guid());
        item.setName(name);
        item.setDescription(description);
        item.setDateCreation(new Date());
        this.dao.create(item);
        this.view.updateTable();
        return item;
    }
    read(id) {
        return id ? this.dao.read(id) : this.dao.readAll();
    }
    update(id, name, description) {
        const item = new Model();
        item.setId(id);
        item.setName(name);
        item.setDescription(description);
        item.setDateCreation(new Date());
        this.dao.update(item);
        return item;
    }
    delete(id) {
        const item = new Model();
        item.setId(id);
        this.dao.delete(item);
        return item;
    }
}
module.exports = Controller;