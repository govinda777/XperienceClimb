import { getContentRepository } from '@/infrastructure/repositories/ContentRepositoryFactory';
import { ConfigService } from '@/infrastructure/services/ConfigService';
import DestinationTemplate from '@/components/templates/DestinationTemplate';

export const revalidate = 3600; // 1 hour cached statically

export default async function Home() {
  const cmsEnabled = ConfigService.getCmsEnabled();
  const repository = getContentRepository();
  const activeSite = await repository.getActiveSite();

  return (
    <DestinationTemplate
      destination={activeSite?.activeDestination}
      cmsEnabled={cmsEnabled}
      activeSiteFallback={activeSite}
    />
  );
}
