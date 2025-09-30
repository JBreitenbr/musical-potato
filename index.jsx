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

export const Footer = () => {
  return (<footer><p>© Julia Breitenbruch</p>
  </footer>)
};
