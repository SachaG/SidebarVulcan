/*

Migrations

*/
export const renameFieldMigration = (collection, field1, field2) => {

  const items = collection.find({
    [field1]: { $exists: true },
    [field2]: { $exists: false },
  }).fetch();

  if (items.length) {
    // eslint-disable-next-line no-console
    console.log(`// Starting ${field1} -> ${field2} mutation…`);
    items.forEach(document => {
      // eslint-disable-next-line no-console
      console.log(`Migrating document ${document._id}`);
      collection.update(document._id, {$set: {[field2]: document[field1]}});
    });
    // eslint-disable-next-line no-console
    console.log(`// ${field1} -> ${field2} mutation done.`);
  }
}
