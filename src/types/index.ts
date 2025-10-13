// Common types used throughout the application

export interface User {
  _id: string;
  email: string;
  name: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  _id: string;
  name: string;
  description: string;
  event_date: string;
  event_length: number;
  streaming_url?: string;
  isLiveStreamed: boolean;
  eventStarted: boolean;
  price: number;
  currency: string;
  image?: string;
  thumbnail?: string;
  purchase?: {
    id?: string;
    _id?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface EventResponse {
  event: Event[];
  success: boolean;
  message?: string;
}

export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  profilePicture?: string;
  // Add other user profile fields as needed
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ModalState {
  isOpen: boolean;
  type?: string;
  data?: any;
}

export interface LiveStreamData extends Event {
  // Additional live stream specific properties
  agoraToken?: string;
  channelName?: string;
  isYoutubeVideo?: boolean;
}

// Redux store types
export interface RootState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  };
  event: {
    events: Event[];
    selectedEvent: Event | null;
    liveStreamEvent: LiveStreamData | null;
  };
  setting: {
    theme: 'light' | 'dark';
    language: string;
  };
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Next.js specific types
export interface NextPageProps {
  params?: { [key: string]: string | string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface NextApiRequest extends Request {
  query: { [key: string]: string | string[] };
  body: any;
  cookies: { [key: string]: string };
}

export interface NextApiResponse {
  status: (code: number) => NextApiResponse;
  json: (data: any) => NextApiResponse;
  send: (data: any) => NextApiResponse;
  end: () => void;
  setHeader: (name: string, value: string) => void;
}
