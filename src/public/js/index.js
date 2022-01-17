var timeLess = 0, second = 60, result, Result = 0;; 
button.addEventListener('click',() => {
    var time = parseInt(document.getElementById("time").value);
    document.getElementById("timeLess").innerHTML = time + ": minutos";
    
    if(time >= 1){
        setInterval(function(){
            second--;
            if(second == 0){
                second = 60;
                timeLess++;
                result = time - timeLess;
                Result = result;
                console.log(result,"done");
                document.getElementById("timeLess").innerHTML = result + ": minutos";
            }
        },1000)
    }else{
        document.getElementById("timeLess").innerHTML = "No hay tiempo introducido";
    }   
});
