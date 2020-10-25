'use strict';

function printReceipt(inputs) {
    var sum = 0;
    var str = '****/<没钱赚的商店/>收据****' + '\n';
    for(let i=0; i<inputs.length; i++)
    {
        var n = 1;
        if(i==inputs.length-1)
        {
            inputs[i].count = 1;
        }
        else{
            for(let j=i+1; j<inputs.length; j++)
            {
            
                if(inputs[i].barcode == inputs[j].barcode)
                {
                    n++;
                    inputs[j] = {name: ''};
                }
            }
            inputs[i].count = n;
        }
    }
    for(let i=0; i<inputs.length; i++)
    {
        if (inputs[i].name == '')
            continue;
        else
        {
            str = str + '名称：' + inputs[i].name + ',' + '数量：' + inputs[i].count + inputs[i].unit +'，' + '单价：' + parseFloat(inputs[i].price).toFixed(2) + '(元)' +'，' + '小计：' + parseFloat(inputs[i].price*inputs[i].count).toFixed(2) +  '(元)' + '\n';
            sum = sum + inputs[i].price*inputs[i].count;
        }
        
    }
    str = str + '----------------------------' + '\n';
    str = str + '总计：' + parseFloat(sum).toFixed(2) + '\n';
    str = str + '***************************';
    console.log(str);
}

