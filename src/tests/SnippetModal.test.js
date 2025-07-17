import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SnippetModal from '../components/SnippetModal';

// Firestore test methods
jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  doc: jest.fn(),
  deleteDoc: jest.fn(() => Promise.resolve()),
}));

describe("SnippetModal Component", () => {
  const mockSnippet = {
    id: "1",
    title: "Test Snippet",
    language: "JavaScript",
    code: "console.log('Hello, world!');",
  };

  test("renders snippet title and language", () => {
    render(<SnippetModal snippet={mockSnippet} onClose={() => {}} refresh={() => {}} />);
    expect(screen.getByText("Test Snippet")).toBeInTheDocument();
    expect(screen.getByText(/JavaScript/i)).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<SnippetModal snippet={mockSnippet} onClose={onClose} refresh={() => {}} />);
    fireEvent.click(screen.getByText("✖"));
    expect(onClose).toHaveBeenCalled();
  });

  test("deletes snippet when delete is confirmed", async () => {
    window.confirm = jest.fn(() => true);
    const refresh = jest.fn();
    const onClose = jest.fn();

    render(<SnippetModal snippet={mockSnippet} onClose={onClose} refresh={refresh} />);
    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(() => {
      expect(refresh).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  test("copies code to clipboard", () => {
    navigator.clipboard = { writeText: jest.fn() };
    render(<SnippetModal snippet={mockSnippet} onClose={() => {}} refresh={() => {}} />);
    fireEvent.click(screen.getByText(/Copy/i));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockSnippet.code);
  });
});
