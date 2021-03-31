const sequelize = require('../config/connection');
const { User, Dashboard } = require('../models');

const userData = require('./userData.json');
const dashboardData = require('./dashboardData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of dashboardData) {
    await Dashboard.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
