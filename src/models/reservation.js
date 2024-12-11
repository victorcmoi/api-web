'use strict';

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    timeSlot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, { foreignKey: 'userId' });
    Reservation.belongsTo(models.Court, { foreignKey: 'courtId' });
  };

  return Reservation;
};
