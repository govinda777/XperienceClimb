import { notFound } from 'next/navigation';
import { getContentRepository } from '@/infrastructure/repositories/ContentRepositoryFactory';
import { ConfigService } from '@/infrastructure/services/ConfigService';
import DestinationTemplate from '@/components/templates/DestinationTemplate';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const cmsEnabled = ConfigService.getCmsEnabled();
  const repository = getContentRepository();
  const destination = await repository.getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <DestinationTemplate
      destination={destination}
      cmsEnabled={cmsEnabled}
    />
  );
}
