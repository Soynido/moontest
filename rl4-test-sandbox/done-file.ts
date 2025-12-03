// Test file for RL4 done-file linking
// This file demonstrates the @rl4:files= annotation feature

export interface TestConfig {
  name: string;
  version: number;
  enabled: boolean;
  description?: string;
  timestamp?: Date;
}

export class DoneFileTest {
  private config: TestConfig;

  constructor(config: TestConfig) {
    this.config = config;
  }

  public run(): void {
    console.log(`Running test: ${this.config.name}`);
    console.log(`Version: ${this.config.version}`);
    console.log(`Enabled: ${this.config.enabled}`);
    if (this.config.description) {
      console.log(`Description: ${this.config.description}`);
    }
  }

  public getStatus(): string {
    return this.config.enabled ? 'active' : 'inactive';
  }

  public getInfo(): Record<string, any> {
    return {
      name: this.config.name,
      version: this.config.version,
      status: this.getStatus(),
      timestamp: this.config.timestamp || new Date(),
    };
  }
}

// Example usage
const testInstance = new DoneFileTest({
  name: 'RL4 File Linking Test',
  version: 1,
  enabled: true,
  description: 'Testing @rl4:files= annotation feature',
  timestamp: new Date(),
});

testInstance.run();
console.log('Test info:', testInstance.getInfo());

