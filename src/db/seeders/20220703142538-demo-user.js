'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /*return queryInterface.bulkInsert('Users',
      /*{
        id: 1,
        login: 'MaryWinchester',
        password: 'mary64',
        age: 55,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        login: 'BobbySinger',
        password: 'Bro789',
        age: 65,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        login: 'Megmasters',
        password: 'Demon2',
        age: 30,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        login: 'RowenaMacLeod',
        password: '8witch',
        age: 120,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        login: 'AmaraTheDarkness',
        password: 'Sis99',
        age: 99,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        login: 'ChuckShurley',
        password: 'God88',
        age: 42,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        login: 'JohnWinchester',
        password: 'Daddy8',
        age: 60,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])*/
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
