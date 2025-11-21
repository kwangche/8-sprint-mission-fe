import { api } from './apiClient';

interface SignUpData {
  email: string;
  nickname: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface SignUpResponse {
  message?: string;
  user?: {
    id: string;
    email: string;
    nickname: string;
  };
}

interface SignInResponse {
  message?: string;
  user?: {
    id: string;
    email: string;
    nickname?: string;
  };
  refreshToken?: string;
}

interface RefreshTokenResponse {
  message?: string;
  user?: {
    id: string;
    email: string;
    nickname?: string;
  };
}

interface User {
  id: string;
  email: string;
  nickname?: string;
  [key: string]: unknown;
}

interface UpdateUserData {
  nickname?: string;
  [key: string]: unknown;
}

// 회원가입
export async function signUp({ email, nickname, password }: SignUpData) {
  return api.post<SignUpResponse>('/auth/signUp', { email, nickname, password });
}

// 로그인
export async function signIn({ email, password }: SignInData) {
  return api.post<SignInResponse>('/auth/signIn', { email, password });
}

// 로그아웃
export async function signOut() {
  return api.post<{ message?: string }>('/auth/logout', {});
}

// 토큰 갱신
export async function refreshAccessToken(refreshToken: string) {
  return api.post<RefreshTokenResponse>('/auth/refresh', { refreshToken });
}

// 사용자 조회
export async function getUser(userId: string) {
  return api.get<User>(`/auth/${userId}`, { auth: true });
}

// 사용자 정보 수정
export async function updateUser(userId: string, data: UpdateUserData) {
  return api.patch<User>(`/auth/${userId}`, data, { auth: true });
}

// 사용자 삭제
export async function deleteUser(userId: string) {
  return api.delete<{ message?: string }>(`/auth/${userId}`, { auth: true });
}
