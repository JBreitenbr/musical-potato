const { useState, useEffect, useMemo } = React;
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


export const Pagination=({ tracks })=>{
  const pageSize = 10;   // Einträge pro Seite
  const blockSize = 10;  // Seiten pro Block
  const totalPages = Math.ceil(tracks.length / pageSize);

  const [currentPage, setCurrentPage] = useState(1);

  // 🔸 Reset auf Seite 1, wenn sich tracks ändern
  useEffect(() => {
    setCurrentPage(1);
  }, [tracks]);

  const currentBlock = Math.floor((currentPage - 1) / blockSize);
  const startPage = currentBlock * blockSize + 1;
  const endPage = Math.min(startPage + blockSize - 1, totalPages);

  const currentTracks = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tracks.slice(start, start + pageSize);
  }, [tracks, currentPage]);

  const goToPage = (p) => setCurrentPage(p);
  const goToPrevBlock = () =>
    startPage > 1 && setCurrentPage(startPage - blockSize);
  const goToNextBlock = () =>
    endPage < totalPages && setCurrentPage(endPage + 1);

  return (
    <div className="space-y-4">
      {/* Liste der Tracks */}
      {currentTracks.length === 0 ? (
        <p className="text-gray-500">Keine Tracks gefunden.</p>
      ) : (
        <TrackList tracks={currentTracks}/>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex space-x-2 items-center">
          {startPage > 1 && (
            <button
              onClick={goToPrevBlock}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              &lt; {startPage - blockSize}–{startPage - 1}
            </button>
          )}

          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-3 py-1 rounded ${
                p === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {p}
            </button>
          ))}

          {endPage < totalPages && (
            <button
              onClick={goToNextBlock}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              {endPage + 1}–
              {Math.min(endPage + blockSize, totalPages)} &gt;
            </button>
          )}
        </div>
      )}

      <div className="text-sm text-gray-500">
        Seite {currentPage} von {totalPages}
      </div>
    </div>
  );
};

export const Footer = () => {
  return (<footer><p>© Julia Breitenbruch</p>
  </footer>)
};
