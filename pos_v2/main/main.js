'use strict';

function printReceipt(inputs){
    let list = Item.all();
    let discount = Promotion.all();
    let sum = 0;
    let save = 0;
    let n, y, r, h, m, s;
    let d = new Date;
    n=d.getFullYear();
    y=d.getMonth()+1;
    r=d.getDate();
    h=d.getHours();
    m=d.getMinutes();
    s=d.getSeconds();
    if (y<10){
        y='0'+y;
    }
    else if (r<10){
        r='0'+r;
    }
    else if (h<10){
        h='0'+h;
    }
    else if (m<10){
        m='0'+m;
    }
    else if (s<10){
        s='0'+s;
    }
    let str = '***<没钱赚商店>收据***' + '\n';
    str = str + '打印时间：' + n + '年' + y + '月' + r +'日'+ ' ' + h + ':' + m + ':' + s + '\n';
    str = str + '----------------------' + '\n';
    for(let i=0; i<inputs.length; i++)
    {
        inputs[i]=inputs[i].split('-');
    }
    for(let i=0; i<list.length; i++)
    {
        let n = 0;
        if(list[i].unit=='斤')
        {
            for(let j=0; j<inputs.length; j++)
            {
                if(list[i].barcode == inputs[j][0])
                {
                    n=n+Number(inputs[j][1]);
                }
            }
        }
        else
        {
            for(let j=0; j<inputs.length; j++)
            {
                if(list[i].barcode == inputs[j][0])
                {
                    n++;
                }
            }
        }
        list[i].count = n;   
        list[i].total =  list[i].count*list[i].price;
    }
    for(let i=0; i<discount.length; i++)
    {
        if(discount[i].type == 'BUY_TWO_GET_ONE_FREE')
        {
            for(let k=0; k<discount[i].barcodes.length; k++)
            {
                for(let j=0; j<list.length; j++)
                {
                    if(discount[i].barcodes[k] == list[j].barcode)
                    {
                        let m = Math.floor(list[j].count/3)*list[j].price
                        save = save + m;
                        list[j].total = list[j].total - m;
                    }
                }
            }
        }
        
    }
    for(let i=0; i<list.length; i++)
    {
        if (list[i].count == 0)
            continue;
        else
        {
            str = str + '名称：' + list[i].name + '，' + '数量：' + list[i].count + list[i].unit +'，' + '单价：' + parseFloat(list[i].price).toFixed(2) + '(元)' +'，' + '小计：' + parseFloat(list[i].total).toFixed(2) +  '(元)' + '\n';
            sum = sum + list[i].total;
        }
        
    }
    str = str + '----------------------' + '\n';
    str = str + '总计：' + parseFloat(sum).toFixed(2) +  '(元)' + '\n';
    str = str + '节省：' + parseFloat(save).toFixed(2) +  '(元)' + '\n';
    str = str + '**********************';
    console.log(str);
}
