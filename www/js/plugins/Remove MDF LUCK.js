Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 3; i++) {
        var paramId = i + 2;
        var y2 = y + lineHeight * i;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y2, 160);
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x + 160, y2, 60, 'right');
    }
        var y2 = y + lineHeight * i;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(6), x, y2, 160);
        this.resetTextColor();
        this.drawText(this._actor.param(6), x + 160, y2, 60, 'right');
};
Window_EquipStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        this.drawActorName(this._actor, this.textPadding(), 0);
        for (var i = 0; i < 3; i++) {
            this.drawItem(0, this.lineHeight() * (1 + i), 2 + i);
        };
        this.drawItem(0, this.lineHeight() * (1 + 3), 2 + 4);
    }
};