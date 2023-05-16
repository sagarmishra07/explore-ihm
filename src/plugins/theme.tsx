import React from "react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

export const MainTheme = (props: any) => {
  return (
    <MantineProvider
      theme={{
        // Override any other properties from default theme
        fontFamily: "Open Sans",
        spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
        colors: {
          brand: [
            "#EEC4C4",
            "#EA9393",
            "#E67D7D",
            "#E26868",
            "#DD5252",
            "#D93D3D",
            "#CA8A04", // main color
            "#F4B740",
            "#801717",
            "#551010",
          ],
        },
        primaryColor: "brand",
        breakpoints: {
          xs: 0,
          sm: 600,
          md: 768,
          lg: 1279,
          xl: 1919,
        },
      }}
    >
      <NotificationsProvider>{props.children}</NotificationsProvider>
    </MantineProvider>
  );
};
