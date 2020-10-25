'use strict';

function printReceipt(inputs) {
    var list='***<没钱赚的商店>收据***';
    var sum=0;
    for(var i=0;i<inputs.length;i++){
    list=list+'\n'+'名称：'+inputs[i].name+'，'+'数量：'+inputs[i].count+inputs[i].unit+'，'+'单价：'+inputs[i].price+'.00'+'(元)'+'，'+'小计：'+inputs[i].count*inputs[i].price+'.00'+'(元)';
    sum+=inputs[i].count*inputs[i].price;
    }
    console.log(list+'\n'+'----------------------------'+'\n'+'总计：'+sum+'.00'+'\n'+'***************************');
}



