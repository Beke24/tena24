import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../types";
import { storageKeys } from "../data/ethiopianFoods";

export type AuthPayload = { access: string; refresh: string; user: User };

type LocalUser = User & { password: string };

async function readUsers() {
  const raw = await AsyncStorage.getItem(storageKeys.users);
  return raw ? (JSON.parse(raw) as LocalUser[]) : [];
}

export async function register(full_name: string, email: string, password: string) {
  const users = await readUsers();
  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("A user with this email already exists.");
  }
  const user: LocalUser = { id: Date.now(), full_name, email: email.toLowerCase(), password };
  await AsyncStorage.setItem(storageKeys.users, JSON.stringify([...users, user]));
  return { id: user.id, full_name: user.full_name, email: user.email };
}

export async function login(email: string, password: string) {
  const users = await readUsers();
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
  if (!user) {
    throw new Error("Invalid email or password.");
  }
  return {
    access: `local-access-${user.id}`,
    refresh: `local-refresh-${user.id}`,
    user: { id: user.id, full_name: user.full_name, email: user.email }
  };
}
