class Ui {
    constructor(){
        console.log("dziala")
    }
    changingLights()
    {
        $("#position").on("input",()=>
        {
            console.log(new Level3D().lights);
        })
    }
}