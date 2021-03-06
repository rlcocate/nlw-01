import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('point', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name', 100).notNullable();
        table.string('email', 255).notNullable();
        table.string('whatsapp', 11).notNullable();
        table.decimal('longitude').notNullable();
        table.decimal('latitude').notNullable();
        table.string('city', 50).notNullable();
        table.string('uf', 2).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('point');
}