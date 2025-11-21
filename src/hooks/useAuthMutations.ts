'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { signIn, signUp, signOut, refreshAccessToken } from '@/lib/authApi';
import { saveRefreshToken } from '@/lib/authStorage';

interface SignUpParams {
  email: string;
  nickname: string;
  password: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface RefreshTokenParams {
  refreshToken: string;
}

export function useSignUpMutation(options?: UseMutationOptions<any, Error, SignUpParams>) {
  const signUpMutation = useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: async ({ email, nickname, password }: SignUpParams) => {
      const res = await signUp({ email, nickname, password });
      return res;
    },
    ...options,
  });
  return signUpMutation;
}

export function useSignInMutation(options?: UseMutationOptions<any, Error, SignInParams>) {
  const signInMutation = useMutation({
    mutationKey: ['auth', 'signin'],
    mutationFn: async ({ email, password }: SignInParams) => {
      const res = await signIn({ email, password });
      if (res?.refreshToken) {
        saveRefreshToken(res.refreshToken);
      }
      return res;
    },
    ...options,
  });
  return signInMutation;
}

export function useSignOutMutation(options?: UseMutationOptions<any, Error, void>) {
  const signOutMutation = useMutation({
    mutationKey: ['auth', 'signout'],
    mutationFn: async () => {
      return signOut();
    },
    ...options,
  });
  return signOutMutation;
}

export function useRefreshTokenMutation(
  options?: UseMutationOptions<any, Error, RefreshTokenParams>,
) {
  const refreshTokenMutation = useMutation({
    mutationKey: ['auth', 'refresh'],
    mutationFn: async ({ refreshToken }: RefreshTokenParams) => {
      const res = await refreshAccessToken(refreshToken);
      return res;
    },
    ...options,
  });
  return refreshTokenMutation;
}
