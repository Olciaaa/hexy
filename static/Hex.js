class Hex{
    constructor() {
        console.log("sztos")
        this.number = 3;
        this.gettingNumber();
        this.hexes = {
            "size":3,
            "level": [
            ]
         }
        this.type = "none";
        this.gettingType();
        this.saving();
    }
    gettingNumber()
    {
        $("#amount").on("change",()=>
        {
            //console.log($("#amount")[0].value);
            this.number = parseInt($("#amount")[0].value);
            this.creatingHex(this.number);
            this.hexes = {
                "size":this.number,
                "level" : [

                ]
            }
        })
    }
    gettingType()
    {
        $(".type").on("click",(e)=>
        {
            //console.log(e.target.innerText);
            this.type = e.target.innerText;
        })
    }
    saving()
    {
        $("#save").on("click",()=>
        {
            //console.log(this.hexes);
            net.saving(this.hexes);
        })
    }
    creatingHex(number)
    {
        $("main").empty();
        let id = 0;
        for(let j = 0; j<number; j++)
        {
            for(let i = 0; i < number; i++)
            {
                let hex = $('<div id="'+ id +'" class="hexagon"><span></span></div>');
                let arrow = $('<div id="arrow"></div>');      
                hex.append(arrow);          
                $("main").append(hex);
                hex[0].style.left = i * 95 + "px";
                if(i % 2 != 0)
                {
                    hex[0].style.top = j * 105 + 50 + "px";
                }
                else
                {
                    hex[0].style.top = j * 105 + "px";
                }
                this.clickingHex(0,hex);
                id++
            }
        }
        
    }
    clickingHex(k,hexx)
    {
        //console.log(hexx);
        hexx.on("click",()=>
        {
            this.clickedHex(hexx,k);
                if(k < 5){k++;}
                else{k=0};
        })
    }
    clickedHex(hex,i)
    {
        //console.log(this.hexes)
        if(this.type == "none")
        {
            let arrow = $('<div id="arrow">' + i + ' </div>');
            arrow.css('transform', 'rotate(' + 60 * i +'deg)');
            let img = $("<img src = 'pictures/arrow.png' width ='30px' height = '30px'>");
            arrow.append(img);
            let del = hex.find("div");
            del.replaceWith(arrow);
            //console.log(hex[0].id)
    
            let saved = false;
            this.hexes.level.forEach(element => {
                if(element.id == hex[0].id)
                {
                    saved = true;
                    element.dir = parseInt(hex.find("div")[0].innerText)
                }
            });
            if(saved == false)
                {
                    this.hexes.level.push({
                        "id": hex[0].id,
                        "x": hex[0].style.left,
                        "z": hex[0].style.top,
                        "dir": parseInt(hex.find("div")[0].innerText),
                        "type": "wall"
                     })
                }
            //console.log(JSON.stringify(this.hexes.level))
        }

        else if(this.type != "none")
        {
            this.hexes.level.forEach(element => {
                if(element.id == hex[0].id)
                {
                    //console.log(this.type)
                    element.type = this.type;
                }
            });
            this.type = "none";
        }
        $("#text").text("size: " + this.hexes.size + "\n" + JSON.stringify(this.hexes.level))
    }
}