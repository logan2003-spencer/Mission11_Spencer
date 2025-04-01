interface PagenationProps {
  currentPage: number,
  totalPages: number,
  pageSize: number,
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}


const Pagenation = ({currentPage, totalPages, pageSize, onPageChange, onPageSizeChange}:PagenationProps) =>{
  return (
    <div className="flex item=center justify-center mt-4">

    <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Previous</button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button key={index + 1} onClick={() => onPageChange(index + 1)} disabled={currentPage === index + 1}>
          {index + 1}
        </button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>

      {/* Page Size Selector */}
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            onPageSizeChange(Number(p.target.value));
            onPageChange(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
    </div>

  );
}

export default Pagenation