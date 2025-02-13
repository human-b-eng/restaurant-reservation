const knex = require("../db/connection");


//create new reservation
function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((newReservation) => newReservation[0]);
}

//query reservations from given date
function list(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .orderBy("reservation_time");
}

//query reservations by given mobile #
function search(mobile_number) {
    return knex("reservations")
    .whereRaw("translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%` )
    .orderBy("reservation_date");
}

//query reservation by given ID
function read(reservation_id) {
    return knex("reservations")
        .select()
        .where({reservation_id})
        .first();
}

//update reservation with given ID and new data
function update(updatedRes) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: updatedRes.reservation_id })
        .update(updatedRes, "*")
        .then((updated) => updated[0])
}

module.exports = {
    list,
    create,
    read,
    update,
    search,
  };