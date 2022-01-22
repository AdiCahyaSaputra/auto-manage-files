# auto-manage-files
Sort your files based on extension ".jpg, .docx, .ppt, .png, etc" **AUTO**.
usually used to manage *messy* download folders

You need to install Nodejs-LTS first
<br>
1. For [Pc / Laptop](https://nodejs.org/en/).
2. For Android :
- Install [Termux](https://f-droid.org/en/packages/com.termux/)
- Install Nodejs-LTS
```
$ termux-setup-storage

$ pkg update && pkg upgrade

$ pkg install nodejs-lts
```
- Or see documentaion [Nodejs For Mobile](https://nodejs.org/en/download/package-manager/#android)

**Start Auto Manage Files**
```
$ cd /storage/emulated/0/auto-manage-files
$ node manageFile.js
```
**Paste file path you want to Manage**
```
Manage Folder Path : /storage/emulated/0/Download
```

Now you will see the magic things. If Error, You Can Move File manually lmao
