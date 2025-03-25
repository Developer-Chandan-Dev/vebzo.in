import { useRef } from "react";

const TableContainer = ({children}) => {
  const tableContainerRef = useRef(null);

  // <============= Table Dragging functionality (Optional: Add Touch Support) =============>

  const handleMouseDown = (e) => {
    const container = tableContainerRef.current;
    container.isDragging = true;
    container.startX = e.pageX - container.offsetLeft;
    container.scrollLeftStart = container.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const container = tableContainerRef.current;
    if (!container.isDragging) return;

    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = x - container.startX;
    container.scrollLeft = container.scrollLeftStart - walk;
  };

  const handleMouseUp = () => {
    const container = tableContainerRef.current;
    container.isDragging = false;
  };

  const handleTouchStart = (e) => {
    const container = tableContainerRef.current;
    container.isDragging = true;
    container.startX = e.touches[0].pageX - container.offsetLeft;
    container.scrollLeftStart = container.scrollLeft;
  };

  const handleTouchMove = (e) => {
    const container = tableContainerRef.current;
    if (!container.isDragging) return;

    e.preventDefault();
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = x - container.startX;
    container.scrollLeft = container.scrollLeftStart - walk;
  };

  return (
    <div
      className="table-container overflow-x-auto gap-5 w-full overflow-auto"
      ref={tableContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      style={{
        overflowX: "auto",
        cursor: "grab",
        width: "100%",
        maxWidth: "100%",
        userSelect: "none",
      }}
    >
        {children}
    </div>
  );
};

export default TableContainer;
