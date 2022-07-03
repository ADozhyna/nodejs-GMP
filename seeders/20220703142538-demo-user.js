const { faker } = require('@faker-js/faker');
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 2,
        login: 'MaryWinchester',
        password: 'mary64',
        age: 55,
        isDeleted: false
      },
      {
        id: 3,
        login: 'BobbySinger',
        password: 'Bro789',
        age: 65,
        isDeleted: false
      },
      {
        id: 4,
        login: 'Megmasters',
        password: 'Demon2',
        age: 30,
        isDeleted: false
      },
      {
        id: 5,
        login: 'RowenaMacLeod',
        password: '8witch',
        age: 120,
        isDeleted: false
      },
      {
        id: 6,
        login: 'AmaraTheDarkness',
        password: 'Sis99',
        age: 99,
        isDeleted: false
      },
      {
        id: 7,
        login: 'ChuckShurley',
        password: 'God88',
        age: 42,
        isDeleted: false
      },
      {
        id: 8,
        login: 'JohnWinchester',
        password: 'Daddy8',
        age: 60,
        isDeleted: false
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
