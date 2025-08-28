"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { showToast } from "../../redux/slices/uiSlice";
import { useRouter } from "next/navigation";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "lucide-react";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSignout = () => {
    dispatch(logout());
    dispatch(showToast({ type: "success", message: "Signed out successfully" }));
    router.push("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <span>NTTs Portal</span>
      </div>
      <div className="header-right">
        {user && <span className="user">Welcome, {user.name}</span>}

        {/* Dark Mode Toggle */}
        {mounted && (
          <ActionIcon
            variant="light"
            color={dark ? "yellow" : "blue"}
            onClick={() => setColorScheme(dark ? "light" : "dark")}
            title="Toggle dark mode"
            className="darkmode-btn"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </ActionIcon>
        )}

        <button onClick={handleSignout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
