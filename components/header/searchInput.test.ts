import { expect, it, describe } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import SearchInput from "./SearchInput.vue";
import { createTestingPinia } from "@pinia/testing";
import { vi } from "vitest";

describe("SearchInput", () => {
  it("can mount the component", async () => {
    const component = await mountSuspended(SearchInput);
    expect(component.html()).toContain("button");
  });

  it("can fetch movie data", async () => {
    const component = await mountSuspended(SearchInput, {
      global: {
        plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn })],
      },
    });

    const moviesStore = useMoviesStore();

    await component.find("input").setValue("test");
    expect(component.find("input").element.value).toBe("test");
    await component.get("button").trigger("click");
    expect(moviesStore.searchMovies).toHaveBeenCalledTimes(1);
  });
});
