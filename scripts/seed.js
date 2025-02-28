// This script seeds the IndexedDB with initial data
// Run with: npm run seed

const punishments = [
  {
    type: "BAN",
    date: "24/02/2025, 23:54:17",
    player: "yDiablo05",
    reason: "Construção Inapropriada",
    duration: "1d"
  },
  {
    type: "BAN",
    date: "24/02/2025, 23:53:25",
    player: "23332_",
    reason: "Uso de Trapaças",
    duration: "Permanente"
  },
  {
    type: "BAN",
    date: "24/02/2025, 23:52:04",
    player: "thebestdessejogo",
    reason: "Construção Inapropriada",
    duration: "19h"
  },
  {
    type: "BAN",
    date: "24/02/2025, 23:46:16",
    player: "Raviina",
    reason: "Uso de Trapaças",
    duration: "Permanente"
  },
  {
    type: "BAN",
    date: "24/02/2025, 23:44:36",
    player: "mediaevaleI",
    reason: "Apologia ao Nazismo",
    duration: "Permanente"
  },
  {
    type: "BAN",
    date: "24/02/2025, 23:43:55",
    player: "TokyIaisod",
    reason: "Uso de Trapaças",
    duration: "Permanente"
  },
  {
    type: "MUTE",
    date: "24/02/2025, 23:42:16",
    player: "xCaiowLITORANDO",
    reason: "Violação das Regras da comunidade",
    duration: "2h"
  },
  {
    type: "BAN",
    date: "24/02/2025, 23:37:42",
    player: "DGKRR",
    reason: "Uso de Trapaças",
    duration: "Permanente"
  }
];

// This script will run in the browser
function seedDatabase() {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    console.log('This script must be run in a browser environment');
    return;
  }

  // Import the IndexedDB module
  import('/lib/db.js').then(async (module) => {
    const { db } = module;
    
    try {
      // Get existing punishments
      const existingPunishments = await db.getPunishments();
      
      if (existingPunishments.length === 0) {
        // Add each punishment to the database
        for (const punishment of punishments) {
          await db.addPunishment(punishment);
        }
        console.log('Database seeded successfully with', punishments.length, 'punishments');
      } else {
        console.log('Database already contains', existingPunishments.length, 'punishments. Skipping seed.');
      }
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }).catch(error => {
    console.error('Failed to import database module:', error);
  });
}

// Run the seed function
seedDatabase();