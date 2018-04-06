exports.up = function(knex) {
  return knex.schema
    .createTable('Users', table => {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table.string('email').notNullable();
      table.string('oauthId').notNullable();
    })
    .createTable('Authors', table => {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table.string('name').notNullable();
    })
    .createTable('Poems', table => {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table
        .uuid('authorId')
        .references('id')
        .inTable('Authors');
      table.string('title').notNullable();
      table.string('teaser').notNullable();
      table.string('classification').nullable();
      table.string('region').nullable();
      table.string('period').nullable();
      table.string('year').nullable();
      table.specificType('lines', 'text[]').notNullable();
    })
    .createTable('AuthorPrefs', table => {
      table
        .uuid('userId')
        .notNullable()
        .references('id')
        .inTable('Users');
      table
        .uuid('authorId')
        .notNullable()
        .references('id')
        .inTable('Authors');
      table.primary(['userId', 'authorId']);
      table.boolean('isFavorited').notNullable();
      table.boolean('isBookmarked').notNullable();
    })
    .createTable('PoemPrefs', table => {
      table
        .uuid('userId')
        .notNullable()
        .references('id')
        .inTable('Users');
      table
        .uuid('poemId')
        .notNullable()
        .references('id')
        .inTable('Poems');
      table.primary(['userId', 'poemId']);
      table.boolean('isFavorited').notNullable();
      table.boolean('isBookmarked').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Users')
    .dropTableIfExists('Authors')
    .dropTableIfExists('Poems')
    .dropTableIfExists('AuthorPrefs')
    .dropTableIfExists('PoemPrefs');
};
