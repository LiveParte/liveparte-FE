import { Event, User, LiveStreamData } from './index';

// Layout component props
export interface NoAuthProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export interface WithAuthProps {
  children: React.ReactNode;
  showHeader?: boolean;
  redirectTo?: string;
}

// Event component props
export interface EventCardProps {
  event: Event;
  onSelect?: (event: Event) => void;
  onPurchase?: (event: Event) => void;
  onGift?: (event: Event) => void;
  onShare?: (event: Event) => void;
  className?: string;
}

export interface EventDetailsProps {
  HeroSectionEvent: Event;
  onPurchase?: (event: Event) => void;
  onGift?: (event: Event) => void;
  onShare?: (event: Event) => void;
}

export interface HeroProps {
  HeroSectionEvent: Event;
  isOnDemand?: boolean;
  notEvent?: boolean;
  isSingleEvent?: boolean;
  isLoading?: boolean;
  openModalLoginSignUp?: () => void;
  openModal?: () => void;
  giftTicket?: () => void;
  openModalShareEvent?: () => void;
  router?: any; // Next.js router type
}

// LiveStream component props
export interface LiveStreamProps {
  isLive: boolean;
  liveStreamDetail: LiveStreamData;
  handleOpenModal: (modalName: string) => void;
  handleCloseModal: () => void;
  userProfileData: User;
  isLoading: boolean;
  isYoutubeVideo?: boolean;
}

// Modal component props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface GiftTicketModalProps {
  Data: Event;
  closeModal: () => void;
}

export interface ShareEventModalProps {
  Data: Event;
  closeModal: () => void;
}

// Chat component props
export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  isGift?: boolean;
  giftAmount?: number;
}

export interface ChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onSendGift: (amount: number) => void;
  isConnected: boolean;
}

// Video player props
export interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  onReady?: () => void;
  onError?: (error: any) => void;
  className?: string;
}

// Header component props
export interface HeaderProps {
  user?: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
  showAuthButtons?: boolean;
  className?: string;
}

// Form component props
export interface FormFieldProps {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  loading?: boolean;
}
