import { openDB, DBSchema } from 'idb';

interface PunishmentDB extends DBSchema {
  punishments: {
    key: number;
    value: Punishment;
    indexes: { 'by-player': string };
  };
}

export interface Punishment {
  id?: number;
  type: 'BAN' | 'MUTE';
  date: string;
  player: string;
  reason: string;
  duration: string;
}

const DB_NAME = 'minecraft-server-db';
const DB_VERSION = 1;

async function initDB() {
  return openDB<PunishmentDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create a store of objects
      const punishmentsStore = db.createObjectStore('punishments', {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
      
      // Create an index on the 'player' property of the objects.
      punishmentsStore.createIndex('by-player', 'player');
    },
  });
}

export const db = {
  async getPunishments(): Promise<Punishment[]> {
    const db = await initDB();
    return db.getAll('punishments');
  },
  
  async getPunishmentsByPlayer(player: string): Promise<Punishment[]> {
    const db = await initDB();
    const index = db.transaction('punishments').store.index('by-player');
    return index.getAll(player);
  },
  
  async addPunishment(punishment: Omit<Punishment, 'id'>): Promise<number> {
    const db = await initDB();
    return db.add('punishments', punishment as Punishment);
  },
  
  async updatePunishment(punishment: Punishment): Promise<number> {
    const db = await initDB();
    await db.put('punishments', punishment);
    return punishment.id!;
  },
  
  async deletePunishment(id: number): Promise<void> {
    const db = await initDB();
    await db.delete('punishments', id);
  }
};