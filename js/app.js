/**
 * Скрипт сначала создает JSON по заданному шаблону.
 * 
 * Затем производится поиск и запись typeobj и их колличество
 * 
 * В html выводится сам JSON, а в консоли общий подсчет
 */

//Все typeobj
let types = [100, 200, 300, 400, 500, 600, 700, 800, 900];

//Инициализация объекта
let a = {
    "typeobj": types[Math.floor(Math.random() * types.length)],
	"nameobj": 'enterprise1',
    "childs":[]
};

//Генерация колличества древа
function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min)) + min;
}

let child = new Array();
let subChild = new Array();
let childCount = getRandomInt(10, 20);

//Заполнение JSON
for (let i=1; i<=childCount; i++)
{    
    let type = types[Math.floor(Math.random() * types.length)];

    for (let j=1; j <= getRandomInt(0, 5); j++)
    {
        let subType = types[Math.floor(Math.random() * types.length)];
        subelement = {"typeobj":subType, "nameobj":"suboilfield"+j, "childs": []};
        subChild.push(subelement);           
    }
        
    element = {"typeobj":type, "nameobj":"oilfield"+i, "childs": subChild};
    child.push(element);
    subChild = [];
}

a["childs"] = child;

//ВЫВОД JSON в двух видах
//console.log(JSON.stringify(a, undefined, 2));
document.getElementById("demo").textContent = JSON.stringify(a, undefined, 2);

//=================================================================================

var result = new Array(); 
var countResult = 0;
function getUniqueValue(value)
{
    //первая запись
    if (result.length == 0)
    {
        result[countResult] = new Array();
        result[countResult][0] = value;
        result[countResult][1] = 1;
    }
    //последующая запись
    else
    {
        let findValue = -1;

        //Поиск typeobj в массиве
        for (let i = 0; i < result.length; i++)
        {
            if (result[i][0] == value)
            {
                findValue = i;
            }
        }

        //Если есть typeobj в массиве, то... Иначе создается следующие 2 ячейки
        if (findValue > -1)
        {
            result[findValue][1] += 1;
        }
        else
        {
            result.push(value);
            result[result.length-1] = new Array();
            result[result.length-1][0] = value;
            result[result.length-1][1] = 1;

        }
    }
}
function sortFun(a,b)
{
    if (a[0] === b[0])
    {
        return 0;
    }
    else
    {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

//Поиск всех typeobj
getUniqueValue(a.typeobj, a.childs.length);

for (let i = 0; i < a.childs.length; i++)
{
    getUniqueValue(a.childs[i].typeobj);
    for (let j = 0; j < a.childs[i].childs.length; j++)
    {
        getUniqueValue(a.childs[i].childs[j].typeobj);
    }              
}
let objenterprise = JSON.parse(JSON.stringify(a.childs));


//Сортировка по позрастанию типов
result.sort(sortFun);

//b - ответ в JSON 
let b = {};
let resultCount = result.length;
for (let i = 0; i < resultCount; i++)
{
    b[i+1] = {"typeobj":result[i][0],"count":result[i][1]}
}

//ВЫВОД в двух выдах
console.log(JSON.stringify(b, undefined, 2));
//document.getElementById("demo").textContent = JSON.stringify(b, undefined, 2);