class Model {
    constructor(id) {
        this.id = id;
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setDescription(description) {
        this.description = description;
    }
    getDescription() {
        return this.description;
    }
    setDateCreation(dateCreation) {
        this.dateCreation = dateCreation;
    }
    getDateCreation() {
        return this.dateCreation;
    }
    guid() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
                this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }
    s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
    }
    toString() {
        return  `id: ${this.id} /nName: ${this.name} /nDescription: ${this.description}`;
    }
}
module.exports = Model;
