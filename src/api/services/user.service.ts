/**
 * User service.
 * Handles all user-related API calls.
 */

import { axiosInstance } from "../client/axios";
import { USER_ENDPOINTS } from "../endpoints";
import {
  User,
  CreateUserPayload,
  UpdateUserPayload,
  UserQueryParams,
} from "../types";
import { mapUser, mapUsers } from "../transformers/user.mapper";

/**
 * Get all users with optional query parameters.
 */
export async function getUsers(
  params?: UserQueryParams,
): Promise<User[]> {
  const response = await axiosInstance.get<User[]>(
    USER_ENDPOINTS.GET_ALL.path,
    { params },
  );
  return mapUsers(response.data);
}

/**
 * Get user by ID.
 */
export async function getUserById(id: number): Promise<User> {
  const path = USER_ENDPOINTS.GET_BY_ID.path.replace("{id}", String(id));
  const response = await axiosInstance.get<User>(path);
  return mapUser(response.data);
}

/**
 * Create a new user.
 */
export async function createUser(
  payload: CreateUserPayload,
): Promise<User> {
  const response = await axiosInstance.post<User>(
    USER_ENDPOINTS.CREATE.path,
    payload,
  );
  return mapUser(response.data);
}

/**
 * Update an existing user.
 */
export async function updateUser(
  id: number,
  payload: UpdateUserPayload,
): Promise<User> {
  const path = USER_ENDPOINTS.UPDATE.path.replace("{id}", String(id));
  const response = await axiosInstance.put<User>(path, payload);
  return mapUser(response.data);
}

/**
 * Delete a user.
 */
export async function deleteUser(id: number): Promise<void> {
  const path = USER_ENDPOINTS.DELETE.path.replace("{id}", String(id));
  await axiosInstance.delete(path);
}