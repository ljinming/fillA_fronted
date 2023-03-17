const fs = require('fs-extra');

for (var i = 0; i < 10; i++){
    
    const addr = i 
    
	//将所有地址保存到文件中
      fs.appendFile('message.txt', addr, (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
 }