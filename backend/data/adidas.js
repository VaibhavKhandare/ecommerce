const fs = require('fs'); 
const {parse} = require('csv-parse');

var data={};
fs.createReadStream('src/constants/data/Adidas final.csv')
    .pipe(parse({delimiter: ';'}))
    .on('data', function(csvrow) {
        // const str = csvrow.split(';');
        // console.log('typeof csvrow', typeof csvrow, csvrow[0])
        const [a,name,id,LP, SP, dis, brand, desc,b,c,imgs] = csvrow;
        // console.log('imgs', JSON.parse(imgs))
        if(!data[id]){
            data[id] = {name,LP,SP,dis, brand,desc, imgs: JSON.parse(imgs)}
        }

        // csvData.push(csvrow);        
    })
    .on('end',function() {
        // temp =csvData;
        fs.writeFileSync('./extracted.json', JSON.stringify(data, null, 2) , 'utf-8');
      console.log('data');
    });
