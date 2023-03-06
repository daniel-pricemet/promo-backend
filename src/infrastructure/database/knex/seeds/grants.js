exports.seed = function (knex) {
  return knex('grants')
    .del()
    .then(function () {
      return knex('grants')
        .withSchema('promo')
        .insert([
          // Meta
          { name: 'view_meta', description: 'View metadata' },
          { name: 'create_meta', description: 'Create metadata' },
          { name: 'edit_meta', description: 'Edit metadata' },
          { name: 'delete_meta', description: 'Delete metadata' },

          // Parameters
          { name: 'view_parameter', description: 'View parameters' },
          { name: 'create_parameter', description: 'Create parameters' },
          { name: 'edit_parameter', description: 'Edit parameters' },
          { name: 'delete_parameter', description: 'Delete parameters' },

          // Campaigns
          { name: 'view_campaign', description: 'View campaigns' },
          { name: 'create_campaign', description: 'Create campaigns' },
          { name: 'edit_campaign', description: 'Edit campaigns' },
          { name: 'delete_campaign', description: 'Delete campaigns' },

          // Templates
          { name: 'view_template', description: 'View templates' },
          { name: 'create_template', description: 'Create templates' },
          { name: 'edit_template', description: 'Edit templates' },
          { name: 'delete_template', description: 'Delete templates' },

          // Posters
          { name: 'view_poster', description: 'View posters' },
          { name: 'create_poster', description: 'Create posters' },
          { name: 'edit_poster', description: 'Edit posters' },
          { name: 'delete_poster', description: 'Delete posters' },

          // Tags
          { name: 'view_tag', description: 'View tags' },
          { name: 'create_tag', description: 'Create tags' },
          { name: 'edit_tag', description: 'Edit tags' },
          { name: 'delete_tag', description: 'Delete tags' },

          // Admin
          { name: 'admin', description: 'Full administrative access' },
        ]);
    });
};
