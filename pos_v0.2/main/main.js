'use strict';

function printReceipt(inputs) {
    var list = loadAllItems();
    var sum = 0;
    var str = '****/<没钱赚的商店/>收据****' + '\n';
    for(let i=0; i<list.length; i++)
    {
        var n = 0;
        for(let j=0; j<inputs.length; j++)
        {
            if(list[i].barcode == inputs[j])
            {
                n++;
            }
        }
        list[i].count = n;
    }
    for(let i=0; i<list.length; i++)
    {
        if (list[i].count == 0)
            continue;
        else
        {
            str = str + '名称：' + list[i].name + ',' + '数量：' + list[i].count + list[i].unit +'，' + '单价：' + parseFloat(list[i].price).toFixed(2) + '(元)' +'，' + '小计：' + parseFloat(list[i].price*list[i].count).toFixed(2) +  '(元)' + '\n';
            sum = sum + list[i].price*list[i].count;
        }
        
    }
    str = str + '----------------------------' + '\n';
    str = str + '总计：' + parseFloat(sum).toFixed(2) + '\n';
    str = str + '***************************';
    console.log(str);
}
