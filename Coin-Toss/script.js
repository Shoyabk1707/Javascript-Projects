let coin = document.querySelector(".coin");
let btn = document.querySelector(".flip-btn");

btn.addEventListener("click", ()=>{
    let i = Math.floor(Math.random() * 2);
    console.log(i);

    coin.style.animation = "none";

    if(i){
        setTimeout(function(){
            coin.style.animation = "spin-heads 3s forwards";
            // console.log(coin.style.animation);
        },100);
    }
    else{
        setTimeout(function(){
            coin.style.animation = "spin-tails 3s forwards";
            // console.log(coin.style.animation);
        },100);
    }

    disableBtn();
});

function disableBtn(){
    btn.disabled  = true;
    setTimeout( function(){
        btn.disabled = false;
    }, 3000)
}