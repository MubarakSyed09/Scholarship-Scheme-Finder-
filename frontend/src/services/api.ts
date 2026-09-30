import type { ProfileRequest, Scheme } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Fetch all available scholarship schemes.
 */
export async function fetchAllSchemes(): Promise<Scheme[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/schemes`);
    if (!response.ok) {
      throw new Error(`Failed to load schemes: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all schemes:', error);
    throw error;
  }
}

/**
 * Fetch a single scheme by its numeric ID.
 */
export async function fetchSchemeById(id: number): Promise<Scheme> {
  try {
    const response = await fetch(`${API_BASE_URL}/schemes/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to load scheme #${id}: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching scheme #${id}:`, error);
    throw error;
  }
}

/**
 * Submit student profile and receive filtered, prioritized eligible schemes.
 */
export async function fetchEligibleSchemes(profile: ProfileRequest): Promise<Scheme[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMsg = errorData?.message || `Matching service error: ${response.status}`;
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error('Error matching schemes for profile:', error);
    throw error;
  }
}
