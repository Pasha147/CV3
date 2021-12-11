import React, { useState } from "react";

import "./mainart.scss";
import { mainArts } from "../../appdata";
import Mainanim from "./Mainanim";
import { VscFilePdf } from "react-icons/vsc";

function Mainart() {
  const [moreArr, setMoreArr] = useState(
    new Array(mainArts.length).fill(false)
  );

  const moreClick = (indexArt) => {
    let newArr = [...moreArr];
    newArr[indexArt] = !newArr[indexArt];
    setMoreArr(newArr);
  };
  return (
    <article className="mainArt">
      <Mainanim />
      {mainArts.map((art, indexArt) => {
        return (
          <div className="article" key={`art${indexArt}`}>
            <h2>{art.header}</h2>
            {art.text
              .slice(0, !moreArr[indexArt] ? art.numberRows : art.text.length)
              .map((item, index) => {
                return <p key={index}>{item}</p>;
              })}
            {art.text.length > 2 && (
              <button className="moreBtn" onClick={() => moreClick(indexArt)}>
                {!moreArr[indexArt] ? "more . . ." : "less . . ."}
              </button>
            )}
            <div className="underline"></div>
          </div>
        );
      })}
      <div className="cvpdf">
        <span>My CV in PDF</span>
        <a href="./PAVEL V_4.pdf" download="./PAVEL V_4.pdf">
          <VscFilePdf className="cvpdfIcon" />
        </a>
      </div>
    </article>
  );
}

export default Mainart;
