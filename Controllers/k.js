// function some(array){
// let sum=0,odd=0
// for(let i=0;i<array.length;i++){
//     if(i%2==0) sum=sum+array[i]
//     //console.log(sum)
//     else odd=odd+array[i]
// }
// return sum-odd
// }
// console.log(some([1,2,3,4]))

let hare=(a,b)=>{
console.log("HareKrishna",a+b)
}




let add=((callback)=>{
console.log("ShreeRam")
callback(5,8)
})


add(hare)


let obj={
    "name":"ShrreKrishan",
    "PLace":"Vrindavan"
}
console.log(Object.keys(obj))


function trimm(value){
    return value.trim().length
}
console.log(trimm(" "))