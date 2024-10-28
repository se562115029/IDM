import Navbar from "@/app/_components/Navbar";
import { persistedReducer } from "../app/redux";
import { renderWithProviders } from "@/utils/test-utils";
import { configureStore } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";

describe("Navbar", () => {
  it("Render navbar first time", async () => {
    const initialMode = { isSidebarCollapsed: false, isDarkMode: true };
    const data = renderWithProviders(<Navbar />, {
      preloadedState: {
        global: initialMode,
      },
      store: configureStore({ reducer: persistedReducer }),
    });

    const findSunIcon = data.container.querySelector(".lucide-sun");

    expect(findSunIcon).toBeInTheDocument();
  });

  it("Render navbar and click change to dark mode", async () => {
    const initialMode = { isSidebarCollapsed: false, isDarkMode: true };
    const data = renderWithProviders(<Navbar />, {
      preloadedState: {
        global: initialMode,
      },
      store: configureStore({ reducer: persistedReducer }),
    });

    act(() => {
      /* fire events that update state */
      data.getByTestId("change-mode").click();
    });

    const findMoonIcon = data.container.querySelector(".lucide-moon");

    expect(findMoonIcon).toBeInTheDocument();
  });
});
