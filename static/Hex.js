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
            let arr = [];
            if(this.hexes.level.length > 0)
            {
                this.hexes.level.forEach(e => {
                    let hexX = parseInt(e.x.split("p")[0]);
                    let hexZ = parseInt(e.z.split("p")[0]);
                    arr.forEach(element => {
                        let elX = parseInt(element.x.split("p")[0])
                        let elZ = parseInt(element.z.split("p")[0])
                        //console.log(hexX, elX);
                        let hexIn = e.dirIn;
                        console.log(hexIn);
                        if(e.id != element.id)
                        {
                            console.log(hexX);
                            console.log(elX);
                            if(hexX == elX && elZ < hexZ && hexIn == "3")
                            {
                                console.log(element)
                                element.dirOut = "0";
                            }
                            else if(hexX == elX && elZ > hexZ && hexIn == "3")
                            {
                                element.dirOut = "3";
                            }
                            else if(((hexZ == elZ + 50)||(hexZ == elZ + 55)) && elX < hexX && (hexIn == "4" || hexIn == "1"))
                            {
                                element.dirOut = "1";
                            }
                            else if(((hexZ == elZ + 50)||(hexZ == elZ + 55)) && elX > hexX && (hexIn == "2" || hexIn == "5"))
                            {
                                element.dirOut = "5";
                            }
                            else if(((hexZ == elZ - 50)||(hexZ == elZ - 55)) && elX < hexX && (hexIn == "5" || hexIn == "2"))
                            {
                                element.dirOut = "2";
                            }
                            else if(((hexZ == elZ - 50)||(hexZ == elZ - 55)) && elX > hexX && (hexIn == "4" || hexIn == "1"))
                            {
                                element.dirOut = "4";
                            }
                        }
                        
                    });
                    arr.push(e)
                });
                    
                net.saving(this.hexes);  
                    
            }
            
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
            arrow.css('transform', 'rotate(' +  (-60 * i) +'deg)');
            let img = $("<img src = 'pictures/arrow.png' width ='30px' height = '30px'>");
            arrow.append(img);
            let del = hex.find("div");
            del.replaceWith(arrow);
            
            let dirIn = parseInt(hex.find("div")[0].innerText);
            let dirOut;
            let findingDir = ()=>
            {
                if(dirIn<3)
                {
                    dirOut = dirIn + 3
                }
                else
                {
                    dirOut = dirIn - 3;
                }
                //console.log(this.hexes)
                
            }
    
            let saved = false;
            this.hexes.level.forEach(element => {
                if(element.id == hex[0].id)
                {
                    saved = true;
                    findingDir();
                    element.dirOut = dirOut;
                    element.dirIn = dirIn;
                }
            });
            if(saved == false)
                {
                    findingDir();
                    this.hexes.level.push({
                        "id": hex[0].id,
                        "x": hex[0].style.left,
                        "z": hex[0].style.top,
                        "dirOut": dirOut,
                        "dirIn":dirIn,
                        "type": "light"
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