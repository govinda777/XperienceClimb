# 🧗‍♂️ XperienceClimb Migration Plan to Next.js

## 📋 Project Overview

**XperienceClimb** is currently a single-page site dedicated to climbing experiences at Morro Araçoiaba. This plan details the complete transformation into a modern Next.js application, hosted on Vercel, with login system, shopping cart and integrated checkout.

## 🎯 Migration Objectives

- ✅ Migrate from HTML/CSS/JS to Next.js 14 (App Router)
- ✅ Implement modular component architecture
- ✅ Add authentication system via Privy
- ✅ Create shopping cart and checkout with Mercado Pago
- ✅ Implement UX/UI improvements
- ✅ Automated deploy on Vercel
- ✅ Configure GitHub repository properly

---

## 📋 Phase 0: Config git repository (https://github.com/govinda777/XperienceClimb)

```bash
# Config git repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/govinda777/XperienceClimb.git

```

### 0.1: Config npm repository file (.npmrc)

```bash
# Config npm repository file (.npmrc)
registry=https://registry.npmjs.org

```

## 🏗️ Phase 1: Initial Configuration and Project Setup

### 1.1 GitHub Repository Configuration

```bash
# Repository configurations
- Add description: "🧗‍♂️ Climbing experience platform at Morro Araçoiaba"
- Add topics: climbing, adventure, nextjs, vercel, escalada
- Configure branch protection rules
- Add Issue and PR templates
```

### 1.2 Existing Project Migration to Next.js

```bash
# Backup current files
mkdir backup-original
cp index.html app.js style.css backup-original/

# Next.js initialization in current folder
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Main dependencies
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install framer-motion lucide-react
npm install @privy-io/react-auth @privy-io/wagmi-connector
npm install @mercadopago/sdk-react mercadopago
npm install zustand
npm install react-hot-toast
npm install inversify reflect-metadata
npm install class-validator class-transformer
npm install @tanstack/react-query
npm install date-fns

# Development dependencies
npm install -D @types/node
npm install -D prettier prettier-plugin-tailwindcss

# Preserve important assets
mkdir -p public/images
cp *.png public/images/ 2>/dev/null || true
cp site.png public/images/ 2>/dev/null || true

### 1.3 Existing Files Preservation

```bash
# Structure after migration
/Users/gosouza/projetos-p/XperienceClimb/
├── backup-original/          # Backup of original files
│   ├── index.html
│   ├── app.js
│   └── style.css
├── public/                   # Public assets
│   ├── images/
│   │   ├── site.png
│   │   ├── brutalist_concept.png
│   │   ├── y2k_vaporwave.png
│   │   └── 3d_immersive.png
│   └── favicon.ico
├── src/                      # Next.js source code
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   └── api/
│   │       ├── mercadopago/
│   │       │   ├── create-preference/
│   │       │   │   └── route.ts
│   │       │   └── webhook/
│   │       │       └── route.ts
│   │       └── orders/
│   │           └── route.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProgramSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── PackagesSection.tsx
│   │   │   ├── PartnersSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── auth/
│   │   │   ├── LoginButton.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── cart/
│   │   │   ├── CartButton.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── CartItem.tsx
│   │   └── checkout/
│   │       ├── CheckoutForm.tsx
│   │       ├── PaymentMethods.tsx
│   │       └── OrderSummary.tsx
│   ├── core/                # Clean Architecture layers
│   │   ├── entities/        # Business entities
│   │   │   ├── User.ts
│   │   │   ├── Package.ts
│   │   │   ├── Order.ts
│   │   │   └── CartItem.ts
│   │   ├── use-cases/       # Business logic
│   │   │   ├── auth/
│   │   │   │   ├── LoginUser.ts
│   │   │   │   ├── LogoutUser.ts
│   │   │   │   └── GetUserProfile.ts
│   │   │   ├── cart/
│   │   │   │   ├── AddItemToCart.ts
│   │   │   │   ├── RemoveItemFromCart.ts
│   │   │   │   ├── UpdateCartQuantity.ts
│   │   │   │   └── ClearCart.ts
│   │   │   ├── packages/
│   │   │   │   ├── GetAllPackages.ts
│   │   │   │   ├── GetPackageById.ts
│   │   │   │   └── GetPackageAvailability.ts
│   │   │   └── orders/
│   │   │       ├── CreateOrder.ts
│   │   │       ├── ProcessPayment.ts
│   │   │       ├── GetOrderById.ts
│   │   │       └── GetUserOrders.ts
│   │   ├── repositories/    # Data access interfaces
│   │   │   ├── IUserRepository.ts
│   │   │   ├── IPackageRepository.ts
│   │   │   ├── IOrderRepository.ts
│   │   │   └── IPaymentRepository.ts
│   │   └── services/        # External services interfaces
│   │       ├── IAuthService.ts
│   │       └── IPaymentService.ts
│   ├── infrastructure/      # External adapters  
│   │   ├── repositories/
│   │   │   ├── PrivyUserRepository.ts
│   │   │   ├── StaticPackageRepository.ts
│   │   │   └── MercadoPagoOrderRepository.ts
│   │   └── services/
│   │       ├── PrivyAuthService.ts
│   │       └── MercadoPagoService.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── dependencies.ts  # Dependency injection
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── usePackages.ts
│   │   └── useOrders.ts
│   ├── store/
│   │   ├── useCartStore.ts
│   │   └── useAuthStore.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── cart.ts
│   │   └── mercadopago.ts
│   └── styles/
│       └── globals.css
├── .github/                  # Existing workflows preserved
├── package.json             # New Next.js package.json
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── README.md                # Updated with new documentation
```

### 1.4 Content Migration

```bash
# Extract custom CSS to Tailwind
# Convert vanilla JavaScript to React components
# Migrate HTML to JSX components
# Preserve all animations and visual effects
# Maintain visual identity intact
```

### 1.5 Clean Architecture Implementation (No Database)

The project will implement **Clean Architecture** with Use Cases for better organization and scalability, **without a traditional database**:

**🏗️ Architecture Layers:**

1. **Entities** (`core/entities/`): Business entities (User, Package, Order, CartItem)
2. **Use Cases** (`core/use-cases/`): Business logic encapsulation
3. **Repositories** (`core/repositories/`): Data access interfaces
4. **Services** (`core/services/`): External services interfaces
5. **Infrastructure** (`infrastructure/`): External adapters (Privy, Mercado Pago)

**💾 Data Storage Strategy:**
- 🔐 **Users**: Managed entirely by **Privy** (no local storage needed)
- 📦 **Packages**: **Static data** in constants (Silver, Gold, Premium)
- 📋 **Orders**: Stored as **Mercado Pago metadata** and webhooks
- 🛒 **Cart**: **Local state** with Zustand (browser storage)

**🎯 Benefits:**
- ✅ No database infrastructure costs
- ✅ Simplified deployment and maintenance
- ✅ Leverages external services for data persistence
- ✅ Faster development and testing
- ✅ Automatic backups via external services

### 1.6 Visual Identity Preservation

**Elements to Preserve**:
- ✅ Color palette (green #21808D, orange #F4A261, etc.)
- ✅ Geometric shapes (hexagons, triangles, circles)
- ✅ Floating animations of background elements
- ✅ Hover effects and microinteractions
- ✅ Typography (FKGroteskNeue, Geist, Inter)
- ✅ Responsive layout and section structure
- ✅ Navigation system with smooth scroll
- ✅ Stylized registration form

**Planned Improvements**:
- 🚀 Optimized performance with Next.js
- 🚀 Faster image loading
- 🚀 More fluid animations with Framer Motion
- 🚀 Loading states and visual feedback
- 🚀 Enhanced mobile responsiveness
- 🚀 Complete accessibility (WCAG 2.1)

---

## 🎨 Phase 2: Design Migration and Componentization

### 2.1 Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        climb: {
          green: '#21808D',
          'green-hover': '#1D7480',
          'green-active': '#1A6873',
          orange: '#F4A261',
          'orange-hover': '#E76F51',
          background: '#FCFCF9',
          surface: '#FFFFFE',
          text: '#13343B',
          'text-secondary': '#626C71',
        }
      },
      fontFamily: {
        sans: ['FKGroteskNeue', 'Geist', 'Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      }
    },
  },
  plugins: [],
}
```

### 2.2 Base UI Components

**Button.tsx** - Reusable button component
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline'
  size: 'sm' | 'md' | 'lg'
  shape: 'default' | 'hexagon' | 'circle'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}
```

**Card.tsx** - Card component with geometric shapes
```typescript
interface CardProps {
  shape: 'hexagon' | 'triangle' | 'circle' | 'polygon'
  children: React.ReactNode
  className?: string
  interactive?: boolean
}
```

### 2.3 Main Componentized Sections

**HeroSection.tsx**
- Maintains current design with floating shapes
- Adds clearer call-to-action
- Integrates with smooth scroll system

**PackagesSection.tsx**
- Package cards with preserved geometric shapes
- Shopping cart integration
- Enhanced animations

---

## 🏛️ Phase 3: Clean Architecture and Use Cases Implementation

### 3.1 Business Entities

**Core Domain Models:**

```typescript
// core/entities/User.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
}

// core/entities/Package.ts
export interface Package {
  id: PackageType;
  name: string;
  price: Money;
  description: string;
  features: string[];
  availability: PackageAvailability;
  rules: BookingRules;
}

// core/entities/Order.ts
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  payment: PaymentInfo;
  createdAt: Date;
}
```

### 3.2 Use Cases Implementation

**Authentication Use Cases:**

```typescript
// core/use-cases/auth/LoginUser.ts
export class LoginUser {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository
  ) {}

  async execute(credentials: LoginCredentials): Promise<LoginResult> {
    // Business logic for user login
  }
}

// core/use-cases/auth/GetUserProfile.ts
export class GetUserProfile {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<User> {
    // Business logic for getting user profile
  }
}
```

**Cart Management Use Cases:**

```typescript
// core/use-cases/cart/AddItemToCart.ts
export class AddItemToCart {
  constructor(private cartRepository: ICartRepository) {}

  async execute(request: AddItemRequest): Promise<CartResult> {
    // Validate package availability
    // Check business rules
    // Add item to cart
  }
}

// core/use-cases/cart/UpdateCartQuantity.ts
export class UpdateCartQuantity {
  constructor(private cartRepository: ICartRepository) {}

  async execute(request: UpdateQuantityRequest): Promise<CartResult> {
    // Validate quantity limits
    // Update cart item
  }
}
```

**Order Processing Use Cases:**

```typescript
// core/use-cases/orders/CreateOrder.ts
export class CreateOrder {
  constructor(
    private orderRepository: IOrderRepository,
    private paymentService: IPaymentService,
    private emailService: IEmailService
  ) {}

  async execute(request: CreateOrderRequest): Promise<OrderResult> {
    // Validate cart items
    // Create order
    // Process payment
    // Send confirmation email
  }
}
```

### 3.3 Repository Interfaces (No Database)

```typescript
// core/repositories/IUserRepository.ts
export interface IUserRepository {
  getCurrentUser(): Promise<User | null>;
  getUserProfile(privyId: string): Promise<User | null>;
  // Note: User creation/update handled by Privy automatically
}

// core/repositories/IPackageRepository.ts
export interface IPackageRepository {
  findById(id: string): Promise<Package | null>;
  findAll(): Promise<Package[]>;
  // Note: Packages are static data from constants
}

// core/repositories/IOrderRepository.ts
export interface IOrderRepository {
  create(order: Order): Promise<string>; // Creates Mercado Pago preference
  findById(preferenceId: string): Promise<Order | null>; // From MP metadata
  findByUserId(userId: string): Promise<Order[]>; // From MP search
  updateFromWebhook(paymentData: MercadoPagoWebhook): Promise<void>;
}
```

### 3.4 Repository Implementations

```typescript
// infrastructure/repositories/PrivyUserRepository.ts
import { usePrivy } from '@privy-io/react-auth';

export class PrivyUserRepository implements IUserRepository {
  async getCurrentUser(): Promise<User | null> {
    const { user, authenticated } = usePrivy();
    
    if (!authenticated || !user) return null;
    
    return {
      id: user.id,
      email: user.email?.address || '',
      name: user.google?.name || user.apple?.name,
      avatar: user.google?.picture || user.apple?.picture,
      createdAt: new Date(user.createdAt),
    };
  }

  async getUserProfile(privyId: string): Promise<User | null> {
    // Get user data from Privy API if needed
    // Most cases will use getCurrentUser()
    return null;
  }
}

// infrastructure/repositories/StaticPackageRepository.ts
import { PACKAGES } from '@/lib/constants';

export class StaticPackageRepository implements IPackageRepository {
  async findById(id: string): Promise<Package | null> {
    const packageData = PACKAGES[id as keyof typeof PACKAGES];
    return packageData || null;
  }

  async findAll(): Promise<Package[]> {
    return Object.values(PACKAGES);
  }
}

// infrastructure/repositories/MercadoPagoOrderRepository.ts
export class MercadoPagoOrderRepository implements IOrderRepository {
  constructor(private mercadoPagoService: MercadoPagoService) {}

  async create(order: Order): Promise<string> {
    // Create Mercado Pago preference with order data as metadata
    const preference = await this.mercadoPagoService.createPreference({
      items: order.items.map(item => ({
        title: item.packageName,
        unit_price: item.price / 100, // Convert cents to currency
        quantity: item.quantity,
        id: item.packageId,
      })),
      metadata: {
        orderId: order.id,
        userId: order.userId,
        climbingDetails: {
          experienceLevel: order.experienceLevel,
          emergencyContact: order.emergencyContact,
          selectedDate: order.selectedDate,
        },
      },
      external_reference: order.id,
    });

    return preference.id;
  }

  async findById(preferenceId: string): Promise<Order | null> {
    // Get preference data from Mercado Pago
    const preference = await this.mercadoPagoService.getPreference(preferenceId);
    
    if (!preference) return null;

    // Convert MP preference back to Order
    return this.mapPreferenceToOrder(preference);
  }

  async updateFromWebhook(paymentData: MercadoPagoWebhook): Promise<void> {
    // Process webhook and update order status
    // Send confirmation emails if payment approved
    // Trigger post-payment actions
  }
}
```

### 3.5 Dependency Injection Setup (No Database)

```typescript
// lib/dependencies.ts
import { Container } from 'inversify';
import 'reflect-metadata';

export const container = new Container();

// Bind use cases
container.bind<LoginUser>('LoginUser').to(LoginUser);
container.bind<AddItemToCart>('AddItemToCart').to(AddItemToCart);
container.bind<CreateOrder>('CreateOrder').to(CreateOrder);
container.bind<GetAllPackages>('GetAllPackages').to(GetAllPackages);
container.bind<GetPackageAvailability>('GetPackageAvailability').to(GetPackageAvailability);

// Bind repositories (No Database)
container.bind<IUserRepository>('UserRepository').to(PrivyUserRepository);
container.bind<IOrderRepository>('OrderRepository').to(MercadoPagoOrderRepository);
container.bind<IPackageRepository>('PackageRepository').to(StaticPackageRepository);
// Note: Cart is handled by Zustand store (browser localStorage)

// Bind services
container.bind<IAuthService>('AuthService').to(PrivyAuthService);
container.bind<IPaymentService>('PaymentService').to(MercadoPagoService);
container.bind<IEmailService>('EmailService').to(EmailService);
```

### 3.6 React Integration with Custom Hooks (No Database)

```typescript
// hooks/useAuth.ts (Privy Integration)
import { usePrivy } from '@privy-io/react-auth';
import { useMutation } from '@tanstack/react-query';
import { container } from '@/lib/dependencies';
import { GetUserProfile } from '@/core/use-cases/auth';

export const useAuth = () => {
  // Privy handles authentication directly
  const { login, logout, user, authenticated, ready } = usePrivy();
  const getUserProfile = container.get<GetUserProfile>('GetUserProfile');

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: () => getUserProfile.execute(user?.id),
    enabled: authenticated && !!user?.id,
  });

  return {
    // Privy methods
    login,
    logout,
    user,
    authenticated,
    ready,
    
    // Our enhanced user profile (from use case)
    userProfile,
    isLoading,
    isAuthenticated: authenticated,
  };
};

// hooks/usePackages.ts
export const usePackages = () => {
  const getAllPackages = container.get<GetAllPackages>('GetAllPackages');
  const getPackageAvailability = container.get<GetPackageAvailability>('GetPackageAvailability');

  const { data: packages, isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: () => getAllPackages.execute(),
  });

  const checkAvailability = useMutation({
    mutationFn: (packageId: string) => getPackageAvailability.execute(packageId),
  });

  return {
    packages,
    isLoading,
    checkAvailability: checkAvailability.mutate,
  };
};

// hooks/useCart.ts
export const useCart = () => {
  const addItemToCart = container.get<AddItemToCart>('AddItemToCart');
  const removeItemFromCart = container.get<RemoveItemFromCart>('RemoveItemFromCart');
  const updateCartQuantity = container.get<UpdateCartQuantity>('UpdateCartQuantity');
  const clearCart = container.get<ClearCart>('ClearCart');

  const addItemMutation = useMutation({
    mutationFn: (request: AddItemRequest) => addItemToCart.execute(request),
    onSuccess: () => {
      // Update cart state
      toast.success('Item added to cart!');
    },
  });

  return {
    addItem: addItemMutation.mutate,
    removeItem: (itemId: string) => removeItemFromCart.execute(itemId),
    updateQuantity: (itemId: string, quantity: number) => 
      updateCartQuantity.execute({ itemId, quantity }),
    clearCart: () => clearCart.execute(),
  };
};

// hooks/useOrders.ts (Mercado Pago Integration)
export const useOrders = () => {
  const createOrder = container.get<CreateOrder>('CreateOrder');
  const getOrderById = container.get<GetOrderById>('GetOrderById');
  const getUserOrders = container.get<GetUserOrders>('GetUserOrders');

  const createOrderMutation = useMutation({
    mutationFn: (request: CreateOrderRequest) => createOrder.execute(request),
    onSuccess: (result) => {
      // Redirect to Mercado Pago checkout
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      }
    },
  });

  const { data: userOrders } = useQuery({
    queryKey: ['userOrders'],
    queryFn: () => getUserOrders.execute(),
  });

  return {
    createOrder: createOrderMutation.mutate,
    isCreatingOrder: createOrderMutation.isPending,
    userOrders,
    getOrderById: (preferenceId: string) => getOrderById.execute(preferenceId),
  };
};
```

### 3.7 Specific XperienceClimb Use Cases (No Database)

```typescript
// core/use-cases/packages/GetPackageAvailability.ts
import { injectable, inject } from 'inversify';

@injectable()
export class GetPackageAvailability {
  constructor(
    @inject('PackageRepository') private packageRepository: IPackageRepository
  ) {}

  async execute(packageId: string, date?: Date): Promise<AvailabilityResult> {
    const packageData = await this.packageRepository.findById(packageId);
    
    if (!packageData) {
      throw new Error('Package not found');
    }

    // Check availability rules specific to climbing packages
    const availability = await this.checkClimbingAvailability(packageData, date);
    
    return {
      available: availability.available,
      spotsLeft: availability.spotsLeft,
      nextAvailableDate: availability.nextAvailableDate,
      weatherConditions: availability.weatherConditions,
      restrictions: availability.restrictions,
    };
  }

  private async checkClimbingAvailability(
    packageData: Package, 
    date?: Date
  ): Promise<AvailabilityCheck> {
    // Business logic specific to climbing experiences
    // - Check weather conditions
    // - Verify instructor availability
    // - Check equipment availability
    // - Validate participant limits
    // - Check FLONA access permissions
  }
}

// core/use-cases/orders/ProcessClimbingOrder.ts (Mercado Pago Integration)
@injectable()
export class ProcessClimbingOrder {
  constructor(
    @inject('OrderRepository') private orderRepository: MercadoPagoOrderRepository,
    @inject('PaymentService') private paymentService: MercadoPagoService,
    @inject('EmailService') private emailService: IEmailService,
    @inject('PackageRepository') private packageRepository: StaticPackageRepository
  ) {}

  async execute(request: CreateClimbingOrderRequest): Promise<OrderResult> {
    // Validate climbing-specific requirements
    await this.validateClimbingRequirements(request);
    
    // Create order with Mercado Pago preference
    const order = await this.createClimbingOrder(request);
    
    // Create Mercado Pago preference (this handles payment processing)
    const preferenceId = await this.orderRepository.create(order);
    
    // Get checkout URL from Mercado Pago
    const checkoutUrl = await this.paymentService.getCheckoutUrl(preferenceId);
    
    return {
      orderId: order.id,
      preferenceId,
      checkoutUrl,
      status: 'pending_payment',
      // Payment processing happens on Mercado Pago side
      // Status will be updated via webhook
    };
  }

  private async validateClimbingRequirements(request: CreateClimbingOrderRequest) {
    // Validate age requirements (minimum 16 years)
    if (request.participantAge < 16) {
      throw new Error('Participants must be at least 16 years old');
    }

    // Check experience level requirements
    if (!['beginner', 'intermediate', 'advanced'].includes(request.experienceLevel)) {
      throw new Error('Invalid experience level');
    }

    // Verify package availability from static data
    const packageData = await this.packageRepository.findById(request.packageId);
    if (!packageData) {
      throw new Error('Package not available');
    }

    // Validate emergency contact
    if (!request.emergencyContact?.phone || !request.emergencyContact?.name) {
      throw new Error('Emergency contact is required');
    }
  }

  private async createClimbingOrder(request: CreateClimbingOrderRequest): Promise<Order> {
    return {
      id: generateId(),
      userId: request.userId,
      items: request.items,
      total: request.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending_payment',
      climbingDetails: {
        experienceLevel: request.experienceLevel,
        emergencyContact: request.emergencyContact,
        selectedDate: request.selectedDate,
        participantAge: request.participantAge,
        healthDeclaration: request.healthDeclaration,
      },
      createdAt: new Date(),
    };
  }

  // This method is called by webhook when payment is confirmed
  async handlePaymentConfirmation(paymentData: MercadoPagoWebhookData): Promise<void> {
    const order = await this.orderRepository.findById(paymentData.external_reference);
    
    if (order && paymentData.status === 'approved') {
      // Send confirmation emails with climbing details
      await this.sendClimbingConfirmation(order);
      
      // Send preparation checklist
      await this.sendPreparationChecklist(order);
    }
  }

  private async sendClimbingConfirmation(order: Order) {
    await this.emailService.sendClimbingConfirmation({
      to: order.userEmail,
      order,
      details: {
        meetingPoint: 'Entrada da FLONA de Ipanema',
        meetingTime: '07:00',
        whatToBring: [
          'Roupas confortáveis para atividade física',
          'Tênis com boa aderência',
          'Protetor solar',
          'Garrafa de água',
          'Lanche energético',
        ],
        emergencyContact: '+55 15 99999-9999',
        weatherPolicy: 'Em caso de chuva, a atividade será reagendada',
      },
    });
  }
}
```

### 3.8 Component Integration Examples (No Database)

```typescript
// components/sections/PackagesSection.tsx
import { usePackages, useCart } from '@/hooks';

export function PackagesSection() {
  const { packages, isLoading, checkAvailability } = usePackages();
  const { addItem } = useCart();

  const handleSelectPackage = async (packageId: string) => {
    // Use case: Check availability before adding to cart
    const availability = await checkAvailability(packageId);
    
    if (availability.available) {
      await addItem({
        packageId,
        participantName: 'Current User',
        selectedDate: new Date(),
      });
    } else {
      toast.error(`Package not available. Next available date: ${availability.nextAvailableDate}`);
    }
  };

  if (isLoading) return <PackagesSkeleton />;

  return (
    <section className="packages">
      {packages?.map(pkg => (
        <PackageCard 
          key={pkg.id}
          package={pkg}
          onSelect={() => handleSelectPackage(pkg.id)}
        />
      ))}
    </section>
  );
}

// components/checkout/CheckoutForm.tsx
import { useAuth, useOrders } from '@/hooks';

export function CheckoutForm() {
  const { userProfile } = useAuth();
  const { createOrder } = useOrders();

  const handleSubmit = async (formData: CheckoutFormData) => {
    try {
      // Use case: Process climbing order with all business rules
      const result = await createOrder({
        userId: userProfile.id,
        items: cartItems,
        participantDetails: formData.participants,
        paymentMethod: formData.paymentMethod,
        emergencyContact: formData.emergencyContact,
        experienceLevel: formData.experienceLevel,
      });

      if (result.status === 'confirmed') {
        router.push(`/checkout/success?orderId=${result.orderId}`);
      }
    } catch (error) {
      toast.error('Error processing order: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### 3.9 Testing Use Cases (No Database)

```typescript
// __tests__/use-cases/GetPackageAvailability.test.ts
import { GetPackageAvailability } from '@/core/use-cases/packages/GetPackageAvailability';
import { MockPackageRepository } from '@/tests/mocks';

describe('GetPackageAvailability', () => {
  let useCase: GetPackageAvailability;
  let mockRepository: MockPackageRepository;

  beforeEach(() => {
    mockRepository = new MockPackageRepository();
    useCase = new GetPackageAvailability(mockRepository);
  });

  it('should return availability for valid package', async () => {
    // Arrange
    const packageId = 'silver';
    const mockPackage = createMockPackage(packageId);
    mockRepository.findById.mockResolvedValue(mockPackage);

    // Act
    const result = await useCase.execute(packageId);

    // Assert
    expect(result.available).toBe(true);
    expect(result.spotsLeft).toBeGreaterThan(0);
  });

  it('should throw error for invalid package', async () => {
    // Arrange
    mockRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute('invalid-id'))
      .rejects.toThrow('Package not found');
  });
});

// __tests__/use-cases/ProcessClimbingOrder.test.ts
describe('ProcessClimbingOrder', () => {
  it('should process order with valid climbing requirements', async () => {
    // Test business logic specific to climbing orders
  });

  it('should reject order if age requirements not met', async () => {
    // Test age validation business rules
  });

  it('should handle payment failures gracefully', async () => {
    // Test payment failure scenarios
  });
 });
 ```

### 3.10 Benefits for XperienceClimb (No Database Architecture)

**🎯 Business Logic Isolation:**
- Weather condition checks are encapsulated in Use Cases
- Climbing safety rules are centralized and testable
- Package availability logic works with static data
- Payment processing isolated from business rules

**💾 Data Storage Benefits:**
- **Zero database costs** - No hosting, maintenance, or scaling concerns
- **Automatic backups** - Privy and Mercado Pago handle data persistence
- **Simplified deployment** - No database migrations or setup
- **Faster development** - No schema design or ORM configuration

**🔄 Scalability:**
- Easy to add new package types (static constants)
- Simple to implement new payment methods (Mercado Pago supports many)
- Straightforward to add new notification channels
- User data scales automatically with Privy

**🧪 Testing:**
- Business rules tested independently of external services
- Mock Privy and Mercado Pago for fast unit testing
- No database seeding required for tests
- Integration tests focus on real API scenarios

**🔧 Maintenance:**
- No database schema maintenance
- External services handle security and compliance
- Clear separation makes debugging easier
- Reduced infrastructure complexity

**📈 Future Features:**
- Weather API integration
- Multi-language support
- Advanced booking rules via business logic
- Instructor scheduling (can use external calendar APIs)
- Equipment tracking (via external inventory APIs)

---

## 🔐 Phase 4: Privy Authentication Implementation

### 4.1 Privy Configuration

```typescript
// lib/privy.ts
import { PrivyProvider } from '@privy-io/react-auth';

export const privyConfig = {
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  config: {
    loginMethods: ['email', 'google', 'apple'],
    appearance: {
      theme: 'light',
      accentColor: '#21808D',
      logo: '/logo.png',
    },
    embeddedWallets: {
      createOnLogin: 'off',
    },
  },
};
```

### 4.2 Authentication Components

**LoginButton.tsx**
```typescript
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth';

export function LoginButton() {
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();
  const { logout } = useLogout();

  // Login/logout button implementation
}
```

**AuthGuard.tsx** - Route protection
```typescript
interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
```

### 4.3 Login Screen

**app/login/page.tsx**
- Minimalist design aligned with theme
- Privy integration
- Post-login redirection

---

## 🛒 Phase 5: Shopping Cart System

### 5.1 Global State with Zustand

```typescript
// store/useCartStore.ts
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'silver' | 'gold' | 'premium';
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}
```

### 5.2 Cart Components

**CartButton.tsx** - Floating cart button
```typescript
// Badge with item counter
// Add item animation
// Drawer/modal integration
```

**CartDrawer.tsx** - Side cart drawer
```typescript
// Item list
// Quantity controls
// Checkout button
// Total calculation
```

### 5.3 Package Section Improvements

```typescript
// Add to cart directly from cards
// Feedback animations
// Loading states
// Package customization
```

---

## 💳 Phase 6: Mercado Pago Integration

### 6.1 Mercado Pago Configuration

```typescript
// lib/mercadopago.ts
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: {
    timeout: 5000,
  }
});

export { client };
```

### 6.2 API Routes (Vercel Functions)

**api/mercadopago/create-preference/route.ts**
```typescript
// Payment preference creation
// Value calculation
// Return URLs configuration
// Order metadata
```

**api/mercadopago/webhook/route.ts**
```typescript
// Webhook processing
// Order status updates
// Email notifications
// Audit logs
```

**api/orders/route.ts**
```typescript
// Orders CRUD
// Purchase history
// Reports
```

### 6.3 Checkout Page

**app/checkout/page.tsx**
```typescript
// Order summary
// Personal data form
// Payment method selection
// Mercado Pago SDK integration
// Loading and error states
```

### 6.4 Payment Components

**PaymentMethods.tsx**
```typescript
// PIX (instant)
// Credit/debit card
// Bank slip
// Mercado Pago wallet integration
```

---

## 🎨 Phase 7: UX/UI Improvements

### 7.1 Animations and Microinteractions

```typescript
// Framer Motion for smooth animations
// Enhanced scroll reveal
// Consistent hover states
// Loading states on all actions
// Visual feedback for all interactions
```

### 7.2 Enhanced Responsive Design

```css
/* Mobile-first approach */
/* Consistent breakpoints */
/* Touch-friendly on mobile */
/* Optimized performance */
```

### 7.3 Accessibility

```typescript
// ARIA labels on all components
// Keyboard navigation
// High contrast
// Screen reader friendly
// Semantic HTML
```

### 7.4 Performance

```typescript
// Next.js Image Optimization
// Code splitting by routes
// Lazy loading components
// Critical resource preloading
// Bundle analyzer
```

---

## 🚀 Phase 8: Vercel Deploy and Configuration

### 8.1 Vercel Project Configuration

```bash
# Connect GitHub repository
# Configure environment variables
# Custom domain setup
# Configure redirects
```

### 8.2 Environment Variables

```env
# .env.local
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
MERCADOPAGO_ACCESS_TOKEN=your_mp_access_token
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=your_mp_public_key
MERCADOPAGO_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_SITE_URL=https://xperienceclimb.vercel.app
NEXT_PUBLIC_CONTACT_EMAIL=contact@xperienceclimb.com
```

### 8.3 Build Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/api/webhook/mercadopago",
      "destination": "/api/mercadopago/webhook"
    }
  ]
}
```

### 8.4 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm run test
      - name: Build project
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
```

---

## 📱 Phase 9: Additional Features and Optimizations

### 9.1 Progressive Web App (PWA)

```typescript
// Service Worker for offline cache
// Manifest.json for installation
// Push notifications for offers
// Offline fallbacks
```

### 9.2 Analytics and Tracking

```typescript
// Google Analytics 4
// Conversions tracking
// Heatmaps (Hotjar)
// Error tracking (Sentry)
```

### 9.3 SEO Optimization

```typescript
// Dynamic metadata
// Structured data (JSON-LD)
// Automatic sitemap
// Open Graph tags
// Twitter Cards
```

### 9.4 Review System

```typescript
// Experience reviews
// User photos
// Content moderation
// Aggregated rating
```

---

## 🧪 Phase 10: Testing and Quality

### 10.1 Unit Tests

```typescript
// Jest + React Testing Library
// Component tests
// Hook tests
// Utils tests
```

### 10.2 Integration Tests

```typescript
// Cypress for E2E
// Complete purchase flow
// Authentication tests
// Payment tests (sandbox)
```

### 10.3 Performance Testing

```typescript
// Lighthouse CI
// Bundle size monitoring
// Core Web Vitals
// Load testing
```

---

## 📈 Phase 11: Monitoring and Maintenance

### 11.1 Monitoring

```typescript
// Uptime monitoring
// Error tracking
// Performance metrics
// User behavior analytics
```

### 11.2 Backup and Security

```typescript
// Automatic data backup
// API rate limiting
// Input validation
// HTTPS enforcing
// Security headers
```

---

## 📅 Execution Timeline

| Phase | Description | Duration | Status |
|-------|-------------|----------|--------|
| 0 | Git Repository Configuration | 0.5 day | 🔄 |
| 1 | Backup and Next.js Setup in current folder | 1 day | ⏳ |
| 2 | Content Migration (HTML→JSX, CSS→Tailwind, JS→React) | 3 days | ⏳ |
| 3 | Clean Architecture and Use Cases Implementation | 3 days | ⏳ |
| 4 | Privy Authentication | 2 days | ⏳ |
| 5 | Shopping Cart | 3 days | ⏳ |
| 6 | Mercado Pago Integration | 4 days | ⏳ |
| 7 | UX/UI Improvements | 3 days | ⏳ |
| 8 | Vercel Deploy and Configuration | 2 days | ⏳ |
| 9 | Additional Features and PWA | 3 days | ⏳ |
| 10 | Testing and Quality | 2 days | ⏳ |
| 11 | Monitoring and Maintenance | 1 day | ⏳ |

**Total estimated: 27.5 business days**

### 📋 Phase 1 Details (Critical)

**Backup and Next.js Setup in current folder** (1 day):
- ✅ Complete backup of current files
- ✅ Next.js initialization in current folder
- ✅ Dependencies installation
- ✅ Initial Tailwind configuration
- ✅ Assets preservation (images, etc.)
- ✅ Compatibility verification

---

## 🎯 Final Deliverables

### ✅ Complete Next.js Website
- ✅ Preserved and improved responsive design
- ✅ Optimized performance
- ✅ SEO-friendly

### ✅ Authentication System
- ✅ Login via Privy (email, Google, Apple)
- ✅ User profiles
- ✅ Route protection

### ✅ Complete E-commerce
- ✅ Shopping cart
- ✅ Integrated checkout
- ✅ Payments via Mercado Pago
- ✅ Order management

### ✅ Infrastructure
- ✅ Automated deploy on Vercel
- ✅ Serverless APIs
- ✅ Monitoring and analytics

### ✅ Documentation
- ✅ Detailed README
- ✅ API documentation
- ✅ Development guide
- ✅ Deploy manual

---

## 🔧 Useful Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run linter
npm run test         # Run tests

# Deploy
vercel               # Manual deploy
vercel --prod        # Deploy to production
vercel env ls        # List environment variables
vercel logs          # View logs
```

---

## 🚨 Important Considerations

### 🔒 Security
- Strict input data validation
- Content sanitization
- API rate limiting
- Audit logs

### 💰 Costs
- Vercel: Free plan for startup
- Privy: Free plan up to 1000 users/month
- Mercado Pago: Transaction fee (~4%)

### 📊 Scalability
- Architecture prepared for growth
- Database scaling options
- CDN for static assets
- Caching strategies

---

## 📞 Next Steps

1. **Plan Approval**: Review and approval of phases
2. **Backup and Preservation**: Create backup of current files
3. **Next.js Setup**: Migration in current folder `/Users/gosouza/projetos-p/XperienceClimb`
4. **Content Migration**: Convert HTML/CSS/JS to React/TypeScript
5. **Features Kick-off**: Authentication and e-commerce implementation
6. **Regular Reviews**: Weekly progress tracking
7. **Testing and Feedback**: Continuous testing during development
8. **Launch**: Final deploy and go-live

### 🚀 Quick Start Command

To start migration immediately:

```bash
cd /Users/gosouza/projetos-p/XperienceClimb
mkdir backup-original
cp index.html app.js style.css backup-original/
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

---

*This plan was created to transform XperienceClimb into a modern, scalable platform ready for business growth. Each phase was designed to minimize risks and maximize delivered value, with a special focus on Clean Architecture and Use Cases for long-term maintainability.*

**🎯 Final Goal**: Transform visitors into customers through an exceptional digital experience that reflects the adventure and excitement of climbing, built on a solid, testable and scalable architecture.**

## 🏛️ Architecture Summary (No Database)

The XperienceClimb platform will be built using **Clean Architecture** principles **without a traditional database**:

- **🎯 Use Cases**: Encapsulate all business logic (climbing rules, availability, payments)
- **🏗️ Entities**: Core business models (User, Package, Order, CartItem)
- **🔌 Repositories**: Data access abstractions for external services
- **⚡ Services**: External integrations (Privy, Mercado Pago, Email)
- **🎨 React Components**: Pure UI components that use custom hooks
- **🪝 Custom Hooks**: Bridge between React and Use Cases

**💾 Data Storage Strategy:**
- **👤 Users**: Managed by **Privy** (authentication + profile data)
- **📦 Packages**: **Static constants** (Silver, Gold, Premium)
- **📋 Orders**: **Mercado Pago metadata** (preferences + webhooks)
- **🛒 Cart**: **Zustand store** (browser localStorage)

This architecture ensures complete separation of concerns while leveraging external services for data persistence, resulting in zero database costs and simplified maintenance.**