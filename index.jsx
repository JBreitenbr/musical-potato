export const DOTS = "...";
const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

export const usePaginationRange = ({
  totalPageCount,
  buttonConst,
  siblingCount,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = buttonConst + 2 * siblingCount;

    /*
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
          We do not want to show dots if there is only one position left 
          after/before the left/right page count as that would lead to a change if our Pagination
          component size which we do not want
        */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex <= totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPageCount, siblingCount, currentPage, buttonConst]);

  return paginationRange;
};
export default usePaginationRange;

export const AlbumInfo=({item})=>{
return (<div className="flex flex-row mx-2 mt-4 justify-center items-center" style={{maxWidth:"80vw"}}>
  <img src={item.album_pic} className="h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32 m-2"/>
  <div>
    <div className="text-wrap text-base sm:text-xl mx-2">{item.album_name}</div>
    <div className="text-base sm:text-xl mx-2">{item.album_date}</div>
    <div className="mx-2 text-xs text-wrap">{item.genres}</div>
  </div>
</div>)
};

export const SongTitles=({item})=>{
  let songs=item.album_tracks.split(")/");
  let med=Math.floor(songs.length/2);
  let songs1=songs.slice(0,med+songs.length%2);
  let songs2=songs.slice(med+songs.length%2); 
  return (<div className="grid grid-cols-2 px-6 py-4" style={{maxWidth:"80vw"}}>
      <div>
       <ol>{songs1.map((track)=><li className="text-wrap text-xs w-32">{track+")"}</li>)}</ol>
      </div>
      <div className="text-wrap flex">
         <ol className="ml-4" start={med+songs.length%2+1}>{songs2.map((track)=><li className="text-wrap text-xs w-32">{track+")"}</li>)}</ol>
      </div>
  </div>);
};

export const TrackList = ({ tracks }) => {
  return (<ul className="list-group grid grid-cols-2 mt-4">
      {tracks.map((track,index) => (
        <li key={track.track}><div className="ml-4 mb-4">
          {/*<Tooltip id={`my-anchor-element-${index}`}><div style={{overflowY:"scroll",maxHeight:"60vh"}}><AlbumInfo item={track}/><SongTitles item={track}/></div></Tooltip><a data-tooltip-id={`my-anchor-element-${index}`}>
*/} <img src={track.album_pic} className="h-16 w-16 sm:h-32 sm:w-32" style={{border:"1px solid #0f172a"}}/>{/*</a>*/}
<div className="sm:text-xl md:text-2xl xl:text-3xl mt-2 text-white" style={{fontSize:"0.84rem"}}>{track.track}</div></div></li>
      ))}
    </ul>
  );
};
export const Pagination = ({
  tracksPerPage,
  totalTracks,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTracks / tracksPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <nav className="mt-8 h-12 stuck">
      <ul className="pagination grid grid-cols-10">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`} >
            <a
              onClick={(e) => paginate(number, e)}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
};

export const Pagination2 = ({
  tracksPerPage,
  totalTracks,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTracks / tracksPerPage); i++) {
    pageNumbers.push(i);
  }
  //let rnd=[1,0,3,3,3,3,1,1,0,3,3,3,1,1,0];
let conv=(num,ind,nArr)=>nArr[ind]==DOTS && nArr[ind+1]==DOTS ? 9:num;
//let newArr=rnd.map(conv).filter(num=>num!=9);
  let pR=usePaginationRange({totalPageCount:pageNumbers.length,buttonConst:3,siblingCount:1,currentPage:currentPage});
  let arr=pR.filter(item=>item!=DOTS);
  const paginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };
/*let arr;
  if(pageNumbers.length<7){
    arr=pageNumbers;
  } else { arr=pR;}*/
  return (
    <nav className="mt-8 h-12 stuck">
      <ul className="pagination grid grid-cols-10">
        {arr.map((item) => (
    <li
            key={item}
            className={`page-item ${currentPage === item ? "active" : ""}`} style={{marginBottom:"5px"}}>
            <button>
            <a
              onClick={(e) => paginate(item, e)}
              href="!#"
              className="page-link"
            >
              {item}
            </a></button>
          </li>)
        )}
      </ul>
    </nav>
  );
};   

export const Footer = () => {
  return (<footer><p>© Julia Breitenbruch</p>
  </footer>)
};
