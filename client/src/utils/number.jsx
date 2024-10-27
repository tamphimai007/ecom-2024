import numeral from "numeral";

export const numberFormat =(num)=>{
    return numeral(num).format('0,0')
}