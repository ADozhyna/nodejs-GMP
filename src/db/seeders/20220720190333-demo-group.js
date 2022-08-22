'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', [
      {
        id: 1,
        name: 'Admin',
        permissions: Sequelize.literal(`ARRAY['READ', 'WRITE', 'DELETE']::"enum_Groups_permissions"[]`),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'User',
        permissions: Sequelize.literal(`ARRAY['READ']::"enum_Groups_permissions"[]`),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Premium User',
        permissions: Sequelize.literal(`ARRAY['READ', 'WRITE', 'UPLOAD_FILES']::"enum_Groups_permissions"[]`),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Super User',
        permissions: Sequelize.literal(`ARRAY['READ', 'WRITE','SHARE', 'UPLOAD_FILES']::"enum_Groups_permissions"[]`),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
