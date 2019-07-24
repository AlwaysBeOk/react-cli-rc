#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path')) //注册一个遍历src下所有的目录与文件的propmpt

const componentName = {
    type: 'input',
    message: '请设置组件名称:',
    name: 'component',
};
// https://github.com/adelsz/inquirer-fuzzy-path
const placementPath = {
    type: 'fuzzypath',
    name: 'path',
    excludePath: nodePath => nodePath.startsWith('node_modules'),
    // excludePath :: (String) -> Bool
    // excludePath to exclude some paths from the file-system scan
    itemType: 'directory',
    // itemType :: 'any' | 'directory' | 'file'
    // specify the type of nodes to display
    // default value: 'any'
    // example: itemType: 'file' - hides directories from the item list
    rootPath: 'src',
    // rootPath :: String
    // Root search directory
    message: '选择需要存放的位置:',
    default: 'components/',
    suggestOnly: false,
    // suggestOnly :: Bool
    // Restrict prompt answer to available choices or use them as suggestions
};
const promptList = [componentName, placementPath,];

inquirer.prompt(promptList).then(answers => {
    console.log(answers); // 返回的结果
    const { component, path } = answers;
    // 首字母大写
    let ComponentName = component.replace(/^\w/g, a => a.toUpperCase());
    // 样式component-name
    let className = component.replace(/(\w)([A-Z])/g, '$1-$2').toLowerCase();

    let templateFolderPath = './templates/react-template';
    fs.readdir(templateFolderPath, 'utf8', (err, files) => {
        files.forEach(templateName => {
            // 生成文件的名称
            let newComponentName = templateName.replace(/componentName/g, ComponentName).replace(/.txt/g, '');
            const data = fs
                .readFileSync(`${templateFolderPath}/${templateName}`)
                .toString()
                .replace(/\${ComponentName}/g, ComponentName)
                .replace(/\${component-name}/g, className)
            fs.writeFile(`${path}/${newComponentName}`, data, (err) => {
                console.log(err);
                if (err) throw err;
                console.log(`${newComponentName}文件已生成`);
            });
        })

    })
})