"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AppShell,
  Group,
  Button,
  Collapse,
  ScrollArea,
  Text,
} from "@mantine/core";
import { IconChevronRight, IconChevronDown } from "@tabler/icons-react";

function Sidebar({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [opened, setOpened] = useState(true); 
  const [openMasters, setOpenMasters] = useState(false);

  return (
    <AppShell
      layout="alt"
      navbar={{
        width: opened ? 240 : 70,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Navbar p="md" withBorder={true}>
        <Group position={opened ? "apart" : "center"} mb="lg">
          {opened && (
            <Text fw={700} fz="lg" c="indigo">
              NTTS
            </Text>
          )}
          <Button
            variant="subtle"
            size="xs"
            onClick={() => setOpened((o) => !o)}
          >
            {opened ? "<" : ">"}
          </Button>
        </Group>

        <ScrollArea style={{ flex: 1 }}>
          <Button
            fullWidth
            variant={pathname === "/dashboard" ? "light" : "subtle"}
            color={pathname === "/dashboard" ? "indigo" : "gray"}
            justify="flex-start"
            onClick={() => router.push("/dashboard")}
            mb="xs"
          >
            Dashboard
          </Button>

          <div>
            <Button
              fullWidth
              variant="subtle"
              justify="space-between"
              onClick={() => setOpenMasters((o) => !o)}
              rightSection={
                openMasters ? (
                  <IconChevronDown size={16} />
                ) : (
                  <IconChevronRight size={16} />
                )
              }
            >
              Masters
            </Button>

            <Collapse in={openMasters}>
              <Button
                fullWidth
                ml={opened ? 16 : 0}
                mt="xs"
                variant={
                  pathname === "/dashboard/masters/employee"
                    ? "light"
                    : "subtle"
                }
                color={
                  pathname === "/dashboard/masters/employee" ? "indigo" : "gray"
                }
                justify="flex-start"
                onClick={() => router.push("/dashboard/masters/employee")}
              >
                Employee
              </Button>
            </Collapse>
          </div>
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default Sidebar;