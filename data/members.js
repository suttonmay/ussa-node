const  sqlite3 = require('sqlite3')
const {open} = require('sqlite')

module.exports = async function getMembers(name) {
const db = await open({
    filename: './data/sqlitedb',
    driver: sqlite3.Database
  })

let members = []

let sql = `SELECT firstName,
                  lastName,
                  company,
                  title,
                  department,
                  phone,
                  city,
                  state,
                  zip,
                  url,
                  image,
                  primaryAddress
           FROM members
           INNER JOIN addresses ON addresses.memberId = members.id
           WHERE firstName LIKE '%' || ? || '%'
           OR lastName LIKE '%' || ? || '%'
           AND primaryAddress IS NOT NULL`;

await db.each(sql, [name], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  return row
    ? members.push(row)
    : console.log(`No member found with the name ${name}`);
});

db.close();
console.log(members)
return members
}