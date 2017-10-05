


var res=new Promise(function(resolve,reject){

    setTimeout(function() {
        resolve(123);
    }, 200);

})


res.then(function(num){
    console.log(num);
})

res.then(function(num){
    console.log(num);
})