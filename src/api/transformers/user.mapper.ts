/**
 * User data transformers.
 * Maps API responses to application types.
 */

import { User, CreateUserPayload, UpdateUserPayload } from "../types";

/**
 * Transform user API response.
 */
export function mapUser(response: User): User {
  return {
    id: response.id,
    email: response.email,
    name: response.name,
    role: response.role,
    avatar: response.avatar,
    creationAt: response.creationAt,
  };
}

/**
 * Transform user array response.
 */
export function mapUsers(response: User[]): User[] {
  return response.map(mapUser);
}

/**
 * Transform create user payload.
 */
export function mapCreateUserPayload(
  payload: CreateUserPayload,
): CreateUserPayload {
  return {
    email: payload.email,
    password: payload.password,
    name: payload.name,
    avatar: payload.avatar,
    role: payload.role,
  };
}

/**
 * Transform update user payload.
 */
export function mapUpdateUserPayload(
  payload: UpdateUserPayload,
): UpdateUserPayload {
  return {
    email: payload.email,
    password: payload.password,
    name: payload.name,
    avatar: payload.avatar,
    role: payload.role,
  };
}