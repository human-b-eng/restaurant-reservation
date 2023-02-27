const knex = require("../db/connection");

//display all tables with given date
function list(date) {
    return knex("tables").select().orderBy("table_name");
  }
  
//query table with given ID
  function read(table_id) {
    return knex("tables").select().where({ table_id }).first();
  }
  
//query to create new table
  function create(table) {
    return knex("tables")
      .insert(table)
      .returning("*")
      .then((newTable) => newTable[0]);
  }
  
// This function updates a table in the 'tables' table in the database based on the provided 'updatedTable' object
function update(updatedTable) {
  return knex("tables")
      .select("*")
      .where({ table_id: updatedTable.table_id })
      .update(updatedTable, "*")
      .then((updated) => updated[0])
}

//query to delete table from db
  function destroy(tableId) {
    return knex("tables")
        .select("*")
        .where({ table_id: tableId })
        .update({reservation_id: null})
        .then((updated) => updated[0])
}

module.exports = {
    list,
    create,
    read,
    update,
    delete:destroy,
};