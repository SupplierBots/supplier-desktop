import { HarvesterData } from '../../types/HarvesterData';
import { IPCMain } from '../../IPC/IPCMain';
import { Harvester } from './interfaces/Harvester';
import { PlaywrightHarvester } from './playwright/PlaywrightHarvester';

class HarvestersManager {
  private static sitekey = '6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz';
  private static harvesters: Harvester[] = [];

  public static async initialize(harvestersData: HarvesterData[]) {
    this.harvesters = [];

    await Promise.all(
      harvestersData.map(async (data, index) => {
        const harvester = new PlaywrightHarvester(data, this.sitekey);
        this.harvesters.push(harvester);
        await harvester.initialize(index);
        await harvester.load();
      }),
    );
  }

  public static async getCaptchaToken(sitekey = this.sitekey): Promise<string> {
    const availableHarvester = this.getRandomAvailable();

    if (!availableHarvester) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.getCaptchaToken();
    }

    const token = await availableHarvester.getToken(sitekey);
    return token;
  }

  private static getRandomAvailable() {
    const availableHarvesters = this.harvesters.filter(h => h.isReady && !h.isSolving);
    return availableHarvesters[Math.floor(Math.random() * availableHarvesters.length)];
  }

  public static async closeAll() {
    await Promise.all(
      this.harvesters.map(async harvester => {
        await harvester.close();
      }),
    );
    this.harvesters = [];
  }

  public static async setupHarvester(data: HarvesterData) {
    try {
      const harvester = new PlaywrightHarvester(data);
      await harvester.initialize();
      await harvester.setup();
    } catch {
      IPCMain.harvesterStateChange(data.id, false);
    }
  }
}

export { HarvestersManager };
