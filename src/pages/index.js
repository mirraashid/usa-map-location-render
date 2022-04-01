import React, {useState} from "react"
import MapChart from "../components/MapChart";
import ReactTooltip from "react-tooltip";
import * as commonStyle from "./style.module.css";


// markup
const IndexPage = () => {

  const [activeGeo, setActiveGeo] = useState(null);

  const getGeoData = {
    "Utah": [
      {
        name: "Medicine Man",
        data: ["Denver", "Aurora", "Thorto", "Longmont"]
      },
      {
        name: "The Green Solution",
        data: ["Aspen", "Aurora East", "Denver, West"]
      }
    ]
  }

  const getTooltipContent = () => {
    const geoData = getGeoData[activeGeo];
    if(!geoData) return "";

    return(
      <>
        <span className={commonStyle.geoToolTipTitle}>{activeGeo}</span>

        {
          geoData.map(store => (
            <>
              <span className={commonStyle.geoToolTipSubTitle}>{store.name}</span>
              <ul>
                {
                  store.data.map(location => <li>{location}</li>)
                }
              </ul>
            </>
          ))
        }
      </>
    )
  }

  return (
      <div style={{"width": "600px"}}>
        <MapChart setActiveGeo={setActiveGeo} activeGeo={activeGeo} />
        <ReactTooltip place="right" className={commonStyle.geoToolTip} >
          {getTooltipContent()}
        </ReactTooltip>
      </div>
  )
}

export default IndexPage
