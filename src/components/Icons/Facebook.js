import React from 'react';
import Svg,{ Circle,Ellipse, G, Line, Path, Polygon,Polyline,Rect,Symbol, Use, Defs, Stop} from 'react-native-svg';
import { View } from 'react-native';

export default class Facebook extends React.Component {
	render() {
        return (
			<Svg x="0px" y="0px" width="30" height="30"  viewBox="0 0 1000 1000">
				<G>
					<Path fill="white" d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c46,0,90.5-6.5,132.7-18.3V564.6h-76v-72.4h76v-85.7c1.3-38.1,7.9-66,19.9-83.6c21.4-31.3,62.7-46.9,123.9-46.9c5.8,0,11.8,0.2,17.9,0.5c6.1,0.4,13.1,0.9,20.9,1.6v83.6c-9.6-0.7-16.6-1.1-20.9-1.3c-4.3-0.2-8.3-0.3-12.1-0.3c-28.2,0-45,7.2-50.6,21.7c-5.5,14.5-8.3,51.3-8.3,110.4h91.8v72.4h-91.8v371.5C881.6,854.8,990,690.1,990,500C990,229.4,770.6,10,500,10z" style="&#10;"/>
				</G>
			</Svg>
		);
	}
}