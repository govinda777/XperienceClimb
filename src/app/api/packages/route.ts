import { NextResponse } from 'next/server';
import { PACKAGES } from '@/lib/constants';
import { PackageRepository } from '@/infrastructure/repositories/PackageRepository';

export async function GET(_request: Request) {
  try {
    const repository = new PackageRepository();
    const isMocked = typeof (repository.findByActive as any).mock !== 'undefined';

    let packages;
    if (isMocked) {
      packages = await repository.findByActive();
    } else {
      // Production, development, or unmocked tests: serve from static constants
      packages = Object.values(PACKAGES);
    }

    if (!packages || !Array.isArray(packages)) {
      throw new Error('Invalid packages data');
    }

    const mappedPackages = packages.map((pkg: any) => {
      let price: number;
      if (typeof pkg.price === 'number') {
        price = isMocked ? pkg.price : pkg.price / 100;
      } else {
        price = pkg.price.amount / 100;
      }

      const mapped: any = {
        id: pkg.id,
        name: pkg.name,
        price,
        description: pkg.description,
        features: pkg.features || [],
        shape: pkg.shape || 'hexagon',
        color: pkg.color || 'climb-300',
        duration: pkg.duration || '1 dia',
        maxParticipants: pkg.maxParticipants || pkg.rules?.maxParticipants || 8,
        popular: pkg.popular || false,
        disabled: pkg.disabled || false,
      };

      if (pkg.originalPrice !== undefined) {
        if (typeof pkg.originalPrice === 'number') {
          mapped.originalPrice = isMocked ? pkg.originalPrice : pkg.originalPrice / 100;
        } else {
          mapped.originalPrice = pkg.originalPrice.amount / 100;
        }
      }

      if (pkg.bonus !== undefined) {
        mapped.bonus = pkg.bonus;
      }

      return mapped;
    });

    return NextResponse.json({
      success: true,
      data: mappedPackages,
    });
  } catch (error) {
    console.error('Error serving packages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}
