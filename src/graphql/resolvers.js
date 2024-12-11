const { Reservation, Court } = require('../models');

const resolvers = {
    Query: {
        availableSlots: async (_, { date, terrain }) => {
            try {
                const court = await Court.findOne({ where: { name: terrain } });
                if (!court) throw new Error(`Court with name "${terrain}" not found`);

                const startHour = 10;
                const slotDuration = 45;
                const totalSlots = 16;
                const timeSlots = Array.from({ length: totalSlots }, (_, i) => {
                    const startTime = new Date();
                    startTime.setHours(startHour, i * slotDuration, 0, 0);
                    const endTime = new Date(startTime.getTime() + slotDuration * 60000);
                    return {
                        slot: i + 1,
                        time: `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}-${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`,
                    };
                });

                const reservations = await Reservation.findAll({
                    where: { courtId: court.id, date },
                });
                const reservedSlots = reservations.map((r) => r.timeSlot);

                return timeSlots.map((slot) => ({
                    time: slot.time,
                    isAvailable: !reservedSlots.includes(slot.slot),
                }));
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching available slots');
            }
        },
    },
};

module.exports = resolvers;
