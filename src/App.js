import React, {useEffect, useState} from "react";
import './App.css'
import tmdb from "./tmdb";
import MovieRow from "./components/MovieRow";
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header"

export default()=>{


  const [movieList, setMovieList] = useState([]);
  const [featureData, setfeatureData] = useState(null);
  const [blackHeader,setblackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () =>{
      ///Pegando a lista Total
      let list = await tmdb.getHomeList();
      setMovieList(list);

      /// Pegar o filme em destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id,'tv');
      setfeatureData(chosenInfo);
    }

    loadAll();

  }, []);

  useEffect(() => {
    const scrollListener = () =>{
      if(window.scrollY > 10) {
        setblackHeader(true);
      } else{
        setblackHeader(false);
      }
    }
    window.addEventListener('scroll',scrollListener);

    return() => {
      window.removeEventListener('scroll',scrollListener);
    }
  }, []);
  
  return (
    <div className="page">

      <Header black = {blackHeader}/>

        {featureData &&
          <FeatureMovie item={featureData}/>
         }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
          
        ))}

      </section>
    </div>
  )
}