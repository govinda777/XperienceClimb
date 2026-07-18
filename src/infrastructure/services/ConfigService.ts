export class ConfigService {
  static getCmsEnabled(): boolean {
    return process.env.NEXT_PUBLIC_CMS_ENABLED === 'true';
  }

  static getSanityProjectId(): string {
    return '43m62r6e';
  }

  static getSanityDataset(): string {
    return 'production';
  }

  static getSanityReadToken(): string | undefined {
    return undefined;
  }
}
