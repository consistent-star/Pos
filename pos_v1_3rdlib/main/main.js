'use strict';

function printReceipt(tags) {
    var arr = loadAllItems();
    arr.forEach(e => {
        e.count = 0;
        tags.forEach(x => {
            if (x.length === 10) {
                if (x === e.barcode) {
                    e.count++;
                }
            } else {
                var s = x.split("-");
                if (s[0] === e.barcode) {
                    e.count += parseInt(s[1]);
                }
            }
        })
    })

    var str = arr.filter(e => {
        if (e.count > 0) {
            return true;
        }
    })
    console.log(str);
    print(str);

    function print(inputs) {
        var firstline = '***<没钱赚商店>收据***',
            lastline = '**********************',
            line = '----------------------';
        var arr = [],
            Name = '名称：',
            Count = '数量：',
            Price = '单价：',
            yuan = '(元)',
            total = "小计：",
            comma = '，',
            Comma = ",",
            all = "总计：",
            save = '节省：'
            ;

        var sum = 0;
        var sumall = 0;
        arr.push(firstline + '\x0a');
        inputs.forEach(e => {
            sumall += e.price * e.count;
            e.price = e.price.toFixed(2);
            var temp = e.price * e.count;

            var p = loadPromotions();
            console.log(p);
            p[0].barcode.forEach(x => {
                if (x === e.barcode) {
                    temp = temp - parseInt(e.count / 3) * e.price;
                }
            });
            arr.push(Name + e.name + comma + Count + e.count + e.unit + comma + Price + e.price + yuan + comma + total + temp.toFixed(2) + yuan + '\x0a');
            sum += temp;
        });
        arr.push(line + '\x0a');
        sum = sum.toFixed(2);
        var num = (sumall - sum).toFixed(2);
        arr.push(all + sum + yuan + '\x0a');
        var s = save + num + yuan + '\x0a' + lastline + '';
        var str = arr.join("").concat(s);

        console.log(str);

    }
}