exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table.string('email').nullable();
      table.string('client_id').notNullable();
      table.string('oauth_id').nullable();
      table
        .boolean('anonymous')
        .notNullable()
        .defaultTo(true);
      table.string('timeZone').nullable();
      table.index(['client_id', 'oauth_id']);
    })
    .createTable('authors', table => {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table.string('name').notNullable();
      table.index('name');
    })
    .createTable('poems', table => {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table
        .uuid('author_id')
        .references('id')
        .inTable('authors');
      table.string('title').notNullable();
      table.string('classification').nullable();
      table.string('region').nullable();
      table.string('period').nullable();
      table.string('year').nullable();
      table.specificType('lines', 'text[]').notNullable();
      table.specificType('keywords', 'text[]').notNullable();
      table.index('title');
    })
    .createTable('author_infos', table => {
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .uuid('author_id')
        .notNullable()
        .references('id')
        .inTable('authors');
      table.primary(['user_id', 'author_id']);
      table.boolean('in_library').notNullable();
      table
        .timestamp('viewed_at')
        .notNullable()
        .defaultTo(knex.fn.now());
    })
    .createTable('poem_infos', table => {
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .uuid('poem_id')
        .notNullable()
        .references('id')
        .inTable('poems');
      table.primary(['user_id', 'poem_id']);
      table.boolean('in_library').notNullable();
      table
        .timestamp('viewed_at')
        .notNullable()
        .defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('poem_infos')
    .dropTableIfExists('author_infos')
    .dropTableIfExists('poems')
    .dropTableIfExists('authors')
    .dropTableIfExists('users');
};
