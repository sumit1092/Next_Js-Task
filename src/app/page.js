"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import {
  Card,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Stack,
  Title,
  Center,
} from "@mantine/core";
import { showToast } from "../app/redux/slices/uiSlice"; 

function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form));
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(showToast({ message: "Login successful!", type: "success" }));
      router.push("/dashboard");
    }else {
    dispatch(
      showToast({ message: "Invalid email or password", type: "error" })
    );
  }
  };

  return (
    <Center h="100vh" bg="gray.1">
      <Card shadow="md" p="xl" radius="lg" withBorder w={550} h={350}>
        <form onSubmit={handleSubmit}>
          <Stack align="center" spacing="md">
            <Title order={2}>Login</Title>

            <TextInput
              label="Email"
              placeholder="emailname@.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              w={350}
            />

            <PasswordInput
              label="Password"
              placeholder="••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              w={350}
            />

            {error && <Text c="red">{error}</Text>}

            <Button type="submit" loading={loading} w={350}>
              Sign In
            </Button>
          </Stack>
        </form>
      </Card>
    </Center>
  );
}

export default LoginPage;
