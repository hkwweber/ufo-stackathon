// /**
//  * Welcome to the seed file! This seed file uses a newer language feature called...
//  *
//  *                  -=-= ASYNC...AWAIT -=-=
//  *
//  * Async-await is a joy to use! Read more about it in the MDN docs:
//  *
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
//  *
//  * Now that you've got the main idea, check it out in practice below!
//  */
// const db = require('../server/db')
// const {User} = require('../server/db/models')

// async function seed () {
//   await db.sync({force: true})
//   console.log('db synced!')
//   // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
//   // executed until that promise resolves!

//   const users = await Promise.all([
//     User.create({email: 'cody@email.com', password: '123'}),
//     User.create({email: 'murphy@email.com', password: '123'})
//   ])
//   // Wowzers! We can even `await` on the right-hand side of the assignment operator
//   // and store the result that the promise resolves to in a variable! This is nice!
//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
// }

// // Execute the `seed` function
// // `Async` functions always return a promise, so we can use `catch` to handle any errors
// // that might occur inside of `seed`
// seed()
//   .catch(err => {
//     console.error(err.message)
//     console.error(err.stack)
//     process.exitCode = 1
//   })
//   .then(() => {
//     console.log('closing db connection')
//     db.close()
//     console.log('db connection closed')
//   })

// /*
//  * note: everything outside of the async function is totally synchronous
//  * The console.log below will occur before any of the logs that occur inside
//  * of the async function
//  */
// console.log('seeding...')

const Papa = require('papaparse');
const path = require('path');
const jsonfile = require('jsonfile');
const fs = require('fs');


let data;

let csvFile = path.join(__dirname, '..', 'ufo-scrubbed.csv')

let newFile = path.join(__dirname, '..', 'ufo-scrubbed-1999-august.js');


// parsing CSV to JSON and writing a file

Papa.parse(fs.createReadStream(csvFile), {
  header: true,
  delimiter: ',',
  // linebreak: '\n',
  complete: function(results) {
    // console.log('!!!!!results', results.data.slice(results.data.length - 300, results.data.length - 240))
    // let length = results.data.length;

    // console.log('!!!', results.data.slice(length - 200, length - 150))

    let filt = results.data.filter(el => {
      // return el.datetime.indexOf('1999') > -1 //||
      return el.datetime.indexOf('8') === 0 &&
      el.datetime.indexOf('1999') > -1
    // el.datetime.indexOf('2001') > -1 ||
    // el.datetime.indexOf('2002') > -1 ||
    // el.datetime.indexOf('2003') > -1 ||
    // el.datetime.indexOf('2004') > -1 //||
    // el.datetime.indexOf('2005') > -1 ||
    // el.datetime.indexOf('2006') > -1 ||
    // el.datetime.indexOf('2007') > -1 ||
    // el.datetime.indexOf('2008') > -1 ||
    // el.datetime.indexOf('2009') > -1 ||
    // el.datetime.indexOf('2010') > -1 ||
    // el.datetime.indexOf('2011') > -1 ||
    // el.datetime.indexOf('2012') > -1 ||
    // el.datetime.indexOf('2013') > -1


    })

    console.log("FILTY: ", filt.length);

    //to 200

    // jsonfile.writeFile(newFile ,filt, (err) => {
    //   if (err) throw err;
    //   console.log("GOT IT");
    // })
    // console.log('FILTERED: ', filt);
    // console.log("META", results.meta)
    // data = results.data.slice(0,30);
    // jsonfile.writeFile(newFile, results, (err) => {
    //   if (err) throw err;
    //   console.log('GOT IT');
    // })
  }
})
