import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { useMap } from "react-leaflet";
import { useEffect } from "react";

// const createRoutingMachineLayer = ({ startCoords, endCoords}) => {
//     const instance = L.Routing.control({
//         position: 'topright', // where to place control on the map
//         waypoints: [
//             // L.latLng(57.74, 11.94),
//             // L.latLng(57.6792, 11.949)
//             startCoords,
//             endCoords
//         ],
//         lineOptions: {
//             styles: [
//                 {
//                     color: '#757de8',
//                 }
//             ]
//         }
//     })

//     return instance
// }

// const RoutingControl = createControlComponent(createRoutingMachineLayer);

// export default RoutingControl;

const Routing = ({ startCoords, endCoords }) => {
    const map = useMap();

    useEffect(() => {
        if (!map && !startCoords && !endCoords) return;
    
        const routingControl = L.Routing.control({
          waypoints: [startCoords, endCoords],
          routeWhileDragging: true
        }).addTo(map);
    
        return () => map.removeControl(routingControl);
      }, [map, startCoords, endCoords]);
    
      return null;
}

export default Routing;