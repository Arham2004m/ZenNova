"use client";

import { useEffect } from "react";

function highlightSearchTerms(container: HTMLElement, query: string) {
  const words = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (!words.length) return;

  const pattern = new RegExp(`(${words.join("|")})`, "gi");
  container.querySelectorAll(".bb-quick-search-item-name").forEach((node) => {
    const text = node.textContent || "";
    node.innerHTML = text.replace(
      pattern,
      '<span class="bb-quick-search-highlight">$1</span>'
    );
  });
}

export default function SearchBridge() {
  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let activeController: AbortController | null = null;

    const openSearch = () => {
      document.querySelector(".zn-header-search-host")?.classList.add("opened");
      document.querySelector(".tp-search-area.zn-header-search-host")?.classList.add("opened");
      document.querySelector(".body-overlay")?.classList.add("opened");
      window.setTimeout(() => {
        const input = document.querySelector<HTMLInputElement>(
          "#bb-form-quick-search input[name='q']"
        );
        input?.focus();
      }, 120);
    };

    const closeSearch = () => {
      document.querySelector(".zn-header-search-host")?.classList.remove("opened");
      document.querySelector(".tp-search-area.zn-header-search-host")?.classList.remove("opened");
      document.querySelector(".body-overlay")?.classList.remove("opened");
      document.querySelectorAll(".bb-quick-search-results").forEach((node) => {
        node.classList.remove("show");
        (node as HTMLElement).innerHTML = "";
      });
    };

    const runQuickSearch = async (form: HTMLFormElement, query: string) => {
      const results = form.querySelector(".bb-quick-search-results") as HTMLElement | null;
      if (!results) return;

      const endpoint = form.getAttribute("data-ajax-url") || "/ajax/search-products";

      if (!query) {
        results.classList.remove("show");
        results.innerHTML = "";
        return;
      }

      activeController?.abort();
      activeController = new AbortController();

      try {
        const response = await fetch(
          `${endpoint}?q=${encodeURIComponent(query)}`,
          { signal: activeController.signal }
        );
        const json = await response.json();
        if (json.error || !json.data) {
          results.classList.remove("show");
          results.innerHTML = "";
          return;
        }

        results.innerHTML = json.data;
        results.classList.add("show");
        highlightSearchTerms(results, query);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          results.classList.remove("show");
        }
      }
    };

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest(".tp-search-open-btn")) {
        event.preventDefault();
        openSearch();
        return;
      }

      if (
        target.classList.contains("body-overlay") ||
        target.closest(".body-overlay")
      ) {
        closeSearch();
        return;
      }

      if (target.closest(".tp-search-close-btn, .zn-header-search-host__close")) {
        event.preventDefault();
        closeSearch();
        return;
      }

      if (!target.closest(".bb-form-quick-search")) {
        document.querySelectorAll(".bb-quick-search-results").forEach((node) => {
          node.classList.remove("show");
        });
      }
    };

    const onInput = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (!input.matches(".bb-form-quick-search input[name='q']")) return;

      const form = input.closest("form") as HTMLFormElement | null;
      if (!form) return;

      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        runQuickSearch(form, input.value.trim());
      }, 220);
    };

    const onSubmit = (event: Event) => {
      const form = (event.target as HTMLElement).closest(
        "form.bb-form-quick-search"
      ) as HTMLFormElement | null;
      if (!form) return;

      event.preventDefault();
      const input = form.querySelector<HTMLInputElement>("input[name='q']");
      const query = input?.value.trim() || "";
      if (!query) return;

      window.location.href = `/products?q=${encodeURIComponent(query)}`;
    };

    document.addEventListener("click", onDocumentClick, true);
    document.addEventListener("input", onInput, true);
    document.addEventListener("submit", onSubmit, true);

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      activeController?.abort();
      document.removeEventListener("click", onDocumentClick, true);
      document.removeEventListener("input", onInput, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  return null;
}
