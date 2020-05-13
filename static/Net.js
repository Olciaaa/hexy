class Net{
    constructor() {
        console.log("sztos");
        this.open();
    }
    saving(hexes)
    {
        $.ajax({
            url: "dane", // url post-a na serwerze
            data: {level:JSON.stringify(hexes.level),size: JSON.stringify(hexes.size)}, // przykładowe dane
            type: "POST",
            success: function (data) {
                console.log(data);
                alert("zapisano dane na serwerze");
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    open()
    {
        $("#open").on("click",()=>
        {
            console.log("myk")
            $.ajax({
                url: "open", // url post-a na serwerze
                data: {action:"open"}, // przykładowe dane
                type: "POST",
                success: function (data) {
                   // console.log(data);
                    hex.creatingHex(data.size)
                    data.level.forEach(element => {
                        //console.log($("#" + element.id)[0]);
                        hex.clickingHex(element.dir,$("#" + element.id));
                        $("#" + element.id).click();
                    });
                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                },
            });
        })
    }
}
