import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  BACKEND_URL,
  deleteToken,
  getToken,
  saveToken,
} from "@/constants/utils";
import axios from "axios";
import { useRouter } from "expo-router";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await getToken();
        if (token) {
          setToken(token);
          const res = await axios.get(`${BACKEND_URL}/api/auth`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("user data", res.data);
          setUser(res.data.user);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  //   login
  const signIn = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/signin`, {
        email,
        password,
      });

      if (res.status === 200) {
        saveToken(res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        router.push("/");
      }
      return { success: true };
    } catch (error: any) {
      console.log("error");
      return { success: false, message: error.response.data.message };
    }
  };

  //   logout
  const signOut = async () => {
    try {
      deleteToken();
      setUser(null);
      setToken(null);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
