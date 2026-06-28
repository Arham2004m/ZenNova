import React from "react";

const SearchIcon = () => (
  <svg
    className="icon svg-icon-ti-ti-search"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M21 21l-6 -6" />
  </svg>
);

export default function HeaderSearchForm() {
  return (
    <div className="zn-header-search-host tp-search-area">
      <button
        type="button"
        className="zn-header-search-host__close tp-search-close-btn d-lg-none"
        aria-label="Close search"
      />
      <form
        role="search"
        action="/products"
        data-ajax-url="/ajax/search-products"
        method="GET"
        className="zn-header-search-form bb-form-quick-search"
        id="bb-form-quick-search"
      >
        <div className="zn-header-search-bar">
          <input
            type="search"
            name="q"
            placeholder="Search for Products..."
            autoComplete="off"
            className="zn-header-search-bar__input"
            aria-label="Search for products"
          />
          <button type="submit" className="zn-header-search-bar__submit" title="Search">
            <SearchIcon />
          </button>
        </div>
        <div className="bb-quick-search-results" />
      </form>
    </div>
  );
}
