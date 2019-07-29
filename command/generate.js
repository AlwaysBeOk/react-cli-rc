'use strict';
const fs = require('fs');
const path = require('path');

module.exports = (option, name) => {
  // 首字母大写
  let ComponentName = name.replace(/^\w/g, a => a.toUpperCase());
  // 样式component-name
  let className = name.replace(/(\w)([A-Z])/g, '$1-$2').toLowerCase(), dirName = className;
  // 当前所在的文件夹
  let currentpath = process.cwd();   // console.log('__dirname', process.cwd());
  // 模版文件夹所在位置
  let templateFolderPath, p;

  switch (option){
    case 'component':
      p = '../templates/component-template';
      break;
    case 'store':
      p = '../templates/store-template';
      break;
  }
  templateFolderPath = path.resolve(__dirname, p);

  // 生成component
  let gC = (err, files) => {
    //组件文件夹名
    fs.mkdir(`${currentpath}/${dirName}`, ()=> {
      files.forEach(templateName => {
        // 生成文件的名称
        let newComponentName = templateName.replace(/componentName/g, 'index').replace(/.txt/g, '');

        const data = fs
          .readFileSync(`${templateFolderPath}/${templateName}`)
          .toString()
          .replace(/\${ComponentName}/g, ComponentName)
          .replace(/\${component-name}/g, name);
        fs.writeFile(`${currentpath}/${dirName}/${newComponentName}`, data, (err) => {
          if (err) { console.log('writeFileError:', err);throw err;}
          console.log(`${newComponentName}文件已生成`);
        });
      })
      console.log(`The ${name} component is generated!`)
    })
  }

  // 生成store
  let gS = (err, files) => {
    let currentName = name.replace(/^\w/g, a => a.toLowerCase()); // 首字母小写

    // 生成文件的名称
    let newStoreName = files[0].replace(/storeName/g, currentName).replace(/^\w/g, a => a.toLowerCase()).replace(/ts.txt/g, 'state.ts');
      const data = fs
        .readFileSync(`${templateFolderPath}/${files[0]}`)
        .toString()
        .replace(/\${storeName}/g, currentName)
      fs.writeFile(`${currentpath}/${newStoreName}`, data, (err) => {
        if (err) { console.log('writeFileError:', err);throw err;}
        console.log(`${newStoreName}文件已生成`);
      });
    console.log(`The ${currentName} store is generated!`)
  }


  fs.readdir(templateFolderPath, 'utf8', (err, files) => {
    if(err) {console.log('ReadFileErr:',err)}
    if(option === 'component' || option === 'c'){
      gC(err, files);
    }else if(option === 'store' || option === 's'){
      gS(err, files);
    }
  })
};
