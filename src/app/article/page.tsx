'use client'
import React from "react";
import styled from "styled-components";
import colors from "../colors";

const NewsContainer = styled.div`
    background: ${colors.tertiary};
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    border-radius: 8px;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: ${colors.primary};
    margin-bottom: 10px;
`;

const DateText = styled.p`
  font-size: 0.9rem;
  color: ${colors.secondary};
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${colors.secondary};

  strong {
    color: ${colors.primary};
  }

  ul {
    margin-top: 20px;
    padding-left: 20px;
    list-style-type: square;
  }

  li {
    margin-bottom: 8px;
    font-weight: bold;
    color: ${colors.primary};
  }
`;

const Article: React.FC = () => {
  const metadata = {
    title: "Riffs Brutalistas: Una guía sobre math rock",
    date: "13 de marzo de 2025, por Erick Bradshaw",
    image: "articles/article1.jpg",
  };

  return (
    <NewsContainer>
      <Title>{metadata.title}</Title>
      <DateText>{metadata.date}</DateText>
      <Image src={metadata.image} alt={metadata.title} />
      <Content>
        <p>
          En la música rock, el arte del riff es comparable a la arquitectura. 
          Imagina ver cómo se construye un edificio en menos de diez minutos. 
          Observas cómo se vierte la cimentación, se ensambla la estructura, se 
          unen las paredes, se aboveda el techo... y puedes mover la cabeza al 
          ritmo. Así es el math rock, uno de los géneros más controvertidos del 
          rock, un estilo sobre el que fanáticos y detractores han estado 
          discutiendo desde que se desarrolló a finales de los años 80.
        </p>
        <br />
        
        <p>
          El math rock (un término al que la mayoría de sus practicantes dice ser 
          alérgica) surgió cuando el hardcore perdió fuerza y comenzó un coqueteo 
          con el heavy metal. Por lo tanto, una explicación breve del género es 
          que toma la energía visceral del hardcore punk y la fusiona con la 
          destreza técnica del heavy metal. Sus antecedentes son claros: Black 
          Sabbath inventó el riff como un monolito, lo que dio paso a la Nueva 
          Ola del Heavy Metal Británico, una escena de bandas que intentaban 
          superarse en pesadez con un toque de actitud "malévola". La trilogía de 
          King Crimson de mediados de los 70—<strong>Larks' Tongues in Aspic</strong>, <strong>Starless 
          & Bible Black</strong> y <strong>Red</strong>—mostró a las bandas de guitarra que los compases 
          eran una herramienta y no una prisión. Led Zeppelin también jugó un 
          papel clave, introduciendo compases irregulares en su épico blues-rock. 
          Pero mientras Zeppelin entretenía a las masas en estadios llenos, los 
          excéntricos franco-canadienses Voivod invertían riffs de metal y ritmos 
          de thrash para simbolizar el tecno-fascismo distópico que veían en el 
          horizonte, y Bad Brains, de Washington D.C., llevaban a los jóvenes al 
          frenesí con su virtuosa interpretación del hardcore punk.
        </p>
        <br />
        
        <p>
          Para cuando lanzaron su tercer álbum, <strong>I Against I</strong> (1986), Bad Brains 
          ya componían canciones influenciadas por el metal sin sacrificar su 
          intensidad. Sus contemporáneos Black Flag siguieron un camino similar: 
          inspirados por la Mahavishnu Orchestra de John McLaughlin, <strong>The Process 
          of Weeding Out</strong> (1985) anticipó el math rock con largos y retorcidos 
          temas instrumentales. Tras la disolución de Black Flag en 1986, Greg 
          Ginn se enfocó en Gone, un trío instrumental con la impecable sección 
          rítmica de Andrew Weiss y Sim Cain (quienes, irónicamente, se unirían a 
          la Rollins Band unos años después). En el lado del metal estaban 
          Metallica y Slayer, que encarnaban la devoción del metal underground 
          por riffs demoledores y cambios de tiempo inesperados. Finalmente, 
          estaban los Melvins, originarios de un remoto pueblo en el estado de 
          Washington. Desde su formación en 1983, Melvins se han deleitado con 
          estructuras incómodas, caracterizadas por enormes bloques de riffs y 
          golpes de batería brutales.
        </p>
        <br />
        
        <p>
          Pero el math rock no se trata solo de riffs angulares y fracciones 
          irregulares; es un enfoque del rock que revitaliza la fisicalidad del 
          género con un impulso que solo puede considerarse poético. Innovadores 
          del post-hardcore como Slint, Bitch Magnet y Bastro aportaron poesía al 
          math rock a través de sus voces, ya fueran enigmáticas o desgarradas. 
          Hoy en día, ese mismo impulso puede verse en bandas como <strong>black midi</strong>.
        </p>
        <br />
        
        <p>
          A continuación, se presenta una selección de bandas que definieron el 
          math rock y, al mismo tiempo, empujaron el estilo hacia nuevos 
          territorios, con cada generación construyendo sobre el marco 
          establecido por las anteriores.
        </p>
        
        <ul>
          <li>Breadwinner</li>
          <li>Don Caballero</li>
          <li>Dazzling Killmen</li>
          <li>June of 44</li>
          <li>A Minor Forest</li>
          <li>Crom-Tech</li>
          <li>Hella</li>
          <li>Clan of the Cave Bear</li>
          <li>Battles</li>
          <li>Drose</li>
          <li>Imelda Marcos</li>
        </ul>
      </Content>
    </NewsContainer>
  );
};

export default Article;
