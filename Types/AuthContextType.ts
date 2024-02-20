import { UserInfo } from './UserInfo.ts';

export interface AuthContextType {
    userInfo: UserInfo | null;
    signInWithGoogle: () => Promise<void>;
    signInWithFacebook: () => Promise<void>;
    signOut: () => Promise<void>;
    isInProgress: boolean;
}
