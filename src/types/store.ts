import { Event, User, LiveStreamData } from './index';

// Auth slice types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Event slice types
export interface EventState {
  events: Event[];
  selectedEvent: Event | null;
  liveStreamEvent: LiveStreamData | null;
  isLoading: boolean;
  error: string | null;
}

// Settings slice types
export interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

// API response types for RTK Query
export interface EventApiResponse {
  event: Event[];
  success: boolean;
  message?: string;
}

export interface UserApiResponse {
  user: User;
  success: boolean;
  message?: string;
}

export interface TransactionApiResponse {
  transaction: any; // Define based on your transaction structure
  success: boolean;
  message?: string;
}

// RTK Query base types
export interface BaseApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Selector types
export type SelectCurrentUserData = (state: any) => User | null;
export type SelectLiveStreamEvent = (state: any) => LiveStreamData | null;
export type SelectEvent = (state: any) => Event | null;
export type SelectEvents = (state: any) => Event[];

// Root state type
export interface RootState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
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
