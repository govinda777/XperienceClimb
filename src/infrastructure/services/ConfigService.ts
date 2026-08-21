export class ConfigService {
  static getCmsEnabled(): boolean {
    return process.env.NEXT_PUBLIC_CMS_ENABLED === 'true';
  }

  static getSanityProjectId(): string {
    return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '43m62r6e';
  }

  static getSanityDataset(): string {
    return process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  }

  static getSanityReadToken(): string | undefined {
    return process.env.SANITY_API_READ_TOKEN;
  }

  static getSanityForceMock(): boolean {
    return process.env.SANITY_FORCE_MOCK === 'true';
  }

  static getMercadoPagoAccessToken(): string | undefined {
    return process.env.MERCADOPAGO_ACCESS_TOKEN;
  }

  static getMercadoPagoPublicKey(): string | undefined {
    return process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;
  }
}
