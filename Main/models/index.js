const User = require('./User');
const Dashboard = require('./Dashboard');

User.hasMany(Dashboard, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Dashboard.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Dashboard };
