exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table.string('email').notNullable();
      table.string('oauth_id').notNullable();
      table.string('timezone').nullable();
    })
    .createTable('authors', table => {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table.string('name').notNullable();
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
    })
    .createTable('user_authors', table => {
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
      table.boolean('is_favorited').notNullable();
      table.boolean('is_bookmarked').notNullable();
      table
        .timestamp('viewed_at')
        .notNullable()
        .defaultTo(knex.fn.now());
    })
    .createTable('user_poems', table => {
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
      table.boolean('is_favorited').notNullable();
      table.boolean('is_bookmarked').notNullable();
      table
        .timestamp('viewed_at')
        .notNullable()
        .defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_poems')
    .dropTableIfExists('user_authors')
    .dropTableIfExists('poems')
    .dropTableIfExists('authors')
    .dropTableIfExists('users');
};
