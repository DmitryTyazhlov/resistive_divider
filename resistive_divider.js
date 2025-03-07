let fs = require('fs');
const { readFile, writeFile } = require('fs');
const readline = require('readline');
const nodeProcess = require('process')

const { stdin: input, stdout: output } = nodeProcess;
const rl = readline.createInterface({ input, output });

let path = "./"

const selectionResistors = (vOut, vRef) => {
  let coefficient = vOut / vRef - 1
  fs.readdir(path, function (err, items) {
    let file = './db_resistors.txt';
    readFile(file, 'utf-8', function (err, contents) {
      if (err) {
        console.log(err);
        return;
      }
      let stringValues = contents.split('\n');
      let numberValuel = [];
      stringValues.forEach(function (item, i, arr) {
        if (item.includes("mΩ")) {
          numberValuel.push(parseFloat(item, 10)/1000);
        } else if (item.includes("kΩ")) {
          numberValuel.push(parseFloat(item, 10)*1000);
        } else if (item.includes("MΩ")) {
          numberValuel.push(parseFloat(item, 10)*1000000);
        } else if (item.includes("Ω")) {
          numberValuel.push(parseFloat(item, 10))
        }
      })
      numberValuel.forEach(function (item, i, arr) {
        let r1 = item
        let r2 = item * coefficient
        numberValuel.forEach(function (item, j, arr) {
          if (r2 === item) {
            console.log("r1: " + stringValues[i] + " r2: " + stringValues[j] + '\n')
          }
        })
      })
    })
  });
}


// main
(async function () {

  let outputVoltage = await new Promise(resolve => {
    rl.question("Выходное напряжение: ", resolve)
  })

  let refVoltageFeedBack = await new Promise(resolve => {
    rl.question("Напряжение обратной связи: ", resolve)
  })

  selectionResistors (outputVoltage, refVoltageFeedBack)
  
  await new Promise(resolve => {
    rl.question("", resolve)
  })

  rl.close()

})()