// src/components/ExplainSelection.jsx
"use client";
import { useEffect, useRef, useState } from "react";

const MAX_LENGTH = 120;

export default function ExplainSelection() {
  const [showButton, setShowButton] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [definition, setDefinition] = useState("");
  const [showModal, setShowModal] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    function handleSelection() {
      // Small delay to ensure selection is complete
      setTimeout(() => {
        const selection = window.getSelection();
        const text = selection.toString().trim();
        
        // Hide if no selection or too long
        if (!text || text.length > MAX_LENGTH) {
          setShowButton(false);
          return;
        }

        // Get selection position
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Calculate button position with safety margins
        const top = rect.top + window.scrollY - 50;
        const left = rect.left + window.scrollX + (rect.width / 2);
        
        // Ensure button stays within viewport
        const safeTop = Math.max(10, top);
        const safeLeft = Math.max(50, Math.min(left, window.innerWidth - 100));

        setSelectedText(text);
        setButtonStyle({ top: safeTop, left: safeLeft });
        setShowButton(true);
      }, 10);
    }

    function hideButton() {
      setShowButton(false);
      setSelectedText("");
    }

    // Add event listeners
    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("click", (e) => {
      // Don't hide if clicking the button or modal
      if (btnRef.current?.contains(e.target) || showModal) return;
      hideButton();
    });

    return () => {
      document.removeEventListener("mouseup", handleSelection);
    };
  }, [showModal]);

  async function handleExplain() {
    if (!selectedText) return;
    
    setLoading(true);
    setShowButton(false);
    
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term: selectedText }),
      });
      const data = await res.json();
      setDefinition(data.definition || "No definition found.");
      setShowModal(true);
    } catch (err) {
      setDefinition("Could not fetch explanation.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {showButton && (
        <button
          ref={btnRef}
          onClick={handleExplain}
          className="fixed bg-blue-500 text-white px-3 py-1 text-sm rounded-md shadow-lg hover:bg-blue-600 transition-colors"
          style={{
            top: `${buttonStyle.top}px`,
            left: `${buttonStyle.left}px`,
            transform: "translateX(-50%)",
            zIndex: 9999,
          }}
        >
          {loading ? "..." : "Explain"}
        </button>
      )}

      {showModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/50 p-4"
          style={{ zIndex: 10000 }}
        >
          <div className="bg-white max-w-lg w-full rounded-lg p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Definition</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">{definition}</p>
          </div>
        </div>
      )}
    </>
  );
}
