let fs = require('fs');
const { readFile, writeFile } = require('fs');
const readline = require('readline');
const nodeProcess = require('process')

const { stdin: input, stdout: output } = nodeProcess;
const rl = readline.createInterface({ input, output });

let path = "./"

const selectionResistors = (db, vOut, vRef, precision) => {
  let coefficient = vOut / vRef - 1
  fs.readdir(path, function (err, items) {
    let file = './db_korolab.txt'
    switch (db) {
      case "1":
        file = './db_korolab.txt';
        break;
      case "2":
        file = './db_resistors.txt';
        break;
    }
    readFile(file, 'utf-8', function (err, contents) {
      if (err) {
        console.log(err);
        return;
      }
      let stringValues = contents.split('\n');
      let numberValuel = [];
      stringValues.forEach(function (item, i, arr) {
        if (item.includes("mΩ")) {
          numberValuel.push(parseFloat(item, 10) / 1000);
        } else if (item.includes("kΩ")) {
          numberValuel.push(parseFloat(item, 10) * 1000);
        } else if (item.includes("MΩ")) {
          numberValuel.push(parseFloat(item, 10) * 1000000);
        } else if (item.includes("Ω")) {
          numberValuel.push(parseFloat(item, 10))
        }
      })
      numberValuel.forEach(function (item, i, arr) {
        let r1 = item
        numberValuel.forEach(function (item2, j, arr) {
          let r2 = item2
          let result_v = vOut / (r1 + r2) * r2
          let out_v = vRef * (r1 + r2) / r2
          let minV = result_v - (result_v * precision / 100)
          let maxV = result_v + (result_v * precision / 100)
          if ((minV <= vRef) && (vRef <= maxV)) {
            console.log("r1: " + stringValues[j] + " r2: " + stringValues[i] + " Res:" + result_v.toFixed(5) + "v" + " Out_V:" + out_v.toFixed(5) + '\n')
          }
        })
      })
    })
  });
}


// main
(async function () {

  let db = await new Promise(resolve => {
    rl.question("База данных (1-королаб, 2-глобальная): ", resolve)
  })

  let outputVoltage = await new Promise(resolve => {
    rl.question("Выходное напряжение: ", resolve)
  })

  let refVoltageFeedBack = await new Promise(resolve => {
    rl.question("Напряжение обратной связи: ", resolve)
  })

  let precision = await new Promise(resolve => {
    rl.question("Допуск %: ", resolve)
  })
  selectionResistors(db, outputVoltage, refVoltageFeedBack, precision)

  await new Promise(resolve => {
    rl.question("", resolve)
  })

  rl.close()

})()
