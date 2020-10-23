'use strict';
const fs = require('fs');
const path = require('path');

module.exports = (schematic, name, languageType) => {
  // 首字母大写
  let ComponentName = name.replace(/^\w/g, a => a.toUpperCase());
  // 文件夹目录名component-name
  let dirName = name.replace(/(\w)([A-Z])/g, '$1-$2').toLowerCase();
  // 当前所在的文件夹
  let currentpath = process.cwd();
  // 模版文件夹所在位置
  let templateFolderPath, p;

  let middlefix = languageType? languageType: 'js';

  switch (schematic){
    case 'component':
      p = `../templates/${middlefix}-templates/component-template`;
      break;
    case 'c':
      p = `../templates/${middlefix}-templates/component-template`;
      break;
    case 'store':
      p = `../templates/${middlefix}-templates/store-template`;
      break;
    case 's':
      p = `../templates/${middlefix}-templates/store-template`;
      break;
    case 'service':
      p = `../templates/${middlefix}-templates/service-template`;
      break;
    default:
      console.error('Don`t exist schematic type!')
      return;

  }
  templateFolderPath = path.resolve(__dirname, p);

  // 生成component
  let gComponent = (err, files) => {
    //组件文件夹名
    fs.mkdir(`${currentpath}/${dirName}`, ()=> {
      let fileLength = 0;
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
          fileLength++;

          if(fileLength === files.length) {
            console.log(`The ${name} component is generated!`)
          }
        });
      })
    })
  }

  // 生成store \service
  let gS = (err, files, typeName, suffix) => {
    let currentName = name.replace(/^\w/g, a => a.toLowerCase()), // 首字母小写
        regexp = new RegExp(`${typeName}`, 'g'),
        className = new RegExp('\\${'+ typeName +'}', 'g');
    // 生成文件的名称
    let newName = files[0].replace(regexp, currentName)
      .replace(/^\w/g, a => a.toLowerCase())
      .replace(/ts.txt/g, `${suffix}.ts`);
    const data = fs
      .readFileSync(`${templateFolderPath}/${files[0]}`)
      .toString()
      .replace(className, currentName);
    fs.writeFile(`${currentpath}/${newName}`, data, (err) => {
      if (err) { console.log('writeFileError:', err);throw err;}
      console.log(`${newName}文件已生成`);
    });
    console.log(`The ${currentName} ${suffix} is generated!`)
  }

  fs.readdir(templateFolderPath, 'utf8', (err, files) => {
    if(err) {console.log('ReadFileErr:',err)}
    if(schematic === 'component' || schematic === 'c'){
      gComponent(err, files);
    }else if(schematic === 'store' || schematic === 's'){
      gS(err, files, 'storeName', 'state');
    } else if(schematic === 'service'){
      gS(err, files, 'serviceName', 'service');
    }
  })
};
