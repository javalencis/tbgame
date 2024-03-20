let text = document.querySelector(".msn-cupon").innerHTML
let btCopy = document.querySelector(".content-cupon")



const copy = async()=>{
    try {
        await navigator.clipboard.writeText(text)
    } catch (error) {
        console.log(error);
    }
}
btCopy.addEventListener('click',copy)