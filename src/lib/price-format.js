export default function getFormattedPrice(Price){
    if(Price == null){
        return "N/A";
    }


//is price is a valid number
const priceInNumber = Number(Price); //NaN

if(isNaN(priceInNumber)){
    return "N/A"
}else{

    return "LKR"+priceInNumber.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})
}

}