import React, { useEffect, useState } from "react";

const Toc: React.FC = () => {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll(".doc-article h2, .doc-article h3"),
    ) as HTMLElement[];
    const mappedHeadings = headingElements.map((h, index) => {
      if (!h.id) {
        h.id = `heading-${index}`;
      }
      return {
        id: h.id,
        text: h.textContent || "",
        level: h.tagName === "H2" ? 2 : 3,
      };
    });
    setHeadings(mappedHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);
          document
            .querySelectorAll(".toc-link.active")
            .forEach((l) => l.classList.remove("active"));
          if (entry.isIntersecting) {
            tocLink?.classList.add("active");
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 1.0 },
    );

    headingElements.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="toc-sidebar">
      <div className={`toc-wrapper ${headings.length === 0 ? "hidden" : ""}`}>
        <h3 className="toc-title">On this page</h3>
        <ul id="toc-list">
          {headings.map((h) => (
            <li key={h.id}>
              <a href={`#${h.id}`} className={`toc-link toc-level-${h.level}`}>
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Toc;
