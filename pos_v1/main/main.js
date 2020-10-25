function printReceipt(tags) {
    let list = loadAllItems();
    let discount = loadPromotions();
    let sum = 0;
    let save = 0;
    let str = '***<没钱赚商店>收据***' + '\n';
    for (let i = 0; i< inputs.length; i++)
    {
        inputs[i]=inputs[i].split('-');
    }
    list.forEach(function(value){
        let n = 0;
        if(value.unit=='斤')
        {
            inputs.map(function(input){
                if(value.barcode == input[0])
                {
                    n=n+Number(input[1]);
                }
            })
        }
        else
        {
            inputs.map(function(input){
                if(value.barcode == input[0])
                {
                    n++;
                }
            })
        }
        value.count = n;   
        value.total =  value.count*value.price;
        
    })
    discount.map(function(value){
        if(value.type == 'BUY_TWO_GET_ONE_FREE')
        {
                 list.forEach(function(lis)
                {
                    if(value.barcodes.includes(lis.barcode))
                    {
                        let m = Math.floor(lis.count/3)*lis.price
                        save = save + m;
                        lis.total = lis.total - m;
                    }
                })
            
        }
        
    })
    list.forEach(function(value)
    {
        if (value.count == 0)
            return;
        else
        {
            str = str + '名称：' + value.name + '，' + '数量：' + value.count + value.unit +'，' + '单价：' + parseFloat(value.price).toFixed(2) + '(元)' +'，' + '小计：' + parseFloat(value.total).toFixed(2) +  '(元)' + '\n';
            sum = sum + value.total;
        }
        
    })
    str = str + '----------------------' + '\n';
    str = str + '总计：' + parseFloat(sum).toFixed(2) +  '(元)' + '\n';
    str = str + '节省：' + parseFloat(save).toFixed(2) +  '(元)' + '\n';
    str = str + '**********************';
    console.log(str);
    console.log(inputs);
    console.log(list);
}
