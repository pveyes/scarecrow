const scrape = require('./lib/scrape');
const notify = require('./lib/notify');
const db = require('./lib/db');

async function main() {
  const data = await scrape();
  const storedIds = await db.get();

  const newData = data.filter(item => {
    return !storedIds.includes(item.id);
  });

  if (newData.length === 0) {
    console.log('No new data');
    return;
  }

  // notify slack
  await notify(newData);

  // and update db
  await db.set(
    newData
      .map(item => item.id)
      .concat(storedIds)
  );
}

main()
  .catch(err => {
    console.error('Error', err.stack);
    process.exit(1);
  })
