require("bootstrap-webpack");

class View {
    constructor($context) {
        this.$context = $context;
        this.$element = null;
        this.controller = null;
    }
    render() {
        this.$element = $(require("./view.handlebars.html")());
        this.$context.append(this.$element);
        this.$element.find(".ctrl-create-dashboard").click(() => this.getController().create(
                    this.$element.find(".ctrl-name").val(),
                    this.$element.find(".ctrl-description").val()));
        this.updateTable();
    }
    updateTable() {
        this.$element.find(".ctrl-list")
                .empty().append($(require("./list.handlebars.html")(this.getController())))
    }
    setController(controller) {
        this.controller = controller;
        return this;
    }
    getController() {
        return this.controller;
    }
}
module.exports = View;
