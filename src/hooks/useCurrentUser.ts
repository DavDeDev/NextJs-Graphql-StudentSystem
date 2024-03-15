import { User } from '@auth/core/types';
import { useSession } from 'next-auth/react';

export const useCurrentUser = () : User | undefined => {
  const session = useSession();
  return session.data?.user;
}