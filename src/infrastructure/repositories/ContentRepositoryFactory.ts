import { IContentRepository } from '@/core/repositories/IContentRepository';
import { SanityContentRepository } from './SanityContentRepository';
import { LegacyContentRepository } from './LegacyContentRepository';
import { ConfigService } from '../services/ConfigService';

export function getContentRepository(): IContentRepository {
  const cmsEnabled = ConfigService.getCmsEnabled();
  if (cmsEnabled) {
    return new SanityContentRepository();
  }
  return new LegacyContentRepository();
}
