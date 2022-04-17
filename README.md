# Valex 💳
## Benefit cards for companies and employees!

### :computer: Tech used
<p>
	<img src="https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white"/>
	<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
	<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
	<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
	<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>
	<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
</p>

## Overview
An API to store benefit cards from companies to employees and log transactions.

## :hammer_and_wrench: Installation
### Make sure you have the following tools installed before you begin:
<p>
	<a href="https://git-scm.com/"><img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white"/></a>
	<a href="https://www.npmjs.com/package/npm"><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/></a>
	<a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/></a>
	<a href="https://www.postgresql.org/download/"><img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/></a>
</p>
<p>Not needed but recommended: <a href="https://code.visualstudio.com/">VSCode</a></p>


Use a terminal interface such as bash or zsh, and enter the following:
```bash
#download
gh repo clone fMagVen/Valex

#access the folder you downloaded it to
cd valex

#install dependencies
npm i

#install the db
bash /database/create-database
```
The app will run locally and you must configure a ```.env``` file with a port of your choosing. The default one is 5000.

## :gear:Running
```bash
#you can run the server with
npm run dev
```
In another terminal instance, run the db
```bash
#you can start the db running the script 
bash /database/connect-database

#in case you need to reset the data, run
bash /database/destroy-database
#then rerun the create-database script
```

## :scroll:Documentation

### All requests are HTTP based

#### ```POST /cards/new```

Add new card to employee. Send header 'x-api-key' with value of the desined API Key of the company and body JSON with the following:

{

	type: string, one of the following: 'groceries', 'restaurants', 'transport', 'education', 'health'
	cpf: cpf of employee, string containing only numbers

}

Employees can only have one card of each type. A successful request will create and return the created card data. It is important to store the information safely, as some sensitive data will be stored encrypted and will not be possible to be retrieved later, in case of loss the lost card will have to be deleted and a new card created.